"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAdminPassword,
  isLocalAdminAuthenticated,
  LOCAL_ADMIN_COOKIE,
  localAdminCookieOptions,
  signAdminToken,
} from "@/lib/local-auth";
import { localUploadCover } from "@/lib/local-store";
import {
  createPost,
  deletePost,
  slugify,
  updatePost,
} from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function formBool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function isRedirectError(err: unknown) {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as { digest?: string }).digest === "string" &&
    (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

async function requireAdmin() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      redirect("/admin");
    }
    return;
  }

  if (!(await isLocalAdminAuthenticated())) {
    redirect("/admin");
  }
}

async function uploadCover(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  if (!hasSupabaseEnv()) {
    return localUploadCover(file);
  }

  const supabase = await createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from("covers").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("covers").getPublicUrl(path);
  return data.publicUrl;
}

export async function loginAction(formData: FormData) {
  const next = formString(formData, "next") || "/admin/posts";
  const password = formString(formData, "password");

  if (!hasSupabaseEnv()) {
    if (password !== getAdminPassword()) {
      redirect(`/admin?error=${encodeURIComponent("Senha incorreta.")}`);
    }

    const jar = await cookies();
    const opts = localAdminCookieOptions(signAdminToken(password));
    jar.set(opts.name, opts.value, opts);
    redirect(next.startsWith("/admin") ? next : "/admin/posts");
  }

  const email = formString(formData, "email");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  redirect(next.startsWith("/admin") ? next : "/admin/posts");
}

export async function logoutAction() {
  if (!hasSupabaseEnv()) {
    const jar = await cookies();
    jar.delete(LOCAL_ADMIN_COOKIE);
    redirect("/admin");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin");
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData, "id");
  const title = formString(formData, "title");
  const slugInput = formString(formData, "slug");
  const excerpt = formString(formData, "excerpt");
  const body = formString(formData, "body");
  const published = formBool(formData, "published");
  const existingCover = formString(formData, "existing_cover") || null;
  const file = formData.get("cover") as File | null;

  if (!title || !body) {
    const target = id ? `/admin/posts/${id}` : "/admin/posts/new";
    redirect(
      `${target}?error=${encodeURIComponent("Título e corpo são obrigatórios.")}`,
    );
  }

  let coverUrl = existingCover;
  try {
    const uploaded = await uploadCover(file);
    if (uploaded) {
      coverUrl = uploaded;
    }
  } catch (err) {
    if (isRedirectError(err)) throw err;
    const message = err instanceof Error ? err.message : "Falha no upload";
    const target = id ? `/admin/posts/${id}` : "/admin/posts/new";
    redirect(`${target}?error=${encodeURIComponent(message)}`);
  }

  const input = {
    title,
    slug: slugInput || slugify(title),
    excerpt,
    body,
    cover_image_url: coverUrl,
    published,
  };

  try {
    if (id) {
      await updatePost(id, input);
    } else {
      await createPost(input);
    }
  } catch (err) {
    if (isRedirectError(err)) throw err;
    const message = err instanceof Error ? err.message : "Falha ao salvar";
    const target = id ? `/admin/posts/${id}` : "/admin/posts/new";
    redirect(`${target}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/posts", "layout");
  revalidatePath("/admin/posts");
  redirect("/admin/posts?saved=1");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData, "id");
  if (!id) {
    redirect("/admin/posts");
  }

  try {
    await deletePost(id);
  } catch (err) {
    if (isRedirectError(err)) throw err;
    const message = err instanceof Error ? err.message : "Falha ao excluir";
    redirect(`/admin/posts?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
