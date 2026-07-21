export type BonusClass = {
  specialist: string;
  topic: string;
  duration: string;
  /** Foto do especialista (opcional). Sem foto, usa o MentorAvatar (blob gerado a partir do nome). */
  image?: string;
};

export const BONUS_CLASSES: BonusClass[] = [
  {
    specialist: "Especialista Convidado 1",
    topic: "LinkedIn",
    duration: "1h10m",
    image: "/professionals/6.jpg",
  },
  {
    specialist: "Especialista Convidado 2",
    topic: "Git e GitHub",
    duration: "1h25m",
    image: "/professionals/7.jpg",
  },
  {
    specialist: "Especialista Convidado 3",
    topic: "Inglês para Programadores",
    duration: "1h40m",
    image: "/professionals/8.jpg",
  },
  {
    specialist: "Especialista Convidado 4",
    topic: "Currículo",
    duration: "0h50m",
    image: "/professionals/9.jpg",
  },
  {
    specialist: "Especialista Convidado 5",
    topic: "Entrevistas",
    duration: "1h20m",
    image: "/professionals/10.jpg",
  },
  {
    specialist: "Especialista Convidado 6",
    topic: "Freelancing",
    duration: "1h05m",
    image: "/professionals/6.jpg",
  },
  {
    specialist: "Especialista Convidado 7",
    topic: "Soft Skills",
    duration: "1h15m",
    image: "/professionals/7.jpg",
  },
];
