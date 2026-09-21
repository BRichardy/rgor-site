import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { samplePosts } from "@/content/sample-posts";
import type { Post, PostInput } from "@/lib/types";
import { slugify } from "@/lib/slug";

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(POSTS_FILE);
  } catch {
    await fs.writeFile(POSTS_FILE, JSON.stringify(samplePosts, null, 2), "utf8");
  }
}

async function readAll(): Promise<Post[]> {
  await ensureStore();
  const raw = await fs.readFile(POSTS_FILE, "utf8");
  return JSON.parse(raw) as Post[];
}

async function writeAll(posts: Post[]) {
  await ensureStore();
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf8");
}

export async function localGetPublishedPosts(): Promise<Post[]> {
  const posts = await readAll();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => {
      const da = a.published_at ?? a.created_at;
      const db = b.published_at ?? b.created_at;
      return new Date(db).getTime() - new Date(da).getTime();
    });
}

export async function localGetPublishedBySlug(
  slug: string,
): Promise<Post | null> {
  const posts = await localGetPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function localGetAllPosts(): Promise<Post[]> {
  const posts = await readAll();
  return posts.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function localGetById(id: string): Promise<Post | null> {
  const posts = await readAll();
  return posts.find((p) => p.id === id) ?? null;
}

export async function localCreatePost(input: PostInput): Promise<Post> {
  const posts = await readAll();
  const now = new Date().toISOString();
  const post: Post = {
    id: randomUUID(),
    title: input.title,
    slug: input.slug || slugify(input.title),
    excerpt: input.excerpt,
    body: input.body,
    cover_image_url: input.cover_image_url ?? null,
    published: input.published,
    published_at:
      input.published && !input.published_at ? now : input.published_at ?? null,
    created_at: now,
    updated_at: now,
  };
  posts.unshift(post);
  await writeAll(posts);
  return post;
}

export async function localUpdatePost(
  id: string,
  input: PostInput,
): Promise<Post> {
  const posts = await readAll();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Post não encontrado");
  }

  const existing = posts[index];
  let publishedAt = input.published_at ?? existing.published_at ?? null;
  if (input.published && !publishedAt) {
    publishedAt = new Date().toISOString();
  }

  const updated: Post = {
    ...existing,
    title: input.title,
    slug: input.slug || slugify(input.title),
    excerpt: input.excerpt,
    body: input.body,
    cover_image_url: input.cover_image_url ?? null,
    published: input.published,
    published_at: publishedAt,
    updated_at: new Date().toISOString(),
  };

  posts[index] = updated;
  await writeAll(posts);
  return updated;
}

export async function localDeletePost(id: string): Promise<void> {
  const posts = await readAll();
  await writeAll(posts.filter((p) => p.id !== id));
}

export async function localUploadCover(file: File): Promise<string> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}
