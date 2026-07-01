"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import { Onboarding } from "@/components/sections/Onboarding";

function OnboardingBarrier({ children }: { children: React.ReactNode }) {
  const { user, loading, completeOnboarding } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0B0E14] flex items-center justify-center text-text select-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-black text-white text-lg animate-bounce">
            Y
          </div>
          <span className="text-[10px] font-bold text-textMuted tracking-widest uppercase">
            Chargement...
          </span>
        </div>
      </div>
    );
  }

  if (!user || !user.onboardingComplete) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return <>{children}</>;
}

import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful: ", registration.scope);
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <OnboardingBarrier>{children}</OnboardingBarrier>
      </ToastProvider>
    </AuthProvider>
  );
}
export default Providers;

