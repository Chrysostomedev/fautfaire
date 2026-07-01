"use client";

import React, { useState } from "react";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/form/Button";
import { GoalCard } from "@/components/cards/GoalCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AddGoalModal } from "@/components/modals/AddGoalModal";
import { useToast } from "@/components/ui/Toast";
import { Objectif } from "@/types/finance.types";
import { formatFCFA } from "@/lib/utils";

export default function ObjectifsPage() {
  const { showToast } = useToast();
  
  // Mock savings goals list
  const [goals, setGoals] = useState<Objectif[]>([
    {
      id: "g1",
      titre: "Acheter un Laptop pour coder",
      montantCible: 300000,
      montantActuel: 185000,
      dateLimite: "2026-10-31",
      icone: "Laptop",
    },
    {
      id: "g2",
      titre: "Payer caution loyer studio",
      montantCible: 500000,
      montantActuel: 210000,
      dateLimite: "2026-12-31",
      icone: "Home",
    },
    {
      id: "g3",
      titre: "Frais de formation Certif Cloud",
      montantCible: 75000,
      montantActuel: 75000,
      dateLimite: "2026-06-15",
      icone: "BookOpen",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add funds to a goal
  const handleAddFunds = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id) {
          const newAmount = goal.montantActuel + amount;
          const isCompletedNow = newAmount >= goal.montantCible && goal.montantActuel < goal.montantCible;
          
          if (isCompletedNow) {
            showToast(`Félicitations ! Tu as complété l'objectif : "${goal.titre}" 🎓🎉`);
          } else {
            showToast(`${formatFCFA(amount)} ajoutés à l'objectif "${goal.titre}".`);
          }
          return { ...goal, montantActuel: newAmount };
        }
        return goal;
      })
    );
  };

  // Delete a goal
  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    showToast("Objectif supprimé.", "info");
  };

  // Create goal
  const handleSaveGoal = (goalData: Omit<Objectif, "id">) => {
    const newGoal: Objectif = {
      ...goalData,
      id: `g_${Math.random().toString(36).substring(2, 9)}`,
    };

    setGoals((prev) => [newGoal, ...prev]);
    showToast(`Objectif "${newGoal.titre}" créé avec succès !`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-text">Objectifs Épargne</h2>
          <p className="text-xs font-semibold text-textMuted mt-0.5">
            Planifie tes grands projets et suis l'avancement de ta tirelire.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-5 h-5" />}
        >
          Nouvel objectif
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              iconName="Target"
              title="Aucun projet enregistré"
              description="N'attends plus pour te fixer des ambitions financières solides ! Crée ton premier projet d'épargne."
              actionLabel="Créer un objectif"
              onAction={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onAddFunds={handleAddFunds}
              onDelete={handleDeleteGoal}
            />
          ))
        )}
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
      />
    </div>
  );
}
