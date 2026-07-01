import { z } from "zod";

export const TaskSchema = z.object({
  titre: z.string().min(3, "Le titre doit faire au moins 3 caractères").max(100),
  description: z.string().optional(),
  dateEcheance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (AAAA-MM-JJ)").optional().or(z.literal("")),
  heureRappel: z.string().regex(/^\d{2}:\d{2}$/, "Format d'heure invalide (HH:MM)").optional().or(z.literal("")),
  recurrence: z.enum(["aucune", "quotidienne", "hebdomadaire"]).default("aucune"),
  priorite: z.enum(["basse", "moyenne", "haute"]).default("moyenne"),
  statut: z.enum(["a_faire", "en_cours", "terminee"]).default("a_faire"),
});

export const TransactionSchema = z.object({
  type: z.enum(["depense", "revenu"]),
  montant: z.number().positive("Le montant doit être supérieur à 0"),
  categorie: z.string().min(1, "Veuillez choisir une catégorie"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (AAAA-MM-JJ)"),
  note: z.string().max(200).optional(),
});

export const GoalSchema = z.object({
  titre: z.string().min(3, "Le titre doit faire au moins 3 caractères").max(50),
  montantCible: z.number().positive("Le montant cible doit être supérieur à 0"),
  montantActuel: z.number().nonnegative("Le montant actuel doit être supérieur ou égal à 0"),
  dateLimite: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (AAAA-MM-JJ)").optional().or(z.literal("")),
  icone: z.string().default("Target"),
});

export const BilanSchema = z.object({
  tachesCochees: z.array(z.string()),
  humeur: z.enum(["excellent", "bien", "moyen", "difficile"]),
  note: z.string().max(300).optional(),
});
