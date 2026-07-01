import { CategorieDepense, CategorieRevenu } from "@/types/finance.types";

export const CATEGORIES_DEPENSE: { value: CategorieDepense; label: string; icon: string; color: string }[] = [
  { value: "transport", label: "Transport (Gbaka, Woro-woro)", icon: "Car", color: "text-blue-400" },
  { value: "nourriture", label: "Nourriture & Maquis", icon: "Utensils", color: "text-green-400" },
  { value: "forfait_internet", label: "Forfait Internet (Orange, MTN)", icon: "Wifi", color: "text-orange-400" },
  { value: "loisirs", label: "Loisirs & Sorties", icon: "Sparkles", color: "text-purple-400" },
  { value: "logement", label: "Logement / Loyer", icon: "Home", color: "text-red-400" },
  { value: "sante", label: "Santé / Pharmacie", icon: "HeartPulse", color: "text-rose-400" },
  { value: "etudes", label: "Études & Formations", icon: "BookOpen", color: "text-amber-400" },
  { value: "tontine", label: "Tontine / Épargne Groupe", icon: "Users", color: "text-indigo-400" },
  { value: "famille", label: "Famille / Transferts", icon: "Heart", color: "text-pink-400" },
  { value: "autre", label: "Autre dépense", icon: "HelpCircle", color: "text-gray-400" },
];

export const CATEGORIES_REVENU: { value: CategorieRevenu; label: string; icon: string; color: string }[] = [
  { value: "stage_emploi", label: "Stage / Emploi", icon: "Briefcase", color: "text-emerald-400" },
  { value: "freelance", label: "Freelance", icon: "Laptop", color: "text-cyan-400" },
  { value: "bourse", label: "Bourse d'études", icon: "GraduationCap", color: "text-sky-400" },
  { value: "famille", label: "Aide Familiale", icon: "Heart", color: "text-pink-400" },
  { value: "side_hustle", label: "Side Hustle / Commerce", icon: "TrendingUp", color: "text-lime-400" },
  { value: "tontine_recue", label: "Tontine reçue", icon: "ArrowDownCircle", color: "text-teal-400" },
  { value: "autre", label: "Autre revenu", icon: "PlusCircle", color: "text-gray-400" },
];

export const APP_ROUTES = {
  dashboard: "/",
  tasks: "/taches",
  finances: "/finances",
  bilan: "/bilan",
  bilanHistory: "/bilan/historique",
  objectifs: "/objectifs",
  citations: "/citations",
  profil: "/profil",
  login: "/login",
  register: "/register",
};
