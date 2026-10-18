"use client";

import { useRef, useState } from "react";
import { uploadImageAction } from "@/app/admin/actions";
import { FormattingHelpModal } from "@/components/formatting-help-modal";
import { TextBlockField } from "@/components/text-block-field";
import {
  createImageBlock,
  createTextBlock,
  serializeBlocks,
  type ContentBlock,
} from "@/lib/blocks";

type Props = {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
};

export function BlockEditor({ blocks, onChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function updateBlock(id: string, patch: Partial<ContentBlock>) {
    onChange(
      blocks.map((block) =>
        block.id === id ? ({ ...block, ...patch } as ContentBlock) : block,
      ),
    );
  }

  function removeBlock(id: string) {
    const next = blocks.filter((block) => block.id !== id);
    onChange(next.length > 0 ? next : [createTextBlock()]);
  }

  function moveBlock(id: string, direction: -1 | 1) {
    const index = blocks.findIndex((block) => block.id === id);
    if (index < 0) return;
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  }

  function addTextBlock() {
    onChange([...blocks, createTextBlock()]);
    setMenuOpen(false);
  }

  function requestImageBlock() {
    setMenuOpen(false);
    setUploadError(null);
    fileRef.current?.click();
  }

  async function onImageSelected(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadImageAction(formData);
      if (result.error || !result.url) {
        setUploadError(result.error ?? "Falha no upload.");
        return;
      }
      onChange([...blocks, createImageBlock(result.url)]);
    } finally {
      setUploading(false);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Corpo</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Blocos de texto e imagem. Texto aceita formatação simples (negrito,
            listas, links).
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-bg-elevated text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent-soft"
          title="Como formatar texto"
          aria-label="Abrir ajuda de formatação"
        >
          ?
        </button>
      </div>

      <FormattingHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />

      <input type="hidden" name="body" value={serializeBlocks(blocks)} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onImageSelected(e.target.files)}
      />

      <div className="flex flex-col gap-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="border border-line bg-bg-elevated/60 p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                {block.type === "text" ? "Texto" : "Imagem"}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => moveBlock(block.id, -1)}
                  disabled={index === 0}
                  className="px-2 py-1 text-ink-muted hover:text-ink disabled:opacity-30"
                  aria-label="Mover para cima"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(block.id, 1)}
                  disabled={index === blocks.length - 1}
                  className="px-2 py-1 text-ink-muted hover:text-ink disabled:opacity-30"
                  aria-label="Mover para baixo"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="px-2 py-1 text-danger hover:underline"
                >
                  Apagar
                </button>
              </div>
            </div>

            {block.type === "text" ? (
              <TextBlockField
                value={block.content}
                onChange={(content) => updateBlock(block.id, { content })}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.url}
                  alt={block.alt || ""}
                  className="max-h-64 w-full object-cover"
                />
                <input
                  type="text"
                  value={block.alt ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, { alt: e.target.value })
                  }
                  placeholder="Legenda / alt (opcional)"
                  className="border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {uploadError ? (
        <p className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger">
          {uploadError}
        </p>
      ) : null}

      <div className="relative flex justify-center py-2">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          disabled={uploading}
          className="flex size-10 items-center justify-center rounded-full border border-line bg-bg-elevated text-xl text-accent transition-colors hover:border-accent hover:bg-accent-soft disabled:opacity-50"
          aria-label="Adicionar bloco"
        >
          {uploading ? "…" : "+"}
        </button>

        {menuOpen ? (
          <div className="absolute bottom-12 z-10 flex min-w-[10rem] flex-col border border-line bg-bg-elevated p-1 shadow-lg">
            <button
              type="button"
              onClick={addTextBlock}
              className="px-3 py-2 text-left text-sm text-ink hover:bg-accent-soft hover:text-accent"
            >
              Texto
            </button>
            <button
              type="button"
              onClick={requestImageBlock}
              className="px-3 py-2 text-left text-sm text-ink hover:bg-accent-soft hover:text-accent"
            >
              Imagem
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
