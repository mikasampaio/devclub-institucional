import Image from "next/image";
import { Play } from "lucide-react";
import MentorAvatar from "@/components/team/MentorAvatar";
import type { BonusClass } from "./bonusClasses";

/**
 * Card de aula bônus: retrato do especialista + nome/tópico + pílula de
 * duração com play. Sem verso/flip — é uma aula, não uma bio.
 */
export default function BonusClassCard({
  bonusClass,
}: {
  bonusClass: BonusClass;
}) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-card border border-line bg-surface">
      {bonusClass.image ? (
        <Image
          src={bonusClass.image}
          alt={`Foto de ${bonusClass.specialist}`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 78vw"
          className="object-cover"
        />
      ) : (
        <MentorAvatar name={bonusClass.specialist} className="absolute inset-0" />
      )}

      {/* Gradiente para dar leitura ao texto sobre o retrato */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/85 via-black/40 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="truncate text-2xl font-semibold text-white">
          {bonusClass.specialist}
        </h3>
        <p className="mt-0.5 truncate text-md text-white/70">
          {bonusClass.topic}
        </p>

        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-1.5 pl-3 pr-2 text-sm text-white backdrop-blur-sm">
          {bonusClass.duration}
          <span className="flex size-6 items-center justify-center rounded-full bg-linear-to-b from-secondary to-secondary-deep text-white">
            <Play aria-hidden="true" className="size-3" fill="currentColor" />
          </span>
        </span>
      </div>
    </div>
  );
}
