"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0 to 100
  type?: "horizontal" | "circular";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  type = "horizontal",
  size = "md",
  showLabel = false,
  className,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  if (type === "circular") {
    const sizeMap = {
      sm: { diameter: 48, strokeWidth: 4, fontSize: "text-[10px]" },
      md: { diameter: 72, strokeWidth: 6, fontSize: "text-xs" },
      lg: { diameter: 96, strokeWidth: 8, fontSize: "text-sm" },
    };

    const config = sizeMap[size];
    const radius = (config.diameter - config.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
      <div className={cn("relative flex items-center justify-center", className)}>
        <svg width={config.diameter} height={config.diameter} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            className="stroke-border fill-none"
            strokeWidth={config.strokeWidth}
          />
          {/* Active Circle with Animation */}
          <motion.circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            className="stroke-primary fill-none stroke-linecap-round"
            strokeWidth={config.strokeWidth}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeDasharray={circumference}
          />
        </svg>
        {showLabel && (
          <span className={cn("absolute font-bold text-text", config.fontSize)}>
            {clampedValue}%
          </span>
        )}
      </div>
    );
  }

  // Horizontal version
  const heightMap = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      <div className={cn("w-full rounded-full bg-border overflow-hidden relative", heightMap[size])}>
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-textMuted">
          <span>Progression</span>
          <span className="text-primary">{clampedValue}%</span>
        </div>
      )}
    </div>
  );
};
