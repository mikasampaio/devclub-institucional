import { SERIES } from "./helpers";

/* -------------------------------------------------------------------------- */
/* Legend — indicadores de cor                                                 */
/* -------------------------------------------------------------------------- */

export default function Legend() {
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
