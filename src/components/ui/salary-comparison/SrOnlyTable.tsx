import {
  calcDifference,
  formatCurrency,
  type SalaryComparisonCardProps,
} from "./helpers";

/* -------------------------------------------------------------------------- */
/* SrOnlyTable — tabela acessível (fallback semântico)                         */
/* -------------------------------------------------------------------------- */

export default function SrOnlyTable({
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
