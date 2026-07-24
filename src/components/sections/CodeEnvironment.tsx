"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Play, TerminalSquare, Settings, MousePointer2 } from "lucide-react";

const MOBILE_QUERY = "(max-width: 640px)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** `true` no viewport mobile — via useSyncExternalStore (regra do React Compiler). */
function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

/**
 * `false` no SSR e na 1ª renderização do cliente; `true` após a hidratação.
 * Evita o "flash": no primeiro paint o card sai reto e só recebe a inclinação
 * quando o scroll já foi medido de verdade.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Cores do syntax highlight simulado — roxo/cyan/magenta sobre tema dark. */
const SYNTAX = {
  keyword: "text-[#a78bfa]", // roxo/violeta (import, export, return)
  tag: "text-[#22d3ee]", // cyan (nomes de componente / tags JSX)
  attr: "text-[#e879f9]", // magenta (props / atributos)
  string: "text-[#e6b450]", // âmbar (strings)
  comment: "text-muted", // comentários
  punc: "text-faded", // pontuação leve
} as const;

/** Árvore de arquivos da sidebar. */
const FILE_TREE = [
  { label: "src", depth: 0, kind: "folder" as const },
  { label: "components", depth: 1, kind: "folder" as const },
  { label: "Card.jsx", depth: 2, kind: "file" as const, active: true },
  { label: "App.jsx", depth: 1, kind: "file" as const },
  { label: "index.css", depth: 1, kind: "file" as const },
];

