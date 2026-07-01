export interface UserProfile {
  id: string;
  nom: string;
  email: string;
  devise: string; // ex: "FCFA"
  avatarUrl?: string;
  onboardingComplete: boolean;
  preferences: {
    theme: "sombre" | "clair";
    activeNotifications: boolean;
    heureNotificationBilan: string; // "HH:mm"
  };
}
