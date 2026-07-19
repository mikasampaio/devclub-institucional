"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/* Palavras em destaque (branco forte); as demais ficam em cinza apagado */
const HIGHLIGHTS = new Set([
  "SYNC",
  "dynamic",
  "team",
  "industry",
  "experts",
  "exceptional",
  "results.",
]);

const TEXT =
  "Built on creativity, collaboration, and top excellence, SYNC is a dynamic team of industry experts committed to achieving exceptional results...";

/** About Us: texto grande com reveal palavra a palavra + CTA. */
export default function About() {
  const words = TEXT.split(" ");

  return (
    <section id="about" className="mx-auto max-w-4xl px-5 py-24 sm:py-32">
      <Reveal className="flex justify-center">
        <Badge>About Us</Badge>
      </Reveal>

      <motion.p
        className="mt-10 text-center text-2xl font-semibold leading-snug sm:text-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.035 }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0.15 },
              visible: { opacity: 1, transition: { duration: 0.35 } },
            }}
            className={HIGHLIGHTS.has(word) ? "text-foreground" : "text-faded"}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.p>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <Button>Book an Appointment</Button>
      </Reveal>
    </section>
  );
}
