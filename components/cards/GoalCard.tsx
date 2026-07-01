"use client";

import React from "react";
import * as Icons from "lucide-react";
import { Objectif } from "@/types/finance.types";
import { ProgressBar } from "../ui/ProgressBar";
import { formatFCFA, calculatePercentage } from "@/lib/utils";
import dayjs from "dayjs";

interface GoalCardProps {
  goal: Objectif;
  onAddFunds?: (id: string, amount: number) => void;
  onDelete?: (id: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onAddFunds,
  onDelete,
}) => {
  const percentage = calculatePercentage(goal.montantActuel, goal.montantCible);
  const isCompleted = percentage >= 100;

  // Icon configuration
  const iconName = goal.icone || "Target";
  const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.Target) as React.ComponentType<any>;

  return (
    <div className="rounded-2xl p-5 border glass-card hover:border-border transition-all flex flex-col justify-between gap-4">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-text truncate">{goal.titre}</h4>
            {goal.dateLimite && (
              <span className="text-[10px] font-semibold text-textMuted uppercase">
                Échéance : {dayjs(goal.dateLimite).format("DD MMM YYYY")}
              </span>
            )}
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(goal.id)}
            className="p-1.5 rounded-lg bg-surfaceLight hover:bg-danger/10 text-textMuted hover:text-danger transition-colors cursor-pointer"
            title="Supprimer l'objectif"
          >
            <Icons.Trash className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress & Values */}
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <span className="text-xs text-textMuted">
            {formatFCFA(goal.montantActuel)} /{" "}
            <span className="font-bold text-text">
              {formatFCFA(goal.montantCible)}
            </span>
          </span>
          <span className="text-xs font-black text-primary">{percentage}%</span>
        </div>
        <ProgressBar value={percentage} size="sm" />
      </div>

      {/* Quick funding simulation button */}
      {!isCompleted && onAddFunds && (
        <button
          onClick={() => {
            const amount = prompt("Entrez le montant à ajouter à cet objectif (FCFA):");
            if (amount) {
              const num = parseFloat(amount);
              if (!isNaN(num) && num > 0) {
                onAddFunds(goal.id, num);
              }
            }
          }}
          className="w-full h-10 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Icons.Plus className="w-4 h-4" />
          Ajouter de l'épargne
        </button>
      )}

      {isCompleted && (
        <div className="w-full h-10 rounded-xl bg-success/15 border border-success/35 text-success text-xs font-bold flex items-center justify-center gap-1.5 select-none">
          <Icons.CheckCircle className="w-4 h-4" />
          Objectif atteint ! Félicitations !
        </div>
      )}
    </div>
  );
};
export default GoalCard;
