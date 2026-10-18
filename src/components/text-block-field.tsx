"use client";

import { useRef, type ReactNode } from "react";
import { prefixLine, wrapTextareaSelection } from "@/lib/markdown-format";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function ToolbarButton({
  label,
  title,
  onClick,
  children,
}: {
  label: string;
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={label}
      onClick={onClick}
      className="min-w-8 rounded px-2 py-1 font-mono text-xs text-ink-muted hover:bg-accent-soft hover:text-accent"
    >
      {children}
    </button>
  );
}

export function TextBlockField({ value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function applyTransform(
    transform: (
      val: string,
      start: number,
      end: number,
    ) => ReturnType<typeof wrapTextareaSelection>,
  ) {
    const el = textareaRef.current;
    if (!el) return;

    const { selectionStart, selectionEnd } = el;
    const result = transform(value, selectionStart, selectionEnd);
    onChange(result.value);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-0.5 border border-line border-b-0 bg-bg px-1 py-1">
        <ToolbarButton
          label="Negrito"
          title="Negrito (**texto**)"
          onClick={() =>
            applyTransform((val, start, end) =>
              wrapTextareaSelection(val, start, end, "**", "**"),
            )
          }
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          label="Itálico"
          title="Itálico (*texto*)"
          onClick={() =>
            applyTransform((val, start, end) =>
              wrapTextareaSelection(val, start, end, "*", "*"),
            )
          }
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          label="Título"
          title="Subtítulo (## )"
          onClick={() =>
            applyTransform((val, start, end) =>
              prefixLine(val, start, end, "## "),
            )
          }
        >
          H
        </ToolbarButton>
        <ToolbarButton
          label="Lista"
          title="Item de lista (- )"
          onClick={() =>
            applyTransform((val, start, end) =>
              prefixLine(val, start, end, "- "),
            )
          }
        >
          •
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          title="Link ([texto](url))"
          onClick={() =>
            applyTransform((val, start, end) =>
              wrapTextareaSelection(val, start, end, "[", "](https://)"),
            )
          }
        >
          ↗
        </ToolbarButton>
      </div>
      <textarea
        ref={textareaRef}
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva aqui. Use os botões acima ou digite **negrito**, *itálico*, ## título…"
        className="w-full border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
