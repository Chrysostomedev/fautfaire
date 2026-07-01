"use client";

import React, { useState } from "react";
import { Plus, Coins, TrendingUp, TrendingDown, History } from "lucide-react";
import { Button } from "@/components/form/Button";
import { StatCard } from "@/components/cards/StatCard";
import { TransactionCard } from "@/components/cards/TransactionCard";
import { ExpenseChart } from "@/components/sections/ExpenseChart";
import { EmptyState } from "@/components/ui/EmptyState";
import { AddTransactionModal } from "@/components/modals/AddTransactionModal";
import { useToast } from "@/components/ui/Toast";
import { Transaction } from "@/types/finance.types";
import { formatFCFA } from "@/lib/utils";
import initialTransactions from "@/data/mock/transactions.mock.json";

export default function FinancesPage() {
  const { showToast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions as Transaction[]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Financial KPI calculations
  const calculateKPIs = () => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "revenu") {
        income += t.montant;
      } else {
        expense += t.montant;
      }
    });

    const net = income - expense;
    // savings rate: net savings / income
    const savingsRate = income > 0 ? Math.round((net / income) * 100) : 0;

    return {
      net,
      income,
      expense,
      savingsRate,
    };
  };

  const kpis = calculateKPIs();

  // Add Transaction
  const handleSaveTransaction = (transactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `tr_${Math.random().toString(36).substring(2, 9)}`,
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    if (newTransaction.type === "depense") {
      showToast(`Dépense de ${formatFCFA(newTransaction.montant)} ajoutée.`);
    } else {
      showToast(`Revenu de ${formatFCFA(newTransaction.montant)} ajouté.`);
    }
  };

  // Delete Transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast("Transaction supprimée.", "info");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-text">Mes Finances</h2>
          <p className="text-xs font-semibold text-textMuted mt-0.5">
            Gère ton budget, note tes dépenses quotidiennes et suis tes économies.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-5 h-5" />}
        >
          Enregistrer un flux
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Solde disponible"
          value={formatFCFA(kpis.net)}
          description={`Taux d'épargne: ${kpis.savingsRate}%`}
          variant="primary"
          iconName="Coins"
        />
        <StatCard
          title="Total des Revenus"
          value={formatFCFA(kpis.income)}
          description="Tous les encaissements"
          variant="success"
          iconName="TrendingUp"
        />
        <StatCard
          title="Total des Dépenses"
          value={formatFCFA(kpis.expense)}
          description="Toutes les sorties"
          variant="danger"
          iconName="TrendingDown"
        />
      </div>

      {/* Custom line chart SVG */}
      <ExpenseChart />

      {/* Transactions History Header */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted flex items-center gap-1.5">
          <History className="w-4 h-4" />
          <span>Derniers mouvements</span>
        </h3>

        {/* Transactions list */}
        <div className="flex flex-col gap-3">
          {transactions.length === 0 ? (
            <EmptyState
              iconName="Coins"
              title="Aucune transaction"
              description="Commence par enregistrer ta première dépense ou ton premier revenu !"
              actionLabel="Enregistrer un flux"
              onAction={() => setIsModalOpen(true)}
            />
          ) : (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={handleDeleteTransaction}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Transaction Modal Drawer */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
