import type { Metadata } from "next";
import { Google_Sans, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import CursorDot from "@/components/ui/CursorDot";

// Fonte padrão do site (corpo de texto). É variável (wght 400–700).
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

// Fonte manuscrita usada nas assinaturas dos certificados (é variável, sem weight).
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevClub — A Escola das Profissões do Futuro",
  description:
    "Do zero à primeira vaga em tecnologia. Aprenda a programar com metodologia prática, projetos reais e mentoria de quem já vive o mercado. +25 mil alunos já passaram por aqui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${googleSans.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/* Desabilita a restauração de scroll do navegador para que todo reload
            comece no topo (hero) em vez da última posição. Roda de forma
            síncrona no parse do <head>, antes da pintura, evitando o "pulo". */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history)history.scrollRestoration='manual';",
          }}
        />
      </head>
      {/* suppressHydrationWarning: extensões de navegador injetam atributos no
          body (ex.: cz-shortcut-listen) antes da hidratação, gerando um mismatch
          inofensivo. Suprime só neste nível. */}
      <body
        className="min-h-full flex flex-col overflow-x-clip"
        suppressHydrationWarning
      >
        <CursorDot />
        {children}
      </body>
    </html>
  );
}
