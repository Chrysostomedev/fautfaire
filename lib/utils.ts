/**
 * Fusionne des classes CSS de manière propre.
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}

/**
 * Formate un montant numérique en FCFA (XOF).
 */
export function formatFCFA(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return `${formatted} FCFA`;
}

/**
 * Calcule le pourcentage de complétion d'un objectif ou d'une liste.
 */
export function calculatePercentage(current: number, target: number): number {
  if (target <= 0) return 0;
  const pct = (current / target) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}
