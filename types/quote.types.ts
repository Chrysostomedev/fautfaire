export interface Citation {
  id: string;
  texte: string;
  auteur: string;
  origine: "afrique" | "tech" | "les_deux";
  domaine: ("leadership" | "entrepreneuriat" | "resilience" | "innovation" | "discipline")[];
  langue: "fr" | "en";
}
