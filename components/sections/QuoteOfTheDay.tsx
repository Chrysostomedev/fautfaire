"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote, RefreshCw } from "lucide-react";
import { Citation } from "@/types/quote.types";
import citationsData from "@/data/json/citations.json";
import { cn } from "@/lib/utils";
import { QuoteDetailsModal } from "@/components/modals/QuoteDetailsModal";

export const QuoteOfTheDay: React.FC = () => {
  const [quote, setQuote] = useState<Citation | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rollNewQuote = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLoading(true);
    setTimeout(() => {
      const quotes = citationsData as Citation[];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      setLoading(false);
    }, 450);
  };

  // Initial load
  useEffect(() => {
    rollNewQuote();
  }, []);

  if (!quote) return null;

  const isAfrica = quote.origine === "afrique";

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between gap-5 cursor-pointer hover:shadow-lg transition-shadow duration-300",
          isAfrica
            ? "bg-gradient-to-br from-[#FFF5E6] to-[#FFE8D6] border-primary/30 shadow-primary/5"
            : "bg-gradient-to-br from-[#F5F8FF] to-[#E6F0FF] border-blue-300/30 shadow-blue-500/5"
        )}
      >
        {/* Glow Backdrops */}
        <div
          className={cn(
            "absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20",
            isAfrica ? "bg-primary" : "bg-blue-400"
          )}
        />

        {/* Header Label */}
        <div className="flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Lumière du jour (Faut faire)</span>
          </div>
          <button
            onClick={rollNewQuote}
            disabled={loading}
            className="p-1.5 rounded-lg bg-surface hover:bg-border text-textMuted hover:text-text transition-all cursor-pointer disabled:opacity-40"
            title="Tirer une autre citation"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          </button>
        </div>

        {/* Quote Body */}
        <div className="relative z-10 my-1">
          <Quote className="w-10 h-10 text-border absolute -top-5 -left-3 -z-10 opacity-30" />
          <motion.p
            key={quote.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base font-medium leading-relaxed italic text-text pl-4 border-l-2 border-primary/45"
          >
            "{quote.texte}"
          </motion.p>
        </div>

        {/* Author Details */}
        <div className="flex items-center justify-between gap-4 mt-2 z-10 relative">
          <div>
            <span className="text-xs font-black uppercase text-primary tracking-wider">
              {quote.auteur}
            </span>
            <p className="text-[10px] text-textMuted uppercase font-bold mt-0.5">
              Origine: {quote.origine} • {quote.domaine.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <QuoteDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        quote={quote} 
      />
    </>
  );
};
export default QuoteOfTheDay;
