<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# RGOR — contexto do projeto

## Objetivo

Site pessoal de tecnologia em português brasileiro, com duas funções:

- **Perfil**: apresentar Ricardo, sua trajetória e seus projetos como desenvolvedor.
- **Início**: feed pessoal de notas e experiências sobre software, dados, ferramentas e tecnologia. Não é um jornal profissional.

O projeto também serve como produto demonstrável: inclui publicação, administração, upload de imagens, temas e renderização de conteúdo.

## Stack e identidade

- Next.js App Router 16, React 19, TypeScript e Tailwind CSS 4.
- Supabase opcional para Auth, Postgres e Storage; sem configuração, o app opera em modo local.
- Interface pt-BR, visual tech, temas dark/light com preferência salva no navegador.
- Fontes Space Grotesk e JetBrains Mono; grid azul suave no topo e no rodapé do fundo.
- Repositório GitHub: `BRichardy/rgor-site`, branch principal `main`.

## Rotas principais

| Rota | Uso |
|---|---|
| `/` | Feed público de posts publicados |
| `/posts/[slug]` | Página pública de um post |
| `/profile` | Portfólio público |
| `/admin` | Login do administrador |
| `/admin/inicio` | Pré-visualização do feed dentro do admin |
| `/admin/posts` | Lista, criação, edição e exclusão de posts |
| `/admin/posts/[id]/view` | Pré-visualização interna de um post |
| `/admin/profile` | Pré-visualização interna do portfólio |

O cabeçalho administrativo mantém links para Início, Posts e Perfil. A navegação interna permite revisar conteúdo sem sair do admin; a URL pública pode ser aberta explicitamente.

## Conteúdo e publicação

- `data/posts.json` guarda posts no modo local e é versionado junto com o projeto.
- `public/uploads/` guarda imagens locais usadas como capa ou em blocos e também é versionado.
- Não versionar `.env.local`, tokens, chaves privadas ou credenciais.
- O modo local usa `ADMIN_PASSWORD` para autenticação. Configure uma senha própria em `.env.local`; não dependa do valor padrão do código.
- Quando `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão configuradas, o app usa Supabase para autenticação e persistência.
- O schema, as políticas de acesso e o bucket de capas estão descritos em `supabase/migrations/20260321000000_posts.sql`; `supabase/seed.sql` é opcional.
- A persistência local escreve no sistema de arquivos. É adequada para desenvolvimento local e não deve ser considerada armazenamento durável em hospedagem serverless.

### Modelo do corpo do post

`posts.body` continua sendo uma string. Posts novos guardam JSON serializado de `ContentBlock[]` (`text` e `image`), criado pelo editor em `src/components/block-editor.tsx`. `src/lib/blocks.ts` faz parse e serialização. Texto é renderizado por `react-markdown`, então a sintaxe Markdown continua disponível dentro dos blocos de texto; conteúdo Markdown antigo é aceito como um bloco de texto legado.

O editor permite adicionar blocos de texto e imagem, mover e excluir blocos, formatar texto com botões e consultar a janela de ajuda. A imagem de capa é independente das imagens inseridas no corpo.

## Componentes e arquivos de referência

- `src/content/site.ts`: nome, descrição e URL do site.
- `src/content/profile.ts`: identidade, projetos, experiência e contatos do portfólio.
- `src/lib/posts.ts`: leitura e gravação de posts, alternando entre modo local e Supabase.
- `src/lib/local-store.ts`, `src/lib/local-auth.ts`: armazenamento e login locais.
- `src/components/post-editor.tsx`, `src/components/block-editor.tsx`: formulário e editor por blocos.
- `src/components/post-body.tsx`, `src/components/markdown.tsx`: renderização pública/admin.
- `src/lib/theme.ts`, `src/components/theme-provider.tsx`, `src/components/theme-toggle.tsx`: preferência e controle de tema.
- `src/app/globals.css`: tokens, estilos globais, animações e decoração do fundo.
- `supabase/`: migration e seed do backend opcional.

## Estado atual

- Projeto local sincronizado com GitHub na branch `main`.
- Última sincronização registrada: commit `c65d122` (editor por blocos, alternância de tema e conteúdo local).
- Posts locais e imagens de upload estão no repositório; `.env.local`, `node_modules/` e `.next/` ficam excluídos.
- O site está em desenvolvimento local; não há publicação de produção assumida neste contexto.
- O projeto tem CRUD local, mas não há evidência aqui de implantação ou configuração de um projeto Supabase remoto.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

URLs locais: `http://localhost:3000`, `/profile` e `/admin`.

## Orientações para mudanças

- Preserve pt-BR, a identidade tech, o suporte aos temas claro/escuro e a navegação administrativa interna.
- Preserve a compatibilidade de posts Markdown legados ao mudar o formato do corpo.
- Não coloque credenciais em arquivos versionados; mantenha `.env.local` fora do Git.
- Antes de alterar código Next.js, leia a documentação instalada indicada no bloco Next.js acima, pois a versão do framework pode ter APIs diferentes das conhecidas.
- Ao alterar persistência, verifique ambos os caminhos: modo local e Supabase, quando aplicável.
