"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/sections/DashboardHeader";
import { QuoteOfTheDay } from "@/components/sections/QuoteOfTheDay";
import { StatCard } from "@/components/cards/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/form/Button";
import { useToast } from "@/components/ui/Toast";
import { AddTaskModal } from "@/components/modals/AddTaskModal";
import { AddTransactionModal } from "@/components/modals/AddTransactionModal";
import { Plus, CheckSquare, Coins, Moon, ArrowRight } from "lucide-react";

export default function DashboardHome() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);

  // Quick state simulations
  const [tasksDone, setTasksDone] = useState(3);
  const [tasksTotal, setTasksTotal] = useState(5);
  const [balance, setBalance] = useState(55000);

  const handleSaveTask = (taskData: any) => {
    setTasksTotal((prev) => prev + 1);
    showToast(`Tâche "${taskData.titre}" créée avec succès !`);
  };

  const handleSaveTransaction = (transactionData: any) => {
    const isExpense = transactionData.type === "depense";
    if (isExpense) {
      setBalance((prev) => prev - transactionData.montant);
      showToast(`Dépense de ${transactionData.montant} FCFA enregistrée !`, "info");
    } else {
      setBalance((prev) => prev + transactionData.montant);
      showToast(`Revenu de ${transactionData.montant} FCFA enregistré !`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with greetings and streak */}
      <DashboardHeader userName={user?.nom} streak={4} />

      {/* Quote of the Day Section (Top as requested) */}
      <QuoteOfTheDay />

      {/* Todo List pour chaque matin */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-text">Tâches du matin</h2>
          <button onClick={() => setIsTaskModalOpen(true)} className="text-sm font-bold text-primary cursor-pointer hover:opacity-80">
            + Ajouter
          </button>
        </div>
        <div className="flex flex-col gap-2">
           {/* Mock tasks to show UI */}
           <div className="bg-surface p-4 rounded-2xl border border-border flex items-center justify-between shadow-sm shadow-primary/5">
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg border-2 border-primary/40 flex-shrink-0" />
                <span className="font-semibold text-text text-sm">Faire mon sport matinal</span>
             </div>
           </div>
           <div className="bg-surface p-4 rounded-2xl border border-border flex items-center justify-between shadow-sm shadow-primary/5">
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg border-2 border-success bg-success flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-textMuted text-sm line-through">Planifier ma journée</span>
             </div>
           </div>
           <div className="bg-surface p-4 rounded-2xl border border-border flex items-center justify-between shadow-sm shadow-primary/5">
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg border-2 border-primary/40 flex-shrink-0" />
                <span className="font-semibold text-text text-sm">Répondre aux emails urgents</span>
             </div>
           </div>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Solde disponible"
          value={`${balance.toLocaleString("fr-FR")} FCFA`}
          description="+15% ce mois"
          variant="success"
          trend={{ value: 15, isPositive: true }}
          iconName="Coins"
        />
        <StatCard
          title="Objectif : PC"
          value="185k FCFA"
          description="Cible : 300k FCFA"
          variant="warning"
          iconName="Target"
        />
      </div>

      {/* Bilan du Soir Callout Panel */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-primary/15 to-orange-500/5 border border-primary/25 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
            <Moon className="w-6 h-6 fill-primary" />
          </div>
          <div>
            <h3 className="text-base font-black text-text">Prêt pour ton Bilan du Soir ?</h3>
            <p className="text-xs text-textMuted max-w-md leading-relaxed mt-1">
              Évalue tes accomplissements de la journée, note ton humeur et préserve ta série de streaks Faut faire 🔥.
            </p>
          </div>
        </div>
        <Link href="/bilan" className="flex-shrink-0">
          <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full md:w-auto">
            Faire mon bilan
          </Button>
        </Link>
      </div>

      {/* Modals wrappers */}
      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
      />
      <AddTransactionModal
        isOpen={isFinanceModalOpen}
        onClose={() => setIsFinanceModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
