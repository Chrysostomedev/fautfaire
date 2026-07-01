"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className,
}) => {
  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer select-none", className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <motion.div
          animate={{
            backgroundColor: checked ? "#f97316" : "rgba(11, 14, 20, 0.6)",
            borderColor: checked ? "#f97316" : "rgba(38, 44, 56, 0.8)",
          }}
          transition={{ duration: 0.15 }}
          className={cn(
            "w-6 h-6 rounded-lg border flex items-center justify-center transition-shadow",
            "focus-within:ring-2 focus-within:ring-primary/30"
          )}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="w-4 h-4 text-text font-bold" />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && (
        <span
          className={cn(
            "text-sm font-medium transition-all duration-200",
            checked ? "text-textMuted line-through" : "text-text"
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};
