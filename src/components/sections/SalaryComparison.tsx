import SalaryComparisonCard, {
  type SalaryLevel,
} from "@/components/ui/salary-comparison/SalaryComparisonCard";

const DEVELOPER: SalaryLevel[] = [
  { level: "Júnior", brasil: 89_050, internacional: 69_069 },
  { level: "Pleno", brasil: 161_200, internacional: 112_306 },
  { level: "Sênior", brasil: 211_250, internacional: 137_777 },
];

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
