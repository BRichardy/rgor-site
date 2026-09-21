export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  published: boolean;
  published_at?: string | null;
};
