export type Testimonial = {
  quote: string;
  name: string;
  handle: string;
  role?: string;
  /** Depoimento em vídeo — ganha destaque (thumbnail + play). */
  featured?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Depois de otimizar meu fluxo com o que aprendi aqui, minha produtividade aumentou muito. Consigo pegar mais projetos, cobrar o que acho justo e entregar pacotes completos. O DevClub me permitiu crescer como profissional, e a qualidade do que eu crio mudou completamente.",
    name: "Vicente Talento",
    handle: "@vicentetalento",
    role: "Dev Freelancer",
    featured: true,
  },
  {
    quote:
      "Maior ponto de transformação do curso foi que eu consegui sair do zero e gerar muito mais valor para os meus clientes.",
    name: "Carlos Gabriel",
    handle: "@carlos_.ux",
    role: "Front-end Júnior",
  },
  {
    quote:
      "Entrei sem saber nada de programação e em 8 meses consegui minha primeira vaga como desenvolvedora. Foi a melhor decisão que tomei na vida.",
    name: "Aline Ferreira",
    handle: "@aline.dev",
    role: "Dev Júnior",
    featured: true,
  },
  {
    quote:
      "A comunidade faz toda a diferença. Sempre que travo em algo, tem alguém pronto pra ajudar. Nunca me senti sozinho na jornada.",
    name: "Rafael Souza",
    handle: "@rafa.codes",
    role: "Estudante Full Stack",
  },
  {
    quote:
      "Troquei um emprego que me sugava por uma carreira que eu amo. Hoje trabalho remoto para uma empresa fora do país.",
    name: "Marina Costa",
    handle: "@marina.tech",
    role: "React Developer",
  },
  {
    quote:
      "O que mais me marcou foi a didática. Conteúdo direto ao ponto, projetos reais e mentoria de verdade. Recomendo de olhos fechados.",
    name: "Bruno Lima",
    handle: "@brunolima.js",
    role: "Back-end Developer",
  },
  {
    quote:
      "Dobrei meu salário em menos de um ano. O método realmente funciona pra quem se dedica.",
    name: "Juliana Alves",
    handle: "@ju.alves",
    role: "Dev Pleno",
  },
];
