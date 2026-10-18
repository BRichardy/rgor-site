export type TextBlock = {
  id: string;
  type: "text";
  content: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
  alt?: string;
};

export type ContentBlock = TextBlock | ImageBlock;

export function createBlockId() {
  return `b_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createTextBlock(content = ""): TextBlock {
  return { id: createBlockId(), type: "text", content };
}

export function createImageBlock(url: string, alt = ""): ImageBlock {
  return { id: createBlockId(), type: "image", url, alt };
}

function isBlock(value: unknown): value is ContentBlock {
  if (!value || typeof value !== "object") return false;
  const block = value as Record<string, unknown>;
  if (typeof block.id !== "string" || typeof block.type !== "string") {
    return false;
  }
  if (block.type === "text") {
    return typeof block.content === "string";
  }
  if (block.type === "image") {
    return typeof block.url === "string";
  }
  return false;
}

/** Aceita JSON de blocos ou Markdown legado (vira um bloco texto). */
export function parseBody(body: string): ContentBlock[] {
  const trimmed = body.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(isBlock)) {
        return parsed;
      }
    } catch {
      // legado / JSON inválido → texto
    }
  }

  return [createTextBlock(body)];
}

export function serializeBlocks(blocks: ContentBlock[]): string {
  return JSON.stringify(blocks);
}

export function ensureEditableBlocks(body: string): ContentBlock[] {
  const blocks = parseBody(body);
  return blocks.length > 0 ? blocks : [createTextBlock()];
}
