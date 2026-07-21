"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Tipos públicos                                                              */
/* -------------------------------------------------------------------------- */

export interface SalaryLevel {
  level: string;
  brasil: number;
  internacional: number;
}

export interface SalaryComparisonCardProps {
  title: string;
  data: SalaryLevel[];
  /** Código ISO 4217 usado no Intl.NumberFormat. Default: 'BRL'. */
  currency?: string;
}

/* -------------------------------------------------------------------------- */
/* Helpers puros — exportados para serem testados isoladamente                 */
/* -------------------------------------------------------------------------- */

/** Formata um número como moeda em pt-BR (ex.: 70800 → "R$ 70.800,00"). */
export function formatCurrency(value: number, currency = "BRL"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}

/** Diferença absoluta entre o salário internacional e o brasileiro. */
export function calcDifference(internacional: number, brasil: number): number {
  return internacional - brasil;
}

/**
 * Maior valor do dataset (considerando Brasil e Internacional). É a base de
 * normalização: a barra mais longa vira 100% e as demais são proporcionais.
 */
export function maxSalary(data: SalaryLevel[]): number {
  return data.reduce(
    (max, { brasil, internacional }) => Math.max(max, brasil, internacional),
    0,
  );
}

/* -------------------------------------------------------------------------- */
/* Paleta — verde (Brasil) x coral (Internacional)                            */
/* -------------------------------------------------------------------------- */

const SERIES = {
  brasil: {
    label: "Brasil",
    dot: "var(--color-secondary)",
    gradient:
      "linear-gradient(90deg, var(--color-secondary-deep) 0%, var(--color-secondary) 100%)",
  },
  internacional: {
    label: "Internacional",
    dot: "#ff6b5b",
    gradient: "linear-gradient(90deg, #ff6b5b 0%, #f87171 100%)",
  },
} as const;

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* -------------------------------------------------------------------------- */
/* Componente principal                                                        */
/* -------------------------------------------------------------------------- */

export default function SalaryComparisonCard({
  title,
  data,
  currency = "BRL",
}: SalaryComparisonCardProps) {
  const reduceMotion = useReducedMotion() ?? false;

  // Normalização memoizada: recomputa só quando o dataset muda.
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

      {/* Gráfico visual — apresentado como imagem única para a AT */}
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

function SalaryRow({
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

function BarTrack({
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

/* -------------------------------------------------------------------------- */
/* Legend — indicadores de cor                                                 */
/* -------------------------------------------------------------------------- */

function Legend() {
  return (
    <ul className="mt-10 flex items-center gap-6" aria-hidden="true">
      {(Object.keys(SERIES) as (keyof typeof SERIES)[]).map((key) => (
        <li key={key} className="flex items-center gap-2">
          <span
            className="h-2 w-6 rounded-full"
            style={{ backgroundColor: SERIES[key].dot }}
          />
          <span className="text-sm text-white/70">{SERIES[key].label}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* SrOnlyTable — tabela acessível (fallback semântico)                         */
/* -------------------------------------------------------------------------- */

function SrOnlyTable({
  title,
  data,
  currency,
}: Pick<SalaryComparisonCardProps, "title" | "data" | "currency"> & {
  currency: string;
}) {
  return (
    <table className="sr-only">
      <caption>{title}</caption>
      <thead>
        <tr>
          <th scope="col">Nível</th>
          <th scope="col">Brasil</th>
          <th scope="col">Internacional</th>
          <th scope="col">Diferença</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.level}>
            <th scope="row">{row.level}</th>
            <td>{formatCurrency(row.brasil, currency)}</td>
            <td>{formatCurrency(row.internacional, currency)}</td>
            <td>
              {formatCurrency(
                calcDifference(row.internacional, row.brasil),
                currency,
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
