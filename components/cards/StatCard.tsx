"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number; // percentage change
    isPositive: boolean;
  };
  iconName: keyof typeof Icons;
  variant?: "primary" | "success" | "danger" | "warning" | "neutral";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  iconName,
  variant = "neutral",
  className,
}) => {
  const IconComponent = Icons[iconName] as React.ComponentType<any>;

  const colors = {
    primary: "text-primary border-primary/20 bg-primary/5",
    success: "text-success border-success/20 bg-success/5",
    danger: "text-danger border-danger/20 bg-danger/5",
    warning: "text-warning border-warning/20 bg-warning/5",
    neutral: "text-textMuted border-border bg-surfaceLight/30",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "rounded-2xl p-5 border glass-card flex flex-col justify-between select-none relative overflow-hidden",
        className
      )}
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full pointer-events-none" />

      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-textMuted">
          {title}
        </span>
        <div
          className={cn(
            "w-10 h-10 rounded-xl border flex items-center justify-center",
            colors[variant]
          )}
        >
          {IconComponent && <IconComponent className="w-5 h-5" />}
        </div>
      </div>

      <div>
        <h4 className="text-2xl font-extrabold text-text tracking-tight mb-1">
          {value}
        </h4>
        <div className="flex items-center gap-1.5 min-h-[16px]">
          {trend && (
            <span
              className={cn(
                "text-[10px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5",
                trend.isPositive ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </span>
          )}
          {description && (
            <span className="text-[11px] font-medium text-textMuted truncate">
              {description}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default StatCard;
