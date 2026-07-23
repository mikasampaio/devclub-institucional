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

export const SERIES = {
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

export const EASE = [0.21, 0.47, 0.32, 0.98] as const;
