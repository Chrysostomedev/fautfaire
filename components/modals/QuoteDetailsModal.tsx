"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Quote } from "lucide-react";
import { Citation } from "@/types/quote.types";
import { useToast } from "@/components/ui/Toast";

interface QuoteDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Citation | null;
}

export const QuoteDetailsModal: React.FC<QuoteDetailsModalProps> = ({
  isOpen,
  onClose,
  quote,
}) => {
  const { showToast } = useToast();

  if (!quote) return null;

  const handleShare = async () => {
    const shareText = `"${quote.texte}"\n- ${quote.auteur}\n\nRetrouve plus de force sur https://fautfaire.vercel.app/citations 🔥`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Inspiration - Faut faire",
          text: shareText,
          url: "https://fautfaire.vercel.app/citations",
        });
        showToast("Partagé avec succès ! 🔥");
      } catch (err) {
        console.log("Erreur de partage:", err);
      }
    } else {
      // Fallback: Copy to clipboard and open WhatsApp
      navigator.clipboard.writeText(shareText);
      showToast("Lien et citation copiés ! Redirection WhatsApp...");
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const shareViaTelegram = () => {
    const shareText = `"${quote.texte}"\n- ${quote.auteur}\n\nRetrouve plus de force sur https://fautfaire.vercel.app/citations 🔥`;
    const telegramUrl = `https://t.me/share/url?url=https://fautfaire.vercel.app/citations&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-surface rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                Détails de la Citation
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-surfaceLight hover:bg-border text-textMuted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quote content */}
            <div className="relative z-10 px-4 py-8 bg-surfaceLight/50 rounded-2xl border border-border">
              <Quote className="w-12 h-12 text-primary/20 absolute top-2 left-2 -z-10" />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-text text-center italic">
                "{quote.texte}"
              </p>
              
              <div className="mt-8 text-center flex flex-col items-center gap-1">
                <span className="text-sm font-black text-text uppercase tracking-wider">
                  {quote.auteur}
                </span>
                <span className="text-xs font-bold text-textMuted uppercase tracking-widest">
                  {quote.origine} • {quote.domaine.join(", ")}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-white font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                <Share2 className="w-5 h-5" />
                Partager via WhatsApp / Mobile
              </button>
              <button
                onClick={shareViaTelegram}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-surfaceLight border border-border text-text font-bold hover:bg-border transition-colors active:scale-[0.98] text-sm"
              >
                Partager sur Telegram
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
