"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";
import Image from "next/image";

export const InstallPWAPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Check if user has already dismissed it today
      const lastPromptDismissed = localStorage.getItem("pwa-prompt-dismissed");
      const today = new Date().toDateString();
      
      if (lastPromptDismissed !== today) {
        // Show the prompt after a short delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Also check if we are already in standalone PWA mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Suppress prompt for the rest of today
    localStorage.setItem("pwa-prompt-dismissed", new Date().toDateString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:bottom-4 z-[100] md:w-96 bg-surface border border-primary/20 rounded-3xl p-5 shadow-2xl flex flex-col gap-4"
        >
          {/* Top Row */}
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-primary/10 border border-primary/25 flex-shrink-0">
              <Image src="/img/logo.png" alt="Faut faire" fill className="object-cover" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-black text-text">Installe l'appli sur ton phone !</h4>
              <p className="text-xs text-textMuted leading-relaxed mt-1">
                Faut pas dja sur le réseau ! Ajoute <strong>Faut faire</strong> sur ton écran pour l'ouvrir comme une vraie appli.
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg text-textMuted hover:bg-border transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 py-2.5 rounded-xl border border-border text-xs font-bold text-text hover:bg-surfaceLight/50 transition-colors"
            >
              Plus tard
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              Ajouter à l'écran
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
