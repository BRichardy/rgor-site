export type Project = {
  name: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  href?: string;
  status?: "em produção" | "concluído" | "em evolução";
};

export const profile = {
  name: "Ricardo Guilherme Oliveira Resende",
  shortName: "RGOR",
  role: "Desenvolvedor Júnior · Python · JavaScript · APIs",
  location: "Salvador, BA · Remoto",
  availability: "Disponível imediatamente",
  pitch:
    "Construo produtos próprios e automações que resolvem problemas reais. Gosto especialmente de Python — e uso JavaScript/TypeScript quando o produto pede interface e velocidade de entrega.",
  about: [
    "Sou desenvolvedor júnior com experiência em web, APIs REST e projetos SaaS em produção. Estudante de Sistemas de Informação na UFBA, com formação técnica em Informática pelo IFBA.",
    "Criei e mantenho produtos próprios — ZapTree, ARQNODE e ChegaCliente — do zero à operação. No dia a dia também atuo com suporte e automações, o que me obrigou a pensar em estabilidade, integração e impacto mensurável.",
    "Uso IA no workflow (Cursor, Claude) para acelerar entrega sem abrir mão de revisão e ownership. Trabalho bem de forma remota e autônoma, com Git, Docker e VPS no caminho.",
  ],
  focus: [
    "Python para backends, automações e APIs",
    "Produtos SaaS com impacto real",
    "Integrações REST, webhooks e dados",
  ],
  projects: [
    {
      name: "ZapTree",
      role: "Desenvolvedor & Idealizador",
      period: "2024 – presente",
      status: "em produção",
      summary:
        "SaaS de automação WhatsApp com arquitetura modular em Python — cinco módulos independentes, agendamento, simulação de comportamento humano e rotação de pares.",
      highlights: [
        "Backend FastAPI com endpoints REST e webhooks via Evolution API",
        "Orquestração com schedule e threading em Python 3.11+",
        "Deploy em VPS Linux com Docker",
      ],
      stack: ["Python", "FastAPI", "SQLite", "Docker", "VPS Linux"],
    },
    {
      name: "ARQNODE",
      role: "Desenvolvedor Full-Stack",
      period: "2023 – 2024",
      status: "concluído",
      summary:
        "CRM web para escritórios de arquitetura: clientes, projetos, orçamentos e cronogramas com dashboard em tempo real.",
      highlights: [
        "Interface responsiva em Next.js, TypeScript e Tailwind",
        "APIs REST integradas a MySQL",
        "Fluxos pensados para operação diária do escritório",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind", "MySQL", "shadcn/ui"],
    },
    {
      name: "ChegaCliente",
      role: "Desenvolvedor & Idealizador",
      period: "2024",
      status: "concluído",
      summary:
        "SaaS de geração de landing pages para autônomos — jardineiros, nutricionistas, diaristas, personal trainers.",
      highlights: [
        "Páginas com formulário de contato (e-mail e WhatsApp)",
        "Persistência com Firebase",
        "Foco em conversão e autonomia do profissional",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind", "Firebase", "Node.js"],
    },
    {
      name: "Este site",
      role: "Desenvolvedor Full-Stack",
      period: "2026",
      status: "em evolução",
      summary:
        "Portfólio + feed técnico com admin autenticado: publicar posts, capa e Markdown — produto vivo para mostrar como penso e entrego.",
      highlights: [
        "Next.js, TypeScript e Tailwind",
        "Supabase (Auth, Postgres, Storage)",
        "Fluxo completo: público + painel admin",
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      href: "/",
    },
  ] satisfies Project[],
  stack: {
    Linguagens: ["Python 3.11+", "JavaScript", "TypeScript", "HTML/CSS"],
    Backend: ["FastAPI", "Django", "Node.js", "REST", "Webhooks"],
    Frontend: ["Angular", "React", "Next.js", "RxJS", "Tailwind"],
    Dados: ["MySQL", "SQLite", "Firebase", "PostgreSQL"],
    Ops: ["Git", "Docker", "VPS Linux"],
  },
  journey: [
    {
      title: "Auxiliar Técnico de TI",
      org: "Diamantes Consultoria Financeira",
      period: "Jun 2025 – presente",
      note: "Suporte corporativo e automações em Python/JavaScript para rotinas internas.",
    },
    {
      title: "Automações & Suporte N2",
      org: "Prospera+",
      period: "Set 2024 – Mar 2025",
      note: "Automações, APIs REST e scraping com Selenium/BeautifulSoup (50k+ registros).",
    },
    {
      title: "Desenvolvedor Full-Stack",
      org: "On3 Solutions",
      period: "Fev 2021 – Dez 2021",
      note: "Apps web com Angular/TypeScript, APIs REST e otimização MySQL.",
    },
  ],
  education: [
    {
      title: "Sistemas de Informação",
      detail: "UFBA · Bacharelado · 2021 – 2026",
    },
    {
      title: "Técnico em Informática",
      detail: "IFBA · Ensino Médio Integrado · 2018 – 2021",
    },
  ],
  links: [
    { label: "E-mail", href: "mailto:gui.resende@hotmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rgor" },
    { label: "GitHub", href: "https://github.com/BRichardy" },
    { label: "WhatsApp", href: "https://wa.me/5575992656357" },
  ],
} as const;
