"use client";

import React, { useState } from "react";
import { Checkbox } from "../form/Checkbox";
import { Button } from "../form/Button";
import { Smile, Laugh, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BilanChecklistProps {
  tasks: { id: string; titre: string; completed: boolean }[];
  onSubmit: (data: { checkedTaskIds: string[]; humeur: string; note: string }) => void;
}

export const BilanChecklist: React.FC<BilanChecklistProps> = ({
  tasks: initialTasks,
  onSubmit,
}) => {
  const [tasks, setTasks] = useState(
    initialTasks.map((t) => ({ ...t, checked: t.completed }))
  );
  const [humeur, setHumeur] = useState<"excellent" | "bien" | "moyen" | "difficile">("bien");
  const [note, setNote] = useState("");

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkedTaskIds = tasks.filter((t) => t.checked).map((t) => t.id);
    onSubmit({ checkedTaskIds, humeur, note });
  };

  // Humeur configurations
  const moods = [
    { value: "excellent" as const, icon: Laugh, label: "Excellent", color: "text-green-400 bg-green-500/10 border-green-500/30" },
    { value: "bien" as const, icon: Smile, label: "Bien", color: "text-primary bg-primary/10 border-primary/30" },
    { value: "moyen" as const, icon: Meh, label: "Moyen", color: "text-warning bg-warning/10 border-warning/30" },
    { value: "difficile" as const, icon: Frown, label: "Difficile", color: "text-danger bg-danger/10 border-danger/30" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Step 1: Todo Checklist */}
      <div className="flex flex-col gap-3.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-textMuted">
          1. Quelles tâches as-tu terminées aujourd'hui ?
        </h4>
        
        {tasks.length === 0 ? (
          <p className="text-xs text-textMuted italic bg-surfaceLight/50 p-4 rounded-xl border border-border/60">
            Aucune tâche planifiée pour aujourd'hui. C'est le moment d'en ajouter !
          </p>
        ) : (
          <div className="flex flex-col gap-2 bg-surfaceLight/30 border border-border/60 p-4 rounded-2xl">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-3 rounded-xl border transition-all flex items-center gap-3",
                  task.checked
                    ? "bg-primary/5 border-primary/20 opacity-80"
                    : "bg-surfaceLight border-transparent"
                )}
              >
                <Checkbox
                  checked={task.checked}
                  onChange={() => handleToggleTask(task.id)}
                  label={task.titre}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Humeur selection */}
      <div className="flex flex-col gap-3.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-textMuted">
          2. Comment évalues-tu ton humeur aujourd'hui ?
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((m) => {
            const MoodIcon = m.icon;
            const isSelected = humeur === m.value;

            return (
              <button
                key={m.value}
                type="button"
                onClick={() => setHumeur(m.value)}
                className={cn(
                  "flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none",
                  isSelected
                    ? `${m.color} scale-[1.03] shadow-md`
                    : "bg-surfaceLight border-transparent text-textMuted hover:text-text"
                )}
              >
                <MoodIcon className="w-6 h-6 mb-1.5" />
                <span className="text-[10px] font-bold">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Evening Note */}
      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-textMuted">
          3. Note libre (Ce que tu as appris, tes gratitudes...)
        </h4>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ex: Aujourd'hui j'ai compris comment utiliser les contextes React, c'était top. Demain je me lève tôt..."
          className="w-full min-h-[110px] rounded-2xl px-4 py-3 text-sm font-medium glass-input"
        />
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" className="w-full mt-2">
        Valider mon bilan du soir
      </Button>
    </form>
  );
};
export default BilanChecklist;
