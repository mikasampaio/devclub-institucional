import type { Metadata } from "next";
import { Inter, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import CursorDot from "@/components/CursorDot";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <CursorDot />
        {children}
      </body>
    </html>
  );
}
