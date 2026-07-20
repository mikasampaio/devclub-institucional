import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SalaryComparisonCard, {
  formatCurrency,
  calcDifference,
  maxSalary,
  type SalaryLevel,
} from "./SalaryComparisonCard";

const DATA: SalaryLevel[] = [
  { level: "Júnior", brasil: 70_800, internacional: 135_928.66 },
  { level: "Pleno", brasil: 140_400, internacional: 201_375.8 },
  { level: "Sênior", brasil: 196_800, internacional: 307_098.09 },
];

// NBSP ( ) é o separador que o Intl usa entre "R$" e o número em pt-BR.
const nbsp = " ";

describe("calcDifference", () => {
  it("subtrai o salário brasileiro do internacional", () => {
    expect(calcDifference(135_928.66, 70_800)).toBeCloseTo(65_128.66, 2);
  });

  it("retorna negativo quando o Brasil paga mais", () => {
    expect(calcDifference(100, 250)).toBe(-150);
  });
});

describe("formatCurrency", () => {
  it("formata em BRL por padrão", () => {
    expect(formatCurrency(70_800)).toBe(`R$${nbsp}70.800,00`);
  });

  it("usa duas casas decimais", () => {
    expect(formatCurrency(135_928.66)).toBe(`R$${nbsp}135.928,66`);
  });

  it("respeita a moeda informada", () => {
    expect(formatCurrency(1000, "USD")).toBe(`US$${nbsp}1.000,00`);
  });
});

describe("maxSalary", () => {
  it("encontra o maior valor entre Brasil e Internacional", () => {
    expect(maxSalary(DATA)).toBe(307_098.09);
  });

  it("retorna 0 para dataset vazio", () => {
    expect(maxSalary([])).toBe(0);
  });
});

describe("<SalaryComparisonCard />", () => {
  it("renderiza título, valores e o fallback em tabela (sr-only)", () => {
    render(
      <SalaryComparisonCard title="Product Designer | Valores Anuais" data={DATA} />,
    );

    expect(
      screen.getByRole("heading", { name: "Product Designer | Valores Anuais" }),
    ).toBeDefined();

    // A diferença aparece entre parênteses ao lado da barra internacional.
    // getByText normaliza o NBSP do Intl para espaço comum, então buscamos
    // com espaço regular (o teste de unidade acima cobre o NBSP exato).
    expect(screen.getByText("(R$ 65.128,66)")).toBeDefined();

    // Acessibilidade: gráfico exposto como imagem única + tabela sr-only.
    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByRole("table")).toBeDefined();
  });
});
