"use client";

import React from "react";
import { Calendar, AlertCircle } from "lucide-react";
import { Task } from "@/types/task.types";
import { Checkbox } from "../form/Checkbox";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isCompleted = task.statut === "terminee";

  // Priority color map
  const priorityVariants = {
    basse: "neutral" as const,
    moyenne: "warning" as const,
    haute: "danger" as const,
  };

  // Format date helper
  const getDueDateLabel = () => {
    if (!task.dateEcheance) return null;
    const today = dayjs().format("YYYY-MM-DD");
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    if (task.dateEcheance === today) {
      return { text: "Aujourd'hui", isOverdue: false, isToday: true };
    }
    if (task.dateEcheance === tomorrow) {
      return { text: "Demain", isOverdue: false, isToday: false };
    }

    const isBeforeToday = dayjs(task.dateEcheance).isBefore(today, "day");
    return {
      text: dayjs(task.dateEcheance).format("DD MMM YYYY"),
      isOverdue: isBeforeToday && !isCompleted,
      isToday: false,
    };
  };

  const dateLabel = getDueDateLabel();

  return (
    <div
      className={cn(
        "rounded-2xl p-4 border transition-all duration-300 flex items-start gap-4 select-none relative group",
        isCompleted
          ? "bg-surface/30 border-border/40 opacity-70"
          : "glass-card hover:border-border"
      )}
    >
      {/* Checkbox */}
      <div className="pt-0.5 flex-shrink-0">
        <Checkbox
          checked={isCompleted}
          onChange={() => onToggleStatus(task.id)}
        />
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className={cn(
              "text-sm font-bold truncate leading-snug cursor-pointer",
              isCompleted && "text-textMuted line-through"
            )}
            onClick={() => onEdit?.(task)}
          >
            {task.titre}
          </span>
          <Badge variant={priorityVariants[task.priorite]} className="text-[9px]">
            {task.priorite}
          </Badge>
          {task.recurrence && task.recurrence !== "aucune" && (
            <Badge variant="primary" className="text-[9px] lowercase">
              {task.recurrence}
            </Badge>
          )}
        </div>

        {task.description && (
          <p
            className={cn(
              "text-xs text-textMuted line-clamp-2 mb-2 leading-relaxed",
              isCompleted && "line-through opacity-50"
            )}
          >
            {task.description}
          </p>
        )}

        {/* Due Date & Time indicator */}
        {dateLabel && (
          <div className="flex items-center gap-3 text-[11px] font-semibold text-textMuted">
            <span
              className={cn(
                "flex items-center gap-1.5",
                dateLabel.isOverdue && "text-danger animate-pulse",
                dateLabel.isToday && "text-primary"
              )}
            >
              {dateLabel.isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Calendar className="w-3.5 h-3.5" />
              )}
              {dateLabel.text}
            </span>
            {task.heureRappel && (
              <span className="bg-surfaceLight px-1.5 py-0.5 rounded border border-border">
                {task.heureRappel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action buttons (Visible on hover on desktop, or simple menu) */}
      <div className="flex items-center gap-1">
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-surfaceLight hover:bg-border text-textMuted hover:text-text transition-colors cursor-pointer"
            title="Modifier"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg bg-surfaceLight hover:bg-danger/10 text-textMuted hover:text-danger transition-colors cursor-pointer"
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
export default TaskCard;
