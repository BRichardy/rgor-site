import { Markdown } from "@/components/markdown";
import { parseBody } from "@/lib/blocks";

export function PostBody({ body }: { body: string }) {
  const blocks = parseBody(body);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block) => {
        if (block.type === "image") {
          return (
            <figure key={block.id} className="media-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.url}
                alt={block.alt || ""}
                className="w-full object-cover"
              />
              {block.alt ? (
                <figcaption className="mt-2 text-center font-mono text-xs text-ink-muted">
                  {block.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (!block.content.trim()) {
          return null;
        }

        return (
          <div key={block.id}>
            <Markdown content={block.content} />
          </div>
        );
      })}
    </div>
  );
}
