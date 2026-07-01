"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SideModal: React.FC<SideModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-stretch lg:justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Sheet / Drawer Container */}
          <motion.div
            // Custom responsive animation: slide up on mobile, slide left on desktop
            initial={{
              y: typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : "100%",
              x: typeof window !== "undefined" && window.innerWidth >= 1024 ? "100%" : 0,
            }}
            animate={{ y: 0, x: 0 }}
            exit={{
              y: typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : "100%",
              x: typeof window !== "undefined" && window.innerWidth >= 1024 ? "100%" : 0,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="w-full max-h-[92vh] lg:max-h-screen lg:w-[480px] bg-surface rounded-t-[24px] lg:rounded-t-none lg:rounded-l-[24px] border-t border-border lg:border-t-0 lg:border-l border-border relative z-10 flex flex-col shadow-2xl overflow-hidden pb-safe"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <h3 className="text-base font-bold text-text">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-surfaceLight hover:bg-border text-textMuted hover:text-text transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default SideModal;
