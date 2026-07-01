"use client";

import React, { useState, useEffect } from "react";
import { SideModal } from "./SideModal";
import { Input } from "../form/Input";
import { Button } from "../form/Button";
import { Objectif } from "@/types/finance.types";
import { GoalSchema } from "@/lib/validators";
import { Laptop, Home, BookOpen, Car, Phone, ShieldAlert, Award, PiggyBank, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Objectif, "id">) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [titre, setTitre] = useState("");
  const [montantCible, setMontantCible] = useState("");
  const [montantActuel, setMontantActuel] = useState("0");
  const [dateLimite, setDateLimite] = useState("");
  const [icone, setIcone] = useState("PiggyBank");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Icon options grid
  const iconOptions = [
    { name: "PiggyBank", component: PiggyBank, label: "Épargne" },
    { name: "Laptop", component: Laptop, label: "Tech" },
    { name: "Home", component: Home, label: "Foyer" },
    { name: "BookOpen", component: BookOpen, label: "Études" },
    { name: "Car", component: Car, label: "Transport" },
    { name: "Phone", component: Phone, label: "Mobile" },
    { name: "Heart", component: Heart, label: "Santé" },
    { name: "Award", component: Award, label: "Projet" },
    { name: "ShieldAlert", component: ShieldAlert, label: "Urgence" },
  ];

  // Reset fields
  useEffect(() => {
    if (isOpen) {
      setTitre("");
      setMontantCible("");
      setMontantActuel("0");
      setDateLimite("");
      setIcone("PiggyBank");
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const targetNum = parseFloat(montantCible);
    const currentNum = parseFloat(montantActuel);

    const formData = {
      titre,
      montantCible: targetNum,
      montantActuel: currentNum,
      dateLimite: dateLimite || undefined,
      icone,
    };

    // Validation using Zod
    const result = GoalSchema.safeParse(formData);

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

    onSave(formData);
    onClose();
  };

  return (
    <SideModal isOpen={isOpen} onClose={onClose} title="Nouvel Objectif Épargne">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <Input
          label="Quel est ton projet ?"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Ex: Acheter un nouveau PC"
          error={errors.titre}
          autoFocus
        />

        {/* Montant Cible & Montant Actuel */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Montant cible (FCFA)"
            type="number"
            value={montantCible}
            onChange={(e) => setMontantCible(e.target.value)}
            placeholder="Ex: 300000"
            error={errors.montantCible}
          />
          <Input
            label="Épargne de départ"
            type="number"
            value={montantActuel}
            onChange={(e) => setMontantActuel(e.target.value)}
            placeholder="Ex: 0"
            error={errors.montantActuel}
          />
        </div>

        {/* Target Date */}
        <Input
          label="Date limite (Optionnel)"
          type="date"
          value={dateLimite}
          onChange={(e) => setDateLimite(e.target.value)}
          error={errors.dateLimite}
        />

        {/* Icon picker grid */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-textMuted">
            Choisis une icône illustrative
          </label>
          <div className="grid grid-cols-3 gap-2">
            {iconOptions.map((opt) => {
              const IconComp = opt.component;
              const isSelected = icone === opt.name;

              return (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setIcone(opt.name)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none",
                    isSelected
                      ? "bg-primary/10 border-primary text-primary shadow-md shadow-primary/10"
                      : "bg-surfaceLight border-border text-textMuted hover:text-text hover:border-border/80"
                  )}
                >
                  <IconComp className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Créer
          </Button>
        </div>
      </form>
    </SideModal>
  );
};
export default AddGoalModal;
