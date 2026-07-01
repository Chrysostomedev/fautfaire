"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types/user.types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  completeOnboarding: (name: string) => void;
  resetOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Read local storage on mount
  useEffect(() => {
    try {
      const storedName = localStorage.getItem("yelen_user_name");
      if (storedName) {
        setUser({
          id: "u1",
          nom: storedName,
          email: "user@yelen.ci",
          devise: "FCFA",
          onboardingComplete: true,
          preferences: {
            theme: "sombre",
            activeNotifications: true,
            heureNotificationBilan: "21:00",
          },
        });
      }
    } catch (e) {
      console.error("Local storage error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const completeOnboarding = (name: string) => {
    localStorage.setItem("yelen_user_name", name);
    setUser({
      id: "u1",
      nom: name,
      email: "user@yelen.ci",
      devise: "FCFA",
      onboardingComplete: true,
      preferences: {
        theme: "sombre",
        activeNotifications: true,
        heureNotificationBilan: "21:00",
      },
    });
  };

  const resetOnboarding = () => {
    localStorage.removeItem("yelen_user_name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, completeOnboarding, resetOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