export default function CodeEnvironment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isHydrated = useIsHydrated();

  // Inclinação inicial menor no mobile p/ evitar distorção; zero se reduce-motion.
  const startTilt = reduceMotion ? 0 : isMobile ? 7 : 14;

  // Progresso do scroll amarrado à entrada do card (scrub).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  // Deitado (rotateX = startTilt) na entrada -> reto (0) ao chegar ao centro.
  // Antes da hidratação fica reto (0) p/ evitar o flash de inclinação no reload.
  const rotateX = useTransform(scrollYProgress, (v) =>
    isHydrated ? (1 - v) * startTilt : 0,
  );

  return (
    <section
      id="ambiente"
      className="relative w-full pt-16 text-left"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col items-center">
        {/* Palco com perspectiva 3D */}
        <div
          ref={containerRef}
          className="w-full"
          style={{ perspective: "900px" }}
        >
          <motion.div
            style={{
              rotateX,
              transformOrigin: "center",
              willChange: "transform",
            }}
            className="relative rounded-2xl border border-line bg-surface shadow-2xl shadow-accent/20 ring-1 ring-white/5"
          >
            {/* Barra da janela do editor */}
            <div className="flex items-center gap-4 border-b border-line px-4 py-3">
              {/* Semáforos */}
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>

              {/* Aba do arquivo */}
              <div className="flex items-center gap-2 rounded-md border border-line bg-surface-2 px-3 py-1 text-xs text-foreground">
                <span className="size-2 rounded-sm bg-accent-soft" />
                FullStack.js
              </div>

              {/* Ícones de ação */}
              <div className="ml-auto flex items-center gap-3 text-muted">
                <Play size={15} className="text-secondary" />
                <TerminalSquare size={15} />
                <Settings size={15} />
              </div>
            </div>

            {/* Conteúdo em duas colunas */}
            <div className="flex">
              {/* Sidebar */}
              <aside className="hidden w-56 shrink-0 flex-col border-r border-line bg-surface-2/60 md:flex">
                <div className="flex flex-col gap-1 p-3">
                  <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Explorer
                  </p>
                  {FILE_TREE.map((node) => (
                    <div
                      key={node.label}
                      style={{ paddingLeft: `${node.depth * 14 + 8}px` }}
                      className={`flex items-center gap-2 rounded-md py-1.5 pr-2 text-xs ${
                        node.active
                          ? "bg-accent/15 text-foreground"
                          : "text-muted"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-[2px] ${
                          node.kind === "folder"
                            ? "bg-accent-soft"
                            : "bg-white/25"
                        }`}
                      />
                      {node.label}
                    </div>
                  ))}
                </div>

                {/* Card do aluno */}
                <div className="mt-auto m-3 flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                  <Image
                    src="/professionals/2.jpg"
                    alt="Aluno DevClub"
                    width={44}
                    height={44}
                    className="size-11 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">
                      Kácio Felipe
                    </p>
                    <p className="truncate text-[11px] text-accent-soft">
                      Aluno DevClub — Full Stack
                    </p>
                  </div>
                </div>
              </aside>

              {/* Editor de código */}
              <div className="relative min-w-0 flex-1 overflow-hidden p-4 sm:p-6">
                <CodeBlock />

                {/* Anotação "Componente" */}
                <span className="absolute right-4 top-6 hidden rounded-md border border-accent/40 bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent-soft sm:block">
                  Componente
                </span>

                {/* Marcador "props" com linha pontilhada */}
                <div className="absolute left-40 top-[3.1rem] hidden items-center gap-2 lg:flex">
                  <span className="h-px w-16 border-t border-dashed border-[#e879f9]/70" />
                  <span className="rounded-full bg-[#e879f9]/15 px-2 py-0.5 text-[10px] font-medium text-[#e879f9]">
                    props
                  </span>
                </div>

                {/* Pílula flutuante de deploy */}
                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary-soft shadow-lg shadow-black/40 backdrop-blur">
                  <span className="size-1.5 rounded-full bg-secondary" />✓
                  Deploy concluído
                </div>

                {/* Cursor de mouse ao vivo */}
                <MousePointer2
                  aria-hidden="true"
                  size={22}
                  className="absolute left-1/2 top-1/2 fill-white/90 text-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Trecho de código React com syntax highlight simulado + numeração. */
function CodeBlock() {
  const lines = [
    <>
      <span className={SYNTAX.keyword}>import</span>{" "}
      <span className={SYNTAX.punc}>{"{ motion }"}</span>{" "}
      <span className={SYNTAX.keyword}>from</span>{" "}
      <span className={SYNTAX.string}>&quot;framer-motion&quot;</span>
      <span className={SYNTAX.punc}>;</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className={SYNTAX.keyword}>export function</span>{" "}
      <span className={SYNTAX.tag}>Card</span>
      <span className={SYNTAX.punc}>(</span>
      <span className={SYNTAX.attr}>{"{ title, tag }"}</span>
      <span className={SYNTAX.punc}>) {"{"}</span>
    </>,
    <>
      {"  "}
      <span className={SYNTAX.keyword}>return</span>{" "}
      <span className={SYNTAX.punc}>(</span>
    </>,
    <>
      {"    "}
      <span className={SYNTAX.punc}>&lt;</span>
      <span className={SYNTAX.tag}>article</span>{" "}
      <span className={SYNTAX.attr}>className</span>
      <span className={SYNTAX.punc}>=</span>
      <span className={SYNTAX.string}>&quot;card&quot;</span>
      <span className={SYNTAX.punc}>&gt;</span>
    </>,
    <>
      {"      "}
      <span className={SYNTAX.punc}>&lt;</span>
      <span className={SYNTAX.tag}>span</span>
      <span className={SYNTAX.punc}>&gt;{"{"}</span>
      <span className={SYNTAX.attr}>tag</span>
      <span className={SYNTAX.punc}>{"}"}&lt;/</span>
      <span className={SYNTAX.tag}>span</span>
      <span className={SYNTAX.punc}>&gt;</span>
    </>,
    <>
      {"      "}
      <span className={SYNTAX.punc}>&lt;</span>
      <span className={SYNTAX.tag}>h3</span>
      <span className={SYNTAX.punc}>&gt;{"{"}</span>
      <span className={SYNTAX.attr}>title</span>
      <span className={SYNTAX.punc}>{"}"}&lt;/</span>
      <span className={SYNTAX.tag}>h3</span>
      <span className={SYNTAX.punc}>&gt;</span>
    </>,
    <>
      {"      "}
      <span className={SYNTAX.punc}>&lt;</span>
      <span className={SYNTAX.tag}>button</span>
      <span className={SYNTAX.punc}>&gt;</span>
      <span className={SYNTAX.string}>Ler artigo</span>
      <span className={SYNTAX.punc}>&lt;/</span>
      <span className={SYNTAX.tag}>button</span>
      <span className={SYNTAX.punc}>&gt;</span>
    </>,
    <>
      {"    "}
      <span className={SYNTAX.punc}>&lt;/</span>
      <span className={SYNTAX.tag}>article</span>
      <span className={SYNTAX.punc}>&gt;</span>
    </>,
    <>
      {"  "}
      <span className={SYNTAX.punc}>);</span>
    </>,
    <>
      <span className={SYNTAX.punc}>{"}"}</span>
    </>,
  ];

  return (
    <pre className="overflow-x-auto font-mono text-[11px] leading-6 sm:text-xs">
      <code className="grid grid-cols-[auto_1fr] gap-x-4">
        {lines.map((line, i) => (
          <div key={i} className="contents">
            <span className="select-none text-right text-white/20">
              {i + 1}
            </span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}
