"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import type { Mentor } from "./mentors";
import MentorAvatar from "./MentorAvatar";

/**
 * Card de mentor com dois lados:
 *  - Frente: foto + nome/profissão e um botão "+" no canto.
 *  - Verso: bio e áreas de atuação, revelados ao clicar no "+".
 * O flip é um rotateY 3D; cada face esconde o próprio verso (backface-hidden).
 */
export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="perspective-[1400px]">
      <motion.div
        className="relative aspect-4/5 w-full transform-3d"
        animate={{ rotateY: open ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardFront mentor={mentor} onOpen={() => setOpen(true)} />
        <CardBack mentor={mentor} onClose={() => setOpen(false)} />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Frente — foto + nome/profissão + botão "+"                                  */
/* -------------------------------------------------------------------------- */

function CardFront({
  mentor,
  onOpen,
}: {
  mentor: Mentor;
  onOpen: () => void;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-card border border-line bg-surface backface-hidden">
      {/* Foto do mentor — placeholder em avatar gerado enquanto não há imagem real */}
      {mentor.image ? (
        <Image
          src={mentor.image}
          alt={`Foto de ${mentor.name}`}
          fill
          sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 42vw, 78vw"
          className="object-cover"
        />
      ) : (
        <MentorAvatar name={mentor.name} className="absolute inset-0" />
      )}

      {/* Gradiente para dar leitura ao texto sobre a foto */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/85 via-black/40 to-transparent"
      />

      {/* Rodapé: coluna nome/profissão + botão "+" ao lado */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-semibold text-white">
            {mentor.name}
          </h2>
          <p className="mt-0.5 truncate text-md text-white/70">{mentor.role}</p>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-label={`Ver informações de ${mentor.name}`}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-linear-to-b from-secondary to-secondary-deep text-white shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <Plus aria-hidden="true" className="size-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Verso — avatar + bio + áreas de atuação                                     */
/* -------------------------------------------------------------------------- */

function CardBack({
  mentor,
  onClose,
}: {
  mentor: Mentor;
  onClose: () => void;
}) {
  const initials = mentor.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div onClick={onClose} className="absolute inset-0 flex flex-col overflow-hidden rounded-card border border-line-strong bg-surface p-6 backface-hidden transform-[rotateY(180deg)]">
      <div className="flex items-center justify-between">
        {/* Avatar do mentor */}
        {mentor.image ? (
          <Image
            src={mentor.image}
            alt=""
            width={56}
            height={56}
            className="size-14 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-semibold text-white"
          >
            <MentorAvatar name={mentor.name} className="absolute inset-0" />
            <span className="relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {initials}
            </span>
          </span>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar informações"
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-foreground">
          {mentor.name}
        </h3>
        <p className="text-md text-secondary-soft">{mentor.role}</p>
      </div>

      <p className="mt-3 flex-1 overflow-y-auto text-md leading-relaxed text-foreground">
        {mentor.bio}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-line bg-surface-2 p-3 px-4 text-transparent text-sm bg-[linear-gradient(to_right,#ffffff_55%,rgba(153,153,153,10))] bg-clip-text"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
