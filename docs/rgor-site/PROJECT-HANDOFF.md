# Handoff do projeto — RGOR: perfil e notas técnicas

**Atualizado:** 26/10/2026
**Repositório:** `BRichardy/rgor-site`
**Branch:** `main`

## Limite do projeto

Este repositório é o site pessoal de tecnologia com perfil/portfólio e feed de notas técnicas. A página inicial é um espaço pessoal para compartilhar notícias, ferramentas, projetos e experiências escolhidos pelo autor — não é um jornal profissional.

Ele é independente do novo site de serviços freelance que está sendo planejado em outro PRD e prototipado no Penpot. Também não é o projeto da página de finanças. Não misturar requisitos, conteúdo, designs ou código desses produtos neste repositório.

## Produto e decisões aprovadas

- Idioma principal: português brasileiro.
- `/` é o feed pessoal; `/profile` é o perfil/portfólio. O perfil deve falar da pessoa e dos projetos, não ser apenas uma versão de currículo.
- Direção visual aprovada: identidade de tecnologia/desenvolvimento, dark mode como padrão inicial com alternância para light mode, fontes Space Grotesk e JetBrains Mono e decoração sutil de grade azul com fade.
- O cabeçalho permanece sticky e acompanha quem navega; a decoração de grade pertence ao fundo do documento, não ao cabeçalho.
- Feed e perfil têm tratamentos de cabeçalho próprios.
- A administração é para uma pessoa. A navegação interna permite consultar Início, Posts e Perfil sem sair de `/admin`; abrir a URL pública é uma escolha explícita.
- O corpo dos posts é modular: blocos de texto e imagem podem ser adicionados, movidos e removidos. Markdown continua disponível dentro dos blocos de texto e posts Markdown antigos devem continuar renderizando.

## Funcionalidades implementadas

### Área pública

- Feed de posts publicados em `/`.
- Página individual do post em `/posts/[slug]`.
- Perfil e projetos em `/profile`.
- Temas claro/escuro, preferência em `localStorage` (`rgor-theme`) e script para evitar flash de tema na primeira renderização.
- Layout responsivo, navegação própria por área e animações/revelações sutis.

### Administração

- Login em `/admin`.
- Lista, criação, edição e exclusão em `/admin/posts` e rotas relacionadas.
- O estado de publicação controla se o post aparece publicamente; rascunhos ficam disponíveis no admin.
- Após criar ou salvar, o fluxo volta à lista administrativa com indicação de sucesso.
- Pré-visualizações internas: `/admin/inicio`, `/admin/posts/[id]/view` e `/admin/profile`.
- Editor de corpo por blocos, imagem de capa independente das imagens no corpo, controles de formatação e modal de ajuda para Markdown.
- `next.config.ts` eleva para `10mb` o limite de corpo das Server Actions, após o limite padrão causar erro no upload de capa.

## Stack e comandos

- Next.js 16 App Router, React 19, TypeScript e Tailwind CSS 4.
- `react-markdown` e `remark-gfm` para renderização de Markdown.
- Supabase JS/SSR como backend opcional.
- Scripts existentes: `npm run dev`, `npm run build`, `npm run start` e `npm run lint`. Não há script de testes automatizados definido em `package.json`.

```bash
npm install
npm run dev
```

Desenvolvimento local: `http://localhost:3000`, `/profile` e `/admin`.

## Persistência e autenticação

### Modo local

- Ativado quando `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` não estão definidas.
- `ADMIN_PASSWORD` define a senha local; sem configuração, o código ainda tem fallback para `admin`. **Não usar esse fallback nem o modo local como autenticação de produção.**
- Cookie `httpOnly` (`rgor_admin`) mantém a sessão local.
- `data/posts.json` armazena os posts; imagens ficam em `public/uploads/`.
- Escrita em disco serve ao desenvolvimento local e não é armazenamento durável adequado para ambientes serverless.

### Supabase opcional

- A presença das duas variáveis públicas do Supabase ativa autenticação e persistência remotas.
- Migration: `supabase/migrations/20260321000000_posts.sql`; seed opcional: `supabase/seed.sql`.
- A migration define tabela `posts`, políticas RLS e bucket público `covers`.
- Não há evidência neste repositório de projeto Supabase remoto configurado ou implantado.
- As políticas atuais permitem CRUD a usuários autenticados em geral; antes de uso público, restringir administração à identidade/role desejada e revisar RLS.
- Algumas leituras públicas recorrem ao conteúdo local se a consulta remota falhar ou não retornar registros. Confirmar se esse fallback é desejável ao operar com dados remotos.

