# RGOR — Perfil + notas técnicas

Site pessoal em **português brasileiro** com perfil/portfólio de tecnologia e feed de notas, experiências e opiniões sobre software, dados, ferramentas e tecnologia. O feed é pessoal, não um jornal profissional.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase opcional (Auth, Postgres e Storage)
- Modo local para desenvolvimento, sem exigir Supabase

O histórico, decisões, limitações conhecidas e próximos passos estão em [`docs/rgor-site/PROJECT-HANDOFF.md`](docs/rgor-site/PROJECT-HANDOFF.md). Não há implantação de produção confirmada neste contexto.

## Setup local

### 1. Instalar

```bash
npm install
```

### 2. Ambiente

```bash
cp .env.example .env.local
```

| Variável                        | Onde pegar                                               |
| ------------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Project Settings → API                        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Mesma página (anon / publishable key)                    |
| `NEXT_PUBLIC_SITE_URL`          | `http://localhost:3000` local; URL da Vercel em produção |

Sem as vars do Supabase, o site usa **modo local**: admin com `ADMIN_PASSWORD`, posts em `data/posts.json` e uploads em `public/uploads/`. Configure uma senha própria em `.env.local`; o modo local e o armazenamento em disco são para desenvolvimento, não para hospedagem serverless.

### 3. Banco e storage

No SQL Editor do Supabase, rode:

1. [`supabase/migrations/20260321000000_posts.sql`](supabase/migrations/20260321000000_posts.sql)
2. Opcional: [`supabase/seed.sql`](supabase/seed.sql)

### 4. Usuário admin

Supabase → **Authentication** → **Users** → **Add user** (e-mail + senha).

### 5. Rodar

```bash
npm run dev
```

- Início: http://localhost:3000
- Perfil: http://localhost:3000/profile
- Admin: http://localhost:3000/admin

## Personalizar

- Perfil: [`src/content/profile.ts`](src/content/profile.ts)
- Marca / tagline: [`src/content/site.ts`](src/content/site.ts)

## Rotas

| Path            | Função        |
| --------------- | ------------- |
| `/`             | Feed de posts |
| `/posts/[slug]` | Post          |
| `/profile`      | Portfólio     |
| `/admin`        | Login         |
| `/admin/posts`  | CRUD          |

O administrador também tem pré-visualizações internas em `/admin/inicio`, `/admin/posts/[id]/view` e `/admin/profile`, sem precisar sair da área administrativa. A URL pública pode ser aberta explicitamente.
