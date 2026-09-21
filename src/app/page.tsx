import { PostFeed } from "@/components/post-feed";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <section className="animate-fade-up mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
          Feed técnico
        </p>
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          Notas sobre software, dados e o que eu testo na prática.
        </h1>
        <p
          className="mt-5 text-lg leading-relaxed text-ink-muted animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Manchetes e experiências úteis — o projeto vivo por trás do portfólio.
        </p>
      </section>

      <PostFeed posts={posts} />
    </div>
  );
}
