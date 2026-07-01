"use client";

import React, { useState, useEffect } from "react";
import { SideModal } from "./SideModal";
import { Input } from "../form/Input";
import { Select } from "../form/Select";
import { Button } from "../form/Button";
import { Transaction } from "@/types/finance.types";
import { CATEGORIES_DEPENSE, CATEGORIES_REVENU } from "@/lib/constants";
import { TransactionSchema } from "@/lib/validators";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "id">) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<"depense" | "revenu">("depense");
  const [montant, setMontant] = useState("");
  const [categorie, setCategorie] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset category lists based on transaction type
  useEffect(() => {
    if (type === "depense") {
      setCategorie(CATEGORIES_DEPENSE[0].value);
    } else {
      setCategorie(CATEGORIES_REVENU[0].value);
    }
  }, [type, isOpen]);

  // Reset all fields when opening
  useEffect(() => {
    if (isOpen) {
      setType("depense");
      setMontant("");
      setDate(dayjs().format("YYYY-MM-DD"));
      setNote("");
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const amountNum = parseFloat(montant);

    const formData = {
      type,
      montant: amountNum,
      categorie: categorie as any,
      date,
      note: note || undefined,
    };

    // Validation using Zod
    const result = TransactionSchema.safeParse(formData);

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

  const currentCategories = type === "depense" ? CATEGORIES_DEPENSE : CATEGORIES_REVENU;

  return (
    <SideModal isOpen={isOpen} onClose={onClose} title="Enregistrer un flux">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Atypical Sliding segmented control for Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-textMuted">
            Type de transaction
          </label>
          <div className="grid grid-cols-2 p-1 rounded-xl bg-surfaceLight border border-border/80 relative">
            <button
              type="button"
              onClick={() => setType("depense")}
              className={cn(
                "h-10 text-xs font-bold rounded-lg transition-all duration-200 z-10 cursor-pointer",
                type === "depense"
                  ? "bg-danger text-text shadow-md shadow-danger/20"
                  : "text-textMuted hover:text-text"
              )}
            >
              Dépense
            </button>
            <button
              type="button"
              onClick={() => setType("revenu")}
              className={cn(
                "h-10 text-xs font-bold rounded-lg transition-all duration-200 z-10 cursor-pointer",
                type === "revenu"
                  ? "bg-success text-text shadow-md shadow-success/20"
                  : "text-textMuted hover:text-text"
              )}
            >
              Revenu
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <Input
          label="Montant (FCFA)"
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          placeholder="Ex: 5000"
          error={errors.montant}
          className="text-lg font-bold"
        />

        {/* Category Select */}
        <Select
          label="Catégorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          options={currentCategories.map((c) => ({
            value: c.value,
            label: c.label,
          }))}
        />

        {/* Date Input */}
        <Input
          label="Date de l'opération"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
        />

        {/* Description Note */}
        <Input
          label="Note / Précision"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ex: Achat de Garba chez le Haoussa"
          error={errors.note}
        />

        <div className="flex gap-3 justify-end mt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button variant={type === "depense" ? "danger" : "primary"} type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </SideModal>
  );
};
export default AddTransactionModal;
