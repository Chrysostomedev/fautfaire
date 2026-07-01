"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Quote, Share2 } from "lucide-react";
import { Citation } from "@/types/quote.types";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: Citation;
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.texte}" — ${quote.auteur}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAfrica = quote.origine === "afrique";
  const isTech = quote.origine === "tech";

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className={cn(
        "rounded-2xl p-5 border relative overflow-hidden flex flex-col justify-between min-h-[160px] transition-shadow duration-300",
        isAfrica && "bg-gradient-to-br from-surface to-[#1a1712] border-[#423118]/60 hover:shadow-lg hover:shadow-[#f97316]/5",
        isTech && "bg-gradient-to-br from-surface to-[#101924] border-[#1b2b3d]/60 hover:shadow-lg hover:shadow-blue-500/5",
        !isAfrica && !isTech && "bg-surface border-border",
        className
      )}
    >
      {/* Dynamic decorative backdrop glows */}
      {isAfrica && (
        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#f97316]/5 blur-xl pointer-events-none" />
      )}
      {isTech && (
        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-blue-500/5 blur-xl pointer-events-none" />
      )}

      {/* Quote Icon */}
      <div className="text-border absolute top-4 left-4 z-0 pointer-events-none opacity-20">
        <Quote className="w-12 h-12" />
      </div>

      {/* Quote text */}
      <div className="relative z-10 mb-6">
        <p className="text-sm font-semibold leading-relaxed text-text italic">
          "{quote.texte}"
        </p>
      </div>

      {/* Author and metadata */}
      <div className="relative z-10 flex items-end justify-between gap-4 mt-auto">
        <div className="min-w-0">
          <h5
            className={cn(
              "text-xs font-black tracking-wide uppercase truncate",
              isAfrica ? "text-primary" : "text-blue-400"
            )}
          >
            {quote.auteur}
          </h5>
          <div className="flex flex-wrap gap-1 mt-1.5">
            <Badge variant={isAfrica ? "warning" : "info"} className="text-[8px] px-1.5 py-0">
              {quote.origine}
            </Badge>
            {quote.domaine.map((dom) => (
              <Badge key={dom} variant="neutral" className="text-[8px] px-1.5 py-0 lowercase">
                {dom}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-surfaceLight/80 border border-border/50 text-textMuted hover:text-text transition-colors cursor-pointer hover:bg-border/60"
            title="Copier la citation"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-success" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => alert("Simulation partage citation")}
            className="p-2 rounded-lg bg-surfaceLight/80 border border-border/50 text-textMuted hover:text-text transition-colors cursor-pointer hover:bg-border/60"
            title="Partager"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default QuoteCard;
