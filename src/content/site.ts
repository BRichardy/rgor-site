export const site = {
  name: "RGOR",
  tagline: "Portfólio e notas técnicas do que eu construo e aprendo.",
  description:
    "Portfólio de tecnologia e espaço para publicar notas sobre software, dados, ferramentas e o que eu testo na prática.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
