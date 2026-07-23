"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import Legend from "./salary-comparison/Legend";
import SalaryRow from "./salary-comparison/SalaryRow";
import SrOnlyTable from "./salary-comparison/SrOnlyTable";
import {
  formatCurrency,
  maxSalary,
  type SalaryComparisonCardProps,
} from "./salary-comparison/helpers";

// Reexporta helpers e tipos para manter o caminho de import estável
// (consumido por SalaryComparison.tsx e pelos testes).
export {
  formatCurrency,
  calcDifference,
  maxSalary,
} from "./salary-comparison/helpers";
export type {
  SalaryLevel,
  SalaryComparisonCardProps,
} from "./salary-comparison/helpers";

/* -------------------------------------------------------------------------- */
/* Componente principal                                                        */
/* -------------------------------------------------------------------------- */

export default function SalaryComparisonCard({
  title,
  data,
  currency = "BRL",
}: SalaryComparisonCardProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const max = useMemo(() => maxSalary(data), [data]);

  // Resumo textual do gráfico para leitores de tela (role="img").
  const ariaLabel = useMemo(() => {
    const rows = data
      .map(
        ({ level, brasil, internacional }) =>
          `${level}: Brasil ${formatCurrency(brasil, currency)}, ` +
          `Internacional ${formatCurrency(internacional, currency)}`,
      )
      .join("; ");
    return `${title}. ${rows}.`;
  }, [title, data, currency]);

  return (
    <div className="rounded-3xl border border-white/5 bg-[#0e0e0e] p-6 sm:p-8 lg:p-10">
      <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>

      <div
        role="img"
        aria-label={ariaLabel}
        className="mt-8 flex flex-col gap-8 sm:gap-10"
      >
        {data.map((row, i) => (
          <SalaryRow
            key={row.level}
            row={row}
            max={max}
            currency={currency}
            reduceMotion={reduceMotion}
            // stagger sutil por linha, sem depender de Math.random
            delay={i * 0.12}
          />
        ))}
      </div>

      <Legend />

      {/* Fallback semântico: mesmos dados em tabela, oculta visualmente */}
      <SrOnlyTable title={title} data={data} currency={currency} />
    </div>
  );
}
