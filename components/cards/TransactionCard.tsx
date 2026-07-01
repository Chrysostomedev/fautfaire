"use client";

import React from "react";
import * as Icons from "lucide-react";
import { Transaction } from "@/types/finance.types";
import { CATEGORIES_DEPENSE, CATEGORIES_REVENU } from "@/lib/constants";
import { formatFCFA } from "@/lib/utils";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface TransactionCardProps {
  transaction: Transaction;
  onDelete?: (id: string) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onDelete,
}) => {
  const isExpense = transaction.type === "depense";

  // Find category metadata
  const categoryMeta = isExpense
    ? CATEGORIES_DEPENSE.find((c) => c.value === transaction.categorie)
    : CATEGORIES_REVENU.find((c) => c.value === transaction.categorie);

  const iconName = categoryMeta?.icon || "HelpCircle";
  const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<any>;

  return (
    <div className="rounded-2xl p-4 border glass-card hover:border-border transition-all flex items-center justify-between gap-4">
      {/* Category Icon */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center border",
            isExpense
              ? "bg-danger/5 border-danger/10 text-danger"
              : "bg-success/5 border-success/10 text-success"
          )}
        >
          {IconComponent && <IconComponent className="w-5 h-5" />}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text truncate">
              {categoryMeta?.label || transaction.categorie}
            </span>
          </div>
          <span className="text-[10px] font-bold text-textMuted uppercase">
            {dayjs(transaction.date).format("DD MMM YYYY")}
          </span>
          {transaction.note && (
            <p className="text-xs text-textMuted italic truncate mt-0.5 max-w-[200px]">
              "{transaction.note}"
            </p>
          )}
        </div>
      </div>

      {/* Amount and delete */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          className={cn(
            "text-sm font-extrabold tracking-tight",
            isExpense ? "text-danger" : "text-success"
          )}
        >
          {isExpense ? "-" : "+"}
          {formatFCFA(transaction.montant)}
        </span>
        
        {onDelete && (
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2 rounded-lg bg-surfaceLight hover:bg-danger/10 text-textMuted hover:text-danger transition-colors cursor-pointer"
            title="Supprimer la transaction"
          >
            <Icons.Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
export default TransactionCard;
