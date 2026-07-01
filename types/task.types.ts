export interface Task {
  id: string;
  titre: string;
  description?: string;
  dateEcheance?: string;        // ISO Date String "YYYY-MM-DD"
  heureRappel?: string;         // "HH:mm"
  recurrence?: "aucune" | "quotidienne" | "hebdomadaire";
  statut: "a_faire" | "en_cours" | "terminee";
  priorite: "basse" | "moyenne" | "haute";
  createdAt: string;
}
