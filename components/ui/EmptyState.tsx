"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Button } from "../form/Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  iconName: keyof typeof Icons;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  iconName,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const IconComponent = Icons[iconName] as React.ComponentType<any>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6 rounded-2xl glass-card border border-border/50",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-surfaceLight border border-border flex items-center justify-center text-primary/80 mb-4 animate-pulse duration-3000">
        {IconComponent && <IconComponent className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-text mb-1.5">{title}</h3>
      <p className="text-sm text-textMuted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
