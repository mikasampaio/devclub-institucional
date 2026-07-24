import type { ReactNode } from "react";
import CareerMockup from "./CareerMockup";
import ChatMockup from "./ChatMockup";
import NetworkMockup from "./NetworkMockup";
import SupportMockup from "./SupportMockup";

export type Illustration = "career" | "chat" | "network" | "support";

export type DiferencialCard = {
  id: string;
  /** Grupo temático (eyebrow acima do título). */
  group: string;
  title: string;
  description: string;
  bg: string;
  illustration: Illustration;
};

export const cards: DiferencialCard[] = [
  {
    id: "carreira",
    group: "Carreira",
    title: "Acompanhamento de carreira dedicado",
    description:
      "Acompanhamento semanal com uma recrutadora e acesso a vagas exclusivas — você não busca emprego sozinho.",
    bg: "bg-[#0f4c3a]",
    illustration: "career",
  },
  {
    id: "saude",
    group: "Saúde mental e performance",
    title: "Suporte psicológico de alta performance",
    description:
      "Um terapeuta especializado em alta performance para profissionais de tecnologia, focado no seu equilíbrio e evolução.",
    bg: "bg-[#e0503f]",
    illustration: "chat",
  },
  {
    id: "aprendizado",
    group: "Aprendizado guiado",
    title: "Mentoria e comunidade ativa",
    description:
      "Mentorias semanais e uma comunidade de tecnologia viva para trocar experiência, tirar dúvidas e crescer em rede.",
    bg: "bg-[#5b40e3]",
    illustration: "network",
  },
  {
    id: "suporte",
    group: "Suporte contínuo",
    title: "Suporte 24 horas, todos os dias",
    description:
      "Agentes de IA disponíveis 24h e suporte humano 7 dias por semana — sempre há alguém para destravar você.",
    bg: "bg-[#1866d6]",
    illustration: "support",
  },
];

export const ILLUSTRATIONS: Record<Illustration, () => ReactNode> = {
  career: CareerMockup,
  chat: ChatMockup,
  network: NetworkMockup,
  support: SupportMockup,
};
