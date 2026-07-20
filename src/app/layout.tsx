import type { Metadata } from "next";
import { Inter, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

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
  title: "Nubien — Next-Gen AI Studio",
  description:
    "AI-Driven Success Redefining the Future. Creating latest solutions that redefine innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
