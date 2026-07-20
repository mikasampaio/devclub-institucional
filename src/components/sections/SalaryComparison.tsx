import SalaryComparisonCard, {
  type SalaryLevel,
} from "@/components/ui/SalaryComparisonCard";

/** Dados de referência — Desenvolver Full-Stack, valores anuais. */
const DEVELOPER: SalaryLevel[] = [
  { level: "Júnior", brasil: 70_800, internacional: 135_928.66 },
  { level: "Pleno", brasil: 140_400, internacional: 201_375.8 },
  { level: "Sênior", brasil: 196_800, internacional: 307_098.09 },
];

/**
 * Exemplo de uso na página: envolve o card num <section>. O card em si é o
 * único trecho client-side; a section permanece Server Component.
 */
export default function SalaryComparison() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-medium text-white sm:text-4xl">
          O mercado paga bem?
        </h2>
        <SalaryComparisonCard
          title="Desenvolver Full-Stack | Valores Anuais"
          data={DEVELOPER}
        />
      </div>
    </section>
  );
}
