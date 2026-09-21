import type { Post } from "@/lib/types";

/** Exibido no site público quando o Supabase ainda não está configurado. */
export const samplePosts: Post[] = [
  {
    id: "sample-1",
    title: "GPT Astra é bom de verdade?",
    slug: "gpt-astra-e-bom-de-verdade",
    excerpt:
      "Testei em tarefas reais de suporte e de código. O que aguentou — e o que não.",
    body: `Toda semana surge um nome novo de modelo. GPT Astra é um deles. Antes de recomendar no trabalho — ou de construir em cima — eu quero uma resposta clara: **é bom de verdade?**

## O que eu testei

Rodarei três tipos de tarefa:

1. **Troubleshooting de suporte** — relatos vagos, logs e o clássico “ontem funcionava”.
2. **Scaffold full stack** — uma feature pequena em Next.js com auth e formulário.
3. **Escrita** — transformar rascunhos em algo que eu publicaria aqui.

## O que funcionou

Astra foi forte em estruturar problemas bagunçados. Fez perguntas de follow-up melhores do que modelos que usei no ano passado, e o código sugerido chegou mais perto de forma de produção.

Na escrita, funciona bem como parceiro de rascunho. Ainda assim eu reescrevo a voz — este site precisa soar como eu.

## O que não funcionou

Ainda inventa detalhes com confiança quando o contexto é fino. Em cenários de suporte, isso é perigoso. Trato cada resposta como hipótese até verificar no sistema.

## Conclusão

**Sim — com supervisão.** Útil para rascunhos, outlines e primeira passagem de código. Não substitui julgamento, especialmente quando tem usuário esperando correção.

Vou continuar publicando o que aprender usando ferramentas assim no trabalho real.`,
    cover_image_url: null,
    published: true,
    published_at: "2026-03-18T12:00:00.000Z",
    created_at: "2026-03-18T12:00:00.000Z",
    updated_at: "2026-03-18T12:00:00.000Z",
  },
  {
    id: "sample-2",
    title: "DuckDB e a onda da nuvem",
    slug: "duckdb-e-a-onda-da-nuvem",
    excerpt:
      "Por que o DuckDB aparece tanto — e o que um movimento cloud mudaria para quem vive em SQL.",
    body: `O DuckDB continua aparecendo em conversas sobre analytics sem precisar de um time de data warehouse.

É embutido, rápido para cargas locais e médias, e amigável se você já pensa em SQL. Essa combinação me interessa como analista de suporte que também constrói software: **ferramentas que encurtam o caminho entre “tenho uma pergunta” e “tenho uma resposta”.**

## Por que isso importa pra mim

Em suporte e ops, muitas vezes precisamos de cortes rápidos de dados — não de um pipeline de seis semanas. Fluxos no estilo DuckDB cabem nisso: abrir um arquivo, consultar, seguir.

Se plataformas cloud aprofundarem a história do DuckDB (aquisições, ofertas hosted, integrações), a pergunta interessante não é a manchete. É se o **caminho local e simples** continua em primeiro plano.

## O que estou acompanhando

- Quão fácil continua rodar queries sem uma plataforma inteira
- Se o SQL que a gente já sabe transfere limpo para a camada hosted
- Docs e mensagens de erro — porque é aí que quem faz suporte vive

Vou escrever mais conforme a história evoluir. Por enquanto: DuckDB está na minha lista curta de ferramentas que vale conhecer, seja para entregar produto ou manter sistemas no ar.`,
    cover_image_url: null,
    published: true,
    published_at: "2026-03-10T15:30:00.000Z",
    created_at: "2026-03-10T15:30:00.000Z",
    updated_at: "2026-03-10T15:30:00.000Z",
  },
];