## Modelo de conteúdo

`Post.body` continua sendo string no tipo de domínio. Posts novos serializam `ContentBlock[]` em JSON, com blocos `text` e `image`; `src/lib/blocks.ts` faz parse/serialização. Texto passa por `react-markdown` com suporte GFM. Corpo legado em Markdown vira um bloco de texto, preservando compatibilidade.

| Área | Arquivos principais |
|---|---|
| Rotas públicas | `src/app/page.tsx`, `src/app/posts/[slug]/page.tsx`, `src/app/profile/page.tsx` |
| Rotas administrativas | `src/app/admin/**` |
| Conteúdo do perfil/site | `src/content/profile.ts`, `src/content/site.ts` |
| Editor/renderização | `src/components/post-editor.tsx`, `block-editor.tsx`, `text-block-field.tsx`, `post-body.tsx`, `markdown.tsx`, `formatting-help-modal.tsx` |
| Persistência | `src/lib/posts.ts`, `src/lib/local-store.ts`, `src/lib/types.ts`, `src/lib/blocks.ts` |
| Login e sessão | `src/lib/local-auth.ts`, `src/lib/supabase/**`, `src/middleware.ts` |
| Tema e estilos | `src/lib/theme.ts`, `src/components/theme-provider.tsx`, `theme-toggle.tsx`, `src/app/globals.css` |

## Conteúdo presente na cópia local

Na verificação de 26/10/2026, `data/posts.json` tinha seis registros: cinco publicados e um rascunho com título de teste (“AE TITULO”). O repositório também contém imagens em `public/uploads/`. Revisar conteúdo e metadados antes de qualquer publicação futura; não remover os dados sem decisão do usuário.

O perfil é conteúdo estático em `src/content/profile.ts`. A cópia atual contém biografia, projetos, experiências, tecnologias e links que podem envelhecer ou não refletir o posicionamento atual. Confirmar precisão e autorização antes de republicar ou atualizar.

## Histórico resumido

- `7199537` — scaffold inicial do Next.js.
- `bb99c4f` — perfil de tecnologia, feed pessoal, posts e administração com Supabase opcional.
- `3760900` — publicação em modo local, interface escura e navegação/preview dentro do admin.
- `c65d122` — editor modular por blocos, alternância de temas e inclusão de conteúdo/imagens locais no repositório.
- `6109692` — contexto e instruções do projeto em `AGENTS.md`.
- Este handoff registra estado, decisões, limites e próximos passos para continuidade em outra conversa.

Em 26/10/2026, antes deste commit de documentação, `main` estava sincronizada com `origin/main` no commit `6109692`. O commit deste handoff será local; o push não faz parte desta tarefa.

## Pendências e verificações antes de produção

1. Revisar a segurança da autenticação local e das políticas RLS; restringir quem pode administrar posts.
2. Escolher e validar o ambiente de produção, persistência durável, domínio e configuração Supabase, se necessário.
3. Confirmar dados do perfil, links, textos, imagens e quais posts devem estar publicados.
4. Revalidar uploads (tipo/tamanho), erros de envio, preview, Markdown e conteúdo legado.
5. Fazer QA visual em desktop/mobile e nos dois temas; durante scroll, validar o cabeçalho sticky e a grade de fundo independente dele.
6. Executar `npm run lint` e `npm run build` antes de futuras releases; hoje não há testes automatizados configurados.

## Git e dados sensíveis

- Repositório existente: `https://github.com/BRichardy/rgor-site` (`origin`, branch `main`).
- `.env.local`, chaves e credenciais não devem ser versionados; `.env.example` é o modelo seguro.
- `data/posts.json` e `public/uploads/` são versionados intencionalmente para o conteúdo da versão local.
- Na cópia de trabalho usada para criar este handoff, `docs/PRD-site-freelancer.md` é um arquivo não rastreado de outro projeto. Foi deliberadamente excluído do commit para manter os produtos separados.
