-- Seed opcional (após a migration).
insert into public.posts (title, slug, excerpt, body, published, published_at)
values
(
  'GPT Astra é bom de verdade?',
  'gpt-astra-e-bom-de-verdade',
  'Testei em tarefas reais de suporte e de código. O que aguentou — e o que não.',
  E'Toda semana surge um nome novo de modelo. GPT Astra é um deles. Antes de recomendar no trabalho — ou de construir em cima — eu quero uma resposta clara: **é bom de verdade?**\n\n## O que eu testei\n\n1. **Troubleshooting de suporte**\n2. **Scaffold full stack**\n3. **Escrita**\n\n## Conclusão\n\n**Sim — com supervisão.** Útil para rascunhos e primeira passagem de código. Não substitui julgamento.',
  true,
  '2026-03-18T12:00:00Z'
),
(
  'DuckDB e a onda da nuvem',
  'duckdb-e-a-onda-da-nuvem',
  'Por que o DuckDB aparece tanto — e o que um movimento cloud mudaria para quem vive em SQL.',
  E'O DuckDB continua aparecendo em conversas sobre analytics sem precisar de um time de data warehouse.\n\nÉ embutido, rápido e amigável se você já pensa em SQL. Ferramentas que encurtam o caminho entre pergunta e resposta.\n\nVou escrever mais conforme a história evoluir.',
  true,
  '2026-03-10T15:30:00Z'
)
on conflict (slug) do nothing;
