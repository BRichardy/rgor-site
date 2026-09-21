# RGOR — Portfólio + notas técnicas

Site em **português brasileiro**: portfólio de tecnologia e espaço para publicar posts sobre software, dados e ferramentas.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Auth, Postgres, Storage)
- Deploy: Vercel

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

Sem as vars do Supabase, o **site público roda** com posts de exemplo. Publicar pelo admin exige Supabase.

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
