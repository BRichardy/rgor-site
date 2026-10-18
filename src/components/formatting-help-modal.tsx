"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const rules = [
  {
    label: "Negrito",
    syntax: "**texto**",
    example: "**importante**",
    result: "importante em negrito",
  },
  {
    label: "Itálico",
    syntax: "*texto*",
    example: "*ênfase*",
    result: "ênfase em itálico",
  },
  {
    label: "Título",
    syntax: "## Título",
    example: "## Seção",
    result: "subtítulo maior",
  },
  {
    label: "Lista",
    syntax: "- item",
    example: "- primeiro ponto\n- segundo ponto",
    result: "lista com marcadores",
  },
  {
    label: "Link",
    syntax: "[texto](url)",
    example: "[GitHub](https://github.com)",
    result: "link clicável",
  },
  {
    label: "Parágrafo",
    syntax: "linha em branco",
    example: "Primeiro parágrafo.\n\nSegundo parágrafo.",
    result: "espaço entre blocos de texto",
  },
];

export function FormattingHelpModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="max-w-md border border-line bg-bg-elevated p-0 text-ink backdrop:bg-[var(--overlay)]"
    >
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-display text-lg font-semibold">
          Formatação no bloco de texto
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Você escreve normalmente. Nos blocos de texto, alguns atalhos Markdown
          deixam o post mais bonito — ou use os botões B / I / link acima de
          cada bloco.
        </p>
      </div>

      <ul className="max-h-[min(60vh,24rem)] overflow-y-auto px-5 py-4">
        {rules.map((rule) => (
          <li
            key={rule.label}
            className="border-b border-line py-3 last:border-b-0"
          >
            <p className="text-sm font-medium text-ink">{rule.label}</p>
            <p className="mt-1 font-mono text-xs text-accent">{rule.syntax}</p>
            <p className="mt-2 font-mono text-xs text-ink-muted whitespace-pre-wrap">
              {rule.example}
            </p>
            <p className="mt-1 text-xs text-ink-muted">→ {rule.result}</p>
          </li>
        ))}
      </ul>

      <div className="border-t border-line px-5 py-4">
        <p className="text-xs text-ink-muted">
          Dica: selecione uma palavra e clique em <strong>B</strong> ou{" "}
          <strong>I</strong> na barra do bloco — o Markdown é inserido
          automaticamente.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn-primary mt-4 bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent/85"
        >
          Entendi
        </button>
      </div>
    </dialog>
  );
}
