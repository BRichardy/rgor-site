"use client";

import { useMemo, useState } from "react";
import { savePostAction } from "@/app/admin/actions";
import type { Post } from "@/lib/types";

function toSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Props = {
  post?: Post | null;
  error?: string;
  saved?: boolean;
};

export function PostEditor({ post, error, saved }: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [published, setPublished] = useState(post?.published ?? false);

  const suggestedSlug = useMemo(() => toSlug(title), [title]);

  return (
    <form
      action={savePostAction}
      className="flex flex-col gap-5"
      encType="multipart/form-data"
    >
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      {post?.cover_image_url ? (
        <input type="hidden" name="existing_cover" value={post.cover_image_url} />
      ) : null}

      {error ? (
        <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="border border-blue-200 bg-accent-soft px-3 py-2 text-sm text-accent">
          Salvo.
        </p>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Título</span>
        <input
          name="title"
          required
          value={title}
          onChange={(e) => {
            const next = e.target.value;
            setTitle(next);
            if (!slugTouched) {
              setSlug(toSlug(next));
            }
          }}
          className="border border-line bg-bg-elevated px-3 py-2.5 outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Slug</span>
        <input
          name="slug"
          required
          value={slug || suggestedSlug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className="border border-line bg-bg-elevated px-3 py-2.5 font-mono text-sm outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Resumo</span>
        <textarea
          name="excerpt"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border border-line bg-bg-elevated px-3 py-2.5 outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Corpo (Markdown)</span>
        <textarea
          name="body"
          required
          rows={16}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-line bg-bg-elevated px-3 py-2.5 font-mono text-sm outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Imagem de capa</span>
        {post?.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="mb-2 aspect-[16/9] max-w-md rounded-md object-cover"
          />
        ) : null}
        <input
          type="file"
          name="cover"
          accept="image/*"
          className="text-sm text-ink-muted file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-sm file:text-bg-elevated"
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="size-4 accent-accent"
        />
        <span>Publicado</span>
      </label>

      <button
        type="submit"
        className="mt-2 w-fit bg-ink px-5 py-2.5 text-sm font-medium text-bg-elevated transition-colors hover:bg-accent"
      >
        {post ? "Salvar alterações" : "Criar post"}
      </button>
    </form>
  );
}
