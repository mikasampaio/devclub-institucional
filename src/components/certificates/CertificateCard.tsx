"use client";

import { useState, type Ref } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Share2, Copy, Check, X } from "lucide-react";
import type { Certificate } from "./certificates";
import ActionButton from "./ActionButton";
import Signature from "./Signature";

type CertificateCardProps = {
  certificate: Certificate;
  /**
   * Ref opcional para o nó do card. Fica pronto para uma futura exportação
   * como imagem (ver nota `exportCertificate` no fim do arquivo).
   */
  ref?: Ref<HTMLDivElement>;
};

/**
 * Card de certificado no estilo "ticket": cabeçalho com logo + ações,
 * corpo em 2 colunas (título / aluno + descrição) e rodapé perfurado com
 * assinatura manuscrita. Todas as cores vêm de `certificate.theme` e são
 * aplicadas via `style` inline porque mudam por curso.
 */
export default function CertificateCard({
  certificate,
  ref,
}: CertificateCardProps) {
  const { theme, icon: Icon } = certificate;
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  // Copia um link fake do certificado; feedback transitório de "copiado".
  const copyLink = () => {
    const url = `https://devclub.com.br/certificados/${certificate.id}`;
    void navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.article
      ref={ref}
      // Entrada do card: fade + slide sutil de baixo para cima ao entrar em tela.
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative flex h-full flex-col rounded-3xl p-6 sm:p-9"
      style={{ backgroundColor: theme.surface, color: theme.ink }}
    >
      {/* ---------------- Cabeçalho: logo + ações ---------------- */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex size-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: theme.ink, color: theme.surface }}
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={2.5} />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-bold tracking-tight">
              DEVCLUB
            </span>
            <span
              className="block text-xs tracking-wide"
              style={{ color: theme.inkSoft }}
            >
              certificado
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ActionButton label="Compartilhar" theme={theme}>
            <Share2 aria-hidden="true" className="size-4" />
          </ActionButton>
          <ActionButton label="Copiar link" theme={theme} onClick={copyLink}>
            {copied ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <Copy aria-hidden="true" className="size-4" />
            )}
          </ActionButton>
          <ActionButton label="Fechar" theme={theme} square>
            <X aria-hidden="true" className="size-4" />
          </ActionButton>
        </div>
      </header>

      {/* Divisória fina abaixo do cabeçalho */}
      <hr
        className="mt-6 border-0 border-t"
        style={{ borderColor: theme.hairline }}
      />

      {/* ---------------- Corpo: título | aluno + descrição ---------------- */}
      <div className="grid flex-1 gap-6 py-8 sm:py-10 md:grid-cols-2 md:gap-10">
        <h3 className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          {certificate.title}
        </h3>

        <div>
          <p className="text-xl font-semibold leading-snug sm:text-2xl">
            {certificate.student}
          </p>
          <p
            className="mt-3 max-w-sm text-sm leading-relaxed"
            style={{ color: theme.inkSoft }}
          >
            Participou e concluiu com êxito o curso{" "}
            <strong className="font-semibold" style={{ color: theme.ink }}>
              {certificate.course}
            </strong>{" "}
            com uma carga horária de{" "}
            <strong className="font-semibold" style={{ color: theme.ink }}>
              {certificate.hours} horas
            </strong>
            . Este curso ofereceu conhecimentos teóricos e práticos essenciais
            para o desenvolvimento de projetos profissionais seguindo as
            melhores práticas.
          </p>
        </div>
      </div>

      {/* ---------------- Rodapé "ticket" com perfuração + assinatura ------ */}
      <footer className="relative mt-auto pt-8">
        {/* Notches laterais na cor do fundo da seção simulam a perfuração */}
        <span
          aria-hidden="true"
          className="absolute -left-9 top-0 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background sm:-left-12"
        />
        <span
          aria-hidden="true"
          className="absolute -right-9 top-0 size-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-background sm:-right-12"
        />
        {/* Linha pontilhada horizontal (a "perfuração" do ticket) */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 border-t border-dashed"
          style={{ borderColor: theme.hairline }}
        />

        <div className="flex flex-col items-center text-center">
          <Signature name={certificate.signer} theme={theme} />
          <span
            className="mt-1 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: theme.inkSoft }}
          >
            {certificate.signer}
          </span>
        </div>
      </footer>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- *
 * FUTURO — Exportar o card como imagem
 * -------------------------------------------------------------------------- *
 * Passe uma ref para <CertificateCard ref={cardRef} /> e, após instalar
 * `html-to-image` (npm i html-to-image), habilite:
 *
 *   import { toPng } from "html-to-image";
 *   export async function exportCertificate(node: HTMLElement, name: string) {
 *     const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
 *     const link = document.createElement("a");
 *     link.download = `certificado-${name}.png`;
 *     link.href = dataUrl;
 *     link.click();
 *   }
 * -------------------------------------------------------------------------- */
