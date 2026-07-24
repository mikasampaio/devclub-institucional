import { type StaticImageData } from "next/image";
import pageOne from "./assets/page_one.png";
import pageTwo from "./assets/page_two.png";
import pageThree from "./assets/page_three.png";

export type ShowcaseProject = {
  src: StaticImageData;
  alt: string;
};

export const PROJECTS: ShowcaseProject[] = [
  {
    src: pageOne,
    alt: "Landing page de app financeiro criada por aluno da Academy Skills",
  },
  {
    src: pageTwo,
    alt: "Landing page de banco digital criada por aluno da Academy Skills",
  },
  {
    src: pageThree,
    alt: "Landing page de plataforma de investimentos criada por aluno da Academy Skills",
  },
];
