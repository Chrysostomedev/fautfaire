export interface BilanJournalier {
  id: string;
  date: string;                 // ISO YYYY-MM-DD
  tachesCochees: string[];      // ids des tâches validées
  tauxCompletion: number;       // %
  humeur: "excellent" | "bien" | "moyen" | "difficile";
  note?: string;
  streak: number;               // jours consécutifs avec bilan rempli
}
