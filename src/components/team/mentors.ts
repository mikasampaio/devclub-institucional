export type Mentor = {
  name: string;
  role: string;
  /** Bio exibida no verso do card ao clicar no "+". */
  bio: string;
  /** Áreas de atuação — viram pílulas no verso. */
  skills: string[];
  /** Caminho da foto (opcional). Sem foto, usa placeholder em gradiente. */
  image?: string;
};

export const MENTORS: Mentor[] = [
  {
    name: "Rodolfo Mori",
    role: "Fundador & Mentor Chefe",
    bio: "Fundador do DevClub e mentor há mais de 10 anos. Já formou milhares de desenvolvedores do zero à primeira vaga, com foco em carreira, mentalidade e projetos reais de mercado.",
    skills: ["Carreira", "JavaScript", "Liderança"],
    image: "/professionals/rodolfo.png",
  },
  {
    name: "Fernanda Lima",
    role: "UX/UI Designer",
    bio: "Product Designer com passagem por grandes produtos digitais. Especialista em transformar ideias em interfaces bonitas e funcionais, guiando alunos do wireframe ao protótipo de alta fidelidade.",
    skills: ["Figma", "UI Design", "Prototipagem"],
    image: "/professionals/1.jpg",
  },
  {
    name: "Agustinho Silva",
    role: "Back-end Developer",
    bio: "Engenheiro de software focado em back-end e arquitetura de sistemas. Ensina desde os fundamentos de APIs até bancos de dados e boas práticas de código em produção.",
    skills: ["Node.js", "APIs", "Bancos de Dados"],
    image: "/professionals/3.jpg",
  },
  {
    name: "Henrique Alves",
    role: "Front-end Specialist",
    bio: "Especialista em front-end moderno. Apaixonado por performance e experiência do usuário, ajuda os alunos a dominarem o ecossistema React e a construírem interfaces profissionais.",
    skills: ["React", "Next.js", "TypeScript"],
    image: "/professionals/2.jpg",
  },
  {
    name: "Márcio Rocha",
    role: "Full Stack Developer",
    bio: "Desenvolvedor full stack com experiência em times de alta escala. Conecta front-end, back-end e infraestrutura, mostrando como entregar produtos completos de ponta a ponta.",
    skills: ["Java", "Spring", "DevOps"],
    image: "/professionals/3.jpg",
  },
  {
    name: "Juliana Souza",
    role: "Mobile Developer",
    bio: "Desenvolvedora mobile que já publicou dezenas de apps nas lojas. Domina desenvolvimento multiplataforma e guia os alunos na criação de aplicativos do design à publicação.",
    skills: ["React Native", "Flutter", "Mobile"],
    image: "/professionals/5.jpg",
  },
  {
    name: "Mateus Carvalho",
    role: "Especialista em Dados",
    bio: "Cientista de dados focado em transformar dados em decisões. Ensina Python, análise e os fundamentos de machine learning aplicados a problemas reais de negócio.",
    skills: ["Python", "SQL", "Data Science"],
    image: "/professionals/2.jpg",
  },
];
