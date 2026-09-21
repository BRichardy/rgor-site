import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import {
  localCreatePost,
  localDeletePost,
  localGetAllPosts,
  localGetById,
  localGetPublishedBySlug,
  localGetPublishedPosts,
  localUpdatePost,
} from "@/lib/local-store";
import type { Post, PostInput } from "@/lib/types";
import { slugify } from "@/lib/slug";

export { slugify };

export async function getPublishedPosts(): Promise<Post[]> {
  if (!hasSupabaseEnv()) {
    return localGetPublishedPosts();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedPosts:", error.message);
    return localGetPublishedPosts();
  }

  if (!data?.length) {
    return localGetPublishedPosts();
  }

  return data as Post[];
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  if (!hasSupabaseEnv()) {
    return localGetPublishedBySlug(slug);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPublishedPostBySlug:", error.message);
    return localGetPublishedBySlug(slug);
  }

  if (!data) {
    return localGetPublishedBySlug(slug);
  }

  return data as Post;
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  if (!hasSupabaseEnv()) {
    return localGetAllPosts();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Post[];
}

export async function getPostByIdAdmin(id: string): Promise<Post | null> {
  if (!hasSupabaseEnv()) {
    return localGetById(id);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as Post) ?? null;
}

export async function createPost(input: PostInput): Promise<Post> {
  if (!hasSupabaseEnv()) {
    return localCreatePost(input);
  }

  const supabase = await createClient();
  const publishedAt =
    input.published && !input.published_at
      ? new Date().toISOString()
      : input.published_at ?? null;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      slug: input.slug || slugify(input.title),
      excerpt: input.excerpt,
      body: input.body,
      cover_image_url: input.cover_image_url ?? null,
      published: input.published,
      published_at: publishedAt,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Post;
}

export async function updatePost(
  id: string,
  input: PostInput,
): Promise<Post> {
  if (!hasSupabaseEnv()) {
    return localUpdatePost(id, input);
  }

  const supabase = await createClient();

  const existing = await getPostByIdAdmin(id);
  let publishedAt = input.published_at ?? existing?.published_at ?? null;

  if (input.published && !publishedAt) {
    publishedAt = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title: input.title,
      slug: input.slug || slugify(input.title),
      excerpt: input.excerpt,
      body: input.body,
      cover_image_url: input.cover_image_url ?? null,
      published: input.published,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  if (!hasSupabaseEnv()) {
    return localDeletePost(id);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
