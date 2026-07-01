"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BilanChecklist } from "@/components/sections/BilanChecklist";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/form/Button";
import { useToast } from "@/components/ui/Toast";
import { Flame, History, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BilanPage() {
  const { showToast } = useToast();
  const [completed, setCompleted] = useState(false);
  const [completionRate, setCompletionRate] = useState(0);

  // Mock active tasks for today's review
  const todayTasks = [
    { id: "t1", titre: "Acheter pass internet MTN 5 Go", completed: false },
    { id: "t2", titre: "Préparer pitch pour le Side Hustle", completed: true },
    { id: "t3", titre: "Appeler le trésorier de la tontine", completed: true },
  ];

  const handleBilanSubmit = (data: { checkedTaskIds: string[]; humeur: string; note: string }) => {
    // Calculate final score
    const total = todayTasks.length;
    const checked = data.checkedTaskIds.length;
    const rate = Math.round((checked / total) * 100);

    setCompletionRate(rate);
    setCompleted(true);
    showToast("Félicitations ! Bilan du soir enregistré 🔥 (+1 jour de streak !)");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Title bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-text">Bilan du Soir</h2>
          <p className="text-xs font-semibold text-textMuted mt-0.5">
            Prends un temps pour faire le point sur ta journée.
          </p>
        </div>

        <Link href="/bilan/historique">
          <Button variant="secondary" size="sm" leftIcon={<History className="w-4 h-4" />}>
            Historique
          </Button>
        </Link>
      </div>

      {!completed ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-surface/50 border border-border/80 p-6 rounded-3xl glass-card">
            <BilanChecklist tasks={todayTasks} onSubmit={handleBilanSubmit} />
          </div>

          {/* Tips sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl p-5 border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                <Flame className="w-5 h-5 fill-primary animate-pulse" />
                <span>Pourquoi un bilan ?</span>
              </div>
              <p className="text-xs text-textMuted leading-relaxed">
                Le bilan du soir t'aide à prendre du recul, à célébrer tes petites victoires et à corriger le tir pour demain. De plus, il alimente ta série active de réussite !
              </p>
            </div>

            <div className="rounded-3xl p-5 border border-border bg-surfaceLight/30">
              <span className="text-xs font-extrabold text-text block mb-1">Rappel quotidien</span>
              <p className="text-xs text-textMuted leading-relaxed">
                Tu recevras une notification locale à 21h00 pour t'inviter à faire ton bilan. Tu peux ajuster cette heure dans ton profil.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Congratulations View (Atypical interactive dashboard success pane) */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-8 border border-primary/20 bg-gradient-to-br from-surface to-[#16120d] text-center max-w-xl mx-auto w-full flex flex-col items-center gap-6"
        >
          {/* Completion circular progress */}
          <div className="relative">
            <ProgressBar value={completionRate} type="circular" size="lg" showLabel />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-text border-2 border-surface shadow-md">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-text">Bilan validé avec succès !</h3>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mt-1">
              Série active : 5 jours consécutifs 🔥
            </p>
            <p className="text-sm text-textMuted leading-relaxed mt-4 max-w-sm mx-auto">
              Tu as complété {completionRate}% de tes objectifs fixés pour aujourd'hui. Repose-toi bien pour entamer la journée de demain avec force !
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Link href="/bilan/historique" className="flex-1">
              <Button variant="secondary" className="w-full">
                Voir l'historique
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="primary" className="w-full">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
