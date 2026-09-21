-- Posts table, RLS, and cover-image storage for RGOR
-- Run in the Supabase SQL editor (or via supabase db push)

create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  cover_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_at_idx
  on public.posts (published_at desc)
  where published = true;

alter table public.posts enable row level security;

-- Public can read published posts only
create policy "Public read published posts"
  on public.posts
  for select
  to anon, authenticated
  using (published = true);

-- Authenticated admin can read all posts (needed for admin list + unpublished)
create policy "Authenticated read all posts"
  on public.posts
  for select
  to authenticated
  using (true);

create policy "Authenticated insert posts"
  on public.posts
  for insert
  to authenticated
  with check (true);

create policy "Authenticated update posts"
  on public.posts
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete posts"
  on public.posts
  for delete
  to authenticated
  using (true);

-- Storage bucket for cover images
insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict (id) do update set public = true;

create policy "Public read covers"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'covers');

create policy "Authenticated upload covers"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'covers');

create policy "Authenticated update covers"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'covers')
  with check (bucket_id = 'covers');

create policy "Authenticated delete covers"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'covers');
