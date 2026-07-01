"use client";

import React, { useState } from "react";
import { TaskSchema } from "@/lib/validators";
import { SideModal } from "./SideModal";
import { Input } from "../form/Input";
import { Select } from "../form/Select";
import { Button } from "../form/Button";
import { Task } from "@/types/task.types";

// Note: In Phase 1, we simulate React Hook Form behaviour or import it.
// Wait! Let's check if react-hook-form is installed. In package.json, we don't have react-hook-form or @hookform/resolvers!
// Let's check if we should install them, OR we can write standard simple state-based forms with manual Zod validation,
// which is extremely clean, self-contained, and requires ZERO extra dependencies to be installed.
// Yes! Let's write simple state-based form handling with Zod validation so we don't need to install extra libraries.
// It is very transparent and works perfectly.

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id" | "createdAt">) => void;
  initialTask?: Task | null;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask,
}) => {
  const [titre, setTitre] = useState(initialTask?.titre || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [dateEcheance, setDateEcheance] = useState(initialTask?.dateEcheance || "");
  const [heureRappel, setHeureRappel] = useState(initialTask?.heureRappel || "");
  const [recurrence, setRecurrence] = useState<"aucune" | "quotidienne" | "hebdomadaire">(initialTask?.recurrence || "aucune");
  const [priorite, setPriorite] = useState<"basse" | "moyenne" | "haute">(initialTask?.priorite || "moyenne");
  const [statut, setStatut] = useState<"a_faire" | "en_cours" | "terminee">(initialTask?.statut || "a_faire");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync state with initialTask when editing
  React.useEffect(() => {
    if (initialTask) {
      setTitre(initialTask.titre);
      setDescription(initialTask.description || "");
      setDateEcheance(initialTask.dateEcheance || "");
      setHeureRappel(initialTask.heureRappel || "");
      setRecurrence(initialTask.recurrence || "aucune");
      setPriorite(initialTask.priorite || "moyenne");
      setStatut(initialTask.statut || "a_faire");
    } else {
      // Clear fields
      setTitre("");
      setDescription("");
      setDateEcheance("");
      setHeureRappel("");
      setRecurrence("aucune");
      setPriorite("moyenne");
      setStatut("a_faire");
    }
    setErrors({});
  }, [initialTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      titre,
      description: description || undefined,
      dateEcheance: dateEcheance || undefined,
      heureRappel: heureRappel || undefined,
      recurrence,
      priorite,
      statut,
    };

    // Validate using Zod schema
    const result = TaskSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Call save callback
    onSave(formData);
    onClose();
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? "Modifier la Tâche" : "Créer une Tâche"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Titre de la tâche"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Ex: Acheter pass internet MTN"
          error={errors.titre}
          autoFocus
        />

        <div className="w-full flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-textMuted">
            Description
          </label>
          <textarea
            className="w-full min-h-[96px] rounded-xl px-4 py-3 text-sm font-medium glass-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajouter des précisions..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date d'échéance"
            type="date"
            value={dateEcheance}
            onChange={(e) => setDateEcheance(e.target.value)}
            error={errors.dateEcheance}
          />
          <Input
            label="Heure de rappel"
            type="time"
            value={heureRappel}
            onChange={(e) => setHeureRappel(e.target.value)}
            error={errors.heureRappel}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priorité"
            value={priorite}
            onChange={(e) => setPriorite(e.target.value as any)}
            options={[
              { value: "basse", label: "Basse" },
              { value: "moyenne", label: "Moyenne" },
              { value: "haute", label: "Haute" },
            ]}
          />
          <Select
            label="Récurrence"
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as any)}
            options={[
              { value: "aucune", label: "Aucune" },
              { value: "quotidienne", label: "Quotidienne" },
              { value: "hebdomadaire", label: "Hebdomadaire" },
            ]}
          />
        </div>

        {initialTask && (
          <Select
            label="Statut"
            value={statut}
            onChange={(e) => setStatut(e.target.value as any)}
            options={[
              { value: "a_faire", label: "À faire" },
              { value: "en_cours", label: "En cours" },
              { value: "terminee", label: "Terminée" },
            ]}
          />
        )}

        <div className="flex gap-3 justify-end mt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </SideModal>
  );
};
export default AddTaskModal;
