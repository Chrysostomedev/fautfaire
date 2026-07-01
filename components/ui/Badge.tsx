import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className,
}) => {
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/25",
    success: "bg-success/10 text-success border border-success/25",
    danger: "bg-danger/10 text-danger border border-danger/25",
    warning: "bg-warning/10 text-warning border border-warning/25",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
    neutral: "bg-surfaceLight text-textMuted border border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
