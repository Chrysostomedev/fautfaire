"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckSquare, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "task",
      title: "Chef, n'oublie pas !",
      message: "Ton sport matinal t'attend. Faut pas dja, garde la forme !",
      time: "Il y a 10 min",
      icon: CheckSquare,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      id: 2,
      type: "quote",
      title: "Nouvelle lumière du jour",
      message: "Une nouvelle citation est dispo pour te motiver à goumin tes objectifs.",
      time: "Il y a 2h",
      icon: Sparkles,
      color: "text-warning bg-warning/10 border-warning/20",
    },
    {
      id: 3,
      type: "system",
      title: "C'est comment ?",
      message: "Bienvenue sur Faut faire. Prêt à dompter ta journée ?",
      time: "Il y a 1 jour",
      icon: MessageCircle,
      color: "text-success bg-success/10 border-success/20",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-surface border-l border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border/60 bg-surfaceLight/30">
              <h2 className="text-lg font-black text-text">Tchoko (Notifs)</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-surface hover:bg-border text-textMuted transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {notifications.map((notif) => {
                const Icon = notif.icon;
                return (
                  <div
                    key={notif.id}
                    className="p-4 rounded-2xl bg-surfaceLight/50 border border-border flex items-start gap-4"
                  >
                    <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0", notif.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-text">{notif.title}</h4>
                      <p className="text-xs text-textMuted leading-relaxed mt-1">
                        {notif.message}
                      </p>
                      <span className="text-[10px] font-bold text-textMuted/60 uppercase tracking-widest mt-2 block">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
