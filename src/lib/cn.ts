/**
 * Combinador de classes utilitárias — versão mínima e sem dependências.
 *
 * O projeto ainda não trazia `clsx`/`tailwind-merge`, então esta função cobre o
 * caso de uso comum (strings, condicionais e listas) sem adicionar peso ao
 * bundle. Aceita strings, números, arrays aninhados e objetos `{ classe: cond }`,
 * ignorando qualquer valor falsy. Não deduplica classes Tailwind conflitantes —
 * se isso passar a ser necessário, troca-se a implementação por `tailwind-merge`
 * mantendo a mesma assinatura.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      for (const [key, active] of Object.entries(input)) {
        if (active) out.push(key);
      }
    }
  }

  return out.join(" ");
}
