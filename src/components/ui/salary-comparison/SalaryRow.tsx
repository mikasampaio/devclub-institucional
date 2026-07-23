import BarTrack from "./BarTrack";
import {
  calcDifference,
  formatCurrency,
  SERIES,
  type SalaryLevel,
} from "./helpers";

/* -------------------------------------------------------------------------- */
/* SalaryRow — um nível (Júnior/Pleno/Sênior) com as duas barras              */
/* -------------------------------------------------------------------------- */

interface SalaryRowProps {
  row: SalaryLevel;
  max: number;
  currency: string;
  reduceMotion: boolean;
  delay: number;
}

export default function SalaryRow({
  row,
  max,
  currency,
  reduceMotion,
  delay,
}: SalaryRowProps) {
  const diff = calcDifference(row.internacional, row.brasil);

  return (
    <div className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:items-center sm:gap-4">
      <span className="text-base font-medium text-white sm:text-lg">
        {row.level}
      </span>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2.5">
        <BarTrack
          value={row.brasil}
          max={max}
          gradient={SERIES.brasil.gradient}
          reduceMotion={reduceMotion}
          delay={delay}
          label={formatCurrency(row.brasil, currency)}
        />
        <BarTrack
          value={row.internacional}
          max={max}
          gradient={SERIES.internacional.gradient}
          reduceMotion={reduceMotion}
          delay={delay + 0.08}
          label={formatCurrency(row.internacional, currency)}
          // diferença exibida em cinza ao lado da barra coral
          suffix={`(${formatCurrency(diff, currency)})`}
        />
      </div>
    </div>
  );
}
