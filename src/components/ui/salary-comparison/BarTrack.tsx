"use client";

import { motion } from "framer-motion";
import { EASE } from "./helpers";

/* -------------------------------------------------------------------------- */
/* BarTrack — barra pill animada + rótulo de valor                            */
/* -------------------------------------------------------------------------- */

interface BarTrackProps {
  value: number;
  max: number;
  gradient: string;
  label: string;
  reduceMotion: boolean;
  delay: number;
  suffix?: string;
}

export default function BarTrack({
  value,
  max,
  gradient,
  label,
  reduceMotion,
  delay,
  suffix,
}: BarTrackProps) {
  const pct = max > 0 ? (value / max) * 100 : 0;

  // Fragmento: 1ª célula = barra (coluna da pista), 2ª = rótulo (coluna auto).
  return (
    <>
      <motion.span
        aria-hidden="true"
        className="h-2 justify-self-start rounded-full"
        style={{ backgroundImage: gradient, width: `${pct}%` }}
        initial={reduceMotion ? false : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
      {/* No mobile o rótulo pode quebrar (poupa a pista); no desktop fica numa linha só, colado no fim da barra. */}
      <span className="text-sm text-white sm:whitespace-nowrap">
        {label}
        {suffix && <span className="ml-1.5 text-white/40">{suffix}</span>}
      </span>
    </>
  );
}
