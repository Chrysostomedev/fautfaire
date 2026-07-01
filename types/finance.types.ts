export type CategorieDepense =
  | "transport" | "nourriture" | "forfait_internet" | "loisirs"
  | "logement" | "sante" | "etudes" | "tontine" | "famille" | "autre";

export type CategorieRevenu =
  | "stage_emploi" | "freelance" | "bourse" | "famille" | "side_hustle" | "tontine_recue" | "autre";

export interface Transaction {
  id: string;
  type: "depense" | "revenu";
  montant: number;              // FCFA
  categorie: CategorieDepense | CategorieRevenu;
  date: string;                 // ISO YYYY-MM-DD
  note?: string;
}

export interface KPIFinancier {
  soldeNet: number;
  totalDepensesMois: number;
  totalRevenusMois: number;
  tauxEpargne: number;          // %
  depenseMoyenneJour: number;
  categorieTopDepense: string;
}

export interface Objectif {
  id: string;
  titre: string;                // ex: "Acheter un laptop"
  montantCible: number;
  montantActuel: number;
  dateLimite?: string;
  icone: string;                // nom icône lucide
}
