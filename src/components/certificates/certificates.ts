import {
  Braces,
  Layout,
  Server,
  Smartphone,
  Palette,
  type LucideIcon,
} from "lucide-react";

/**
 * Tema de cor de um certificado. As cores mudam por curso (verde-limão,
 * vermelho, etc.) e por isso viajam como valores (hex/rgba) aplicados via
 * `style` inline — não dá pra pré-compilar classes Tailwind dinâmicas.
 *
 *  - `surface`: cor sólida vibrante que preenche o card.
 *  - `ink` / `inkSoft`: texto sobre o card (contraste alto/baixo).
 *  - `hairline`: cor da divisória e da linha pontilhada do rodapé.
 *  - `chip`: cor do chip/aba ativa correspondente a este curso.
 */
export type CertificateTheme = {
  surface: string;
  ink: string;
  inkSoft: string;
  hairline: string;
  chip: string;
};

export type Certificate = {
  id: string;
  /** Nome curto do curso, exibido no chip/aba. */
  course: string;
  /** Título grande no corpo do card. */
  title: string;
  /** Aluno em destaque. */
  student: string;
  /** Carga horária (aparece em negrito no parágrafo). */
  hours: number;
  /** Assinante (professor/coordenador) sob a assinatura. */
  signer: string;
  icon: LucideIcon;
  theme: CertificateTheme;
};

// Paleta pensada para o DevClub: um limão vibrante (referência) + variações
// que dialogam com o roxo da marca, garantindo contraste do texto em cada fundo.
export const CERTIFICATES: Certificate[] = [
  {
    id: "fullstack",
    course: "Full Stack",
    title: "Certificado de Conclusão do Full Stack",
    student: "Vitor Fernandes Rodrigues de Barros",
    hours: 480,
    signer: "Kácio Filipe",
    icon: Braces,
    theme: {
      surface: "#c9f24a",
      ink: "#0a0f04",
      inkSoft: "rgba(10,15,4,0.72)",
      hairline: "rgba(10,15,4,0.18)",
      chip: "#c9f24a",
    },
  },
  {
    id: "frontend",
    course: "Front-end",
    title: "Certificado de Conclusão do Front-end",
    student: "Mariana Oliveira Costa",
    hours: 220,
    signer: "Kácio Filipe",
    icon: Layout,
    theme: {
      surface: "#d64b3f",
      ink: "#fff7f5",
      inkSoft: "rgba(255,247,245,0.78)",
      hairline: "rgba(255,247,245,0.22)",
      chip: "#d64b3f",
    },
  },
  {
    id: "backend",
    course: "Back-end",
    title: "Certificado de Conclusão do Back-end",
    student: "Rafael Santos Almeida",
    hours: 260,
    signer: "Kácio Filipe",
    icon: Server,
    theme: {
      surface: "#7c3aed",
      ink: "#f6f2ff",
      inkSoft: "rgba(246,242,255,0.78)",
      hairline: "rgba(246,242,255,0.22)",
      chip: "#7c3aed",
    },
  },
  {
    id: "mobile",
    course: "Mobile",
    title: "Certificado de Conclusão do Mobile",
    student: "Beatriz Lima Ferreira",
    hours: 180,
    signer: "Kácio Filipe",
    icon: Smartphone,
    theme: {
      surface: "#22b8cf",
      ink: "#041417",
      inkSoft: "rgba(4,20,23,0.72)",
      hairline: "rgba(4,20,23,0.18)",
      chip: "#22b8cf",
    },
  },
  {
    id: "uiux",
    course: "UI/UX Design",
    title: "Certificado de Conclusão do UI/UX Design",
    student: "Lucas Pereira Nunes",
    hours: 160,
    signer: "Kácio Filipe",
    icon: Palette,
    theme: {
      surface: "#f59f00",
      ink: "#1a1200",
      inkSoft: "rgba(26,18,0,0.72)",
      hairline: "rgba(26,18,0,0.18)",
      chip: "#f59f00",
    },
  },
];
