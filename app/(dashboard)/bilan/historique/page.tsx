"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/form/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Flame, Smile, Laugh, Meh, Frown } from "lucide-react";
import dayjs from "dayjs";

export default function BilanHistoryPage() {
  // Mock history database
  const history = [
    { id: "b1", date: "2026-07-01", completion: 66, humeur: "bien", note: "Pitch du Side Hustle prêt, petite baisse de motivation dans l'aprem résolue par un bon garba.", streak: 4 },
    { id: "b2", date: "2026-06-30", completion: 100, humeur: "excellent", note: "Journée parfaite ! Validé toutes les tâches de code React et payé ma tontine en avance.", streak: 3 },
    { id: "b3", date: "2026-06-29", completion: 50, humeur: "moyen", note: "Beaucoup d'embouteillages en gbaka ce matin. Un peu fatigué ce soir.", streak: 2 },
    { id: "b4", date: "2026-06-28", completion: 80, humeur: "bien", note: "Bonne séance de sport, bien révisé mes leçons.", streak: 1 },
  ];

  const moodIcons = {
    excellent: { icon: Laugh, color: "text-green-400" },
    bien: { icon: Smile, color: "text-primary" },
    moyen: { icon: Meh, color: "text-warning" },
    difficile: { icon: Frown, color: "text-danger" },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Title */}
      <div className="flex items-center gap-3">
        <Link href="/bilan">
          <button className="p-2 rounded-xl bg-surfaceLight hover:bg-border text-textMuted hover:text-text transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-text">Historique des Bilans</h2>
          <p className="text-xs font-semibold text-textMuted mt-0.5">
            Suis ton évolution émotionnelle et opérationnelle.
          </p>
        </div>
      </div>

      {/* Streak summary banner */}
      <div className="rounded-2xl p-5 border border-primary/20 bg-primary/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Flame className="w-6 h-6 fill-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider block">Streaks max enregistrés</span>
          <span className="text-sm font-extrabold text-text">
            Tu as maintenu une série de <span className="text-primary font-black">4 jours</span> consécutifs. Époustouflant !
          </span>
        </div>
      </div>

      {/* History Log List */}
      <div className="flex flex-col gap-4">
        {history.map((bilan) => {
          const moodConfig = moodIcons[bilan.humeur as keyof typeof moodIcons] || moodIcons.bien;
          const MoodIconComp = moodConfig.icon;

          return (
            <div
              key={bilan.id}
              className="rounded-2xl p-5 border border-border/80 bg-surface/40 hover:border-border transition-all flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black text-text capitalize">
                  {dayjs(bilan.date).format("dddd DD MMMM YYYY")}
                </span>

                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="text-[9px]">
                    {bilan.completion}% Complétion
                  </Badge>
                  <div className={`w-8 h-8 rounded-lg bg-surfaceLight flex items-center justify-center border border-border/50 ${moodConfig.color}`}>
                    <MoodIconComp className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {bilan.note && (
                <p className="text-xs text-textMuted leading-relaxed bg-surfaceLight/20 border border-border/40 p-3 rounded-xl italic">
                  "{bilan.note}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
