"use client";

import React from "react";
import { Flame, Sparkles } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

interface DashboardHeaderProps {
  userName?: string;
  streak?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = "Awa",
  streak = 4,
}) => {
  const currentDate = dayjs().format("dddd D MMMM YYYY");
  
  // Custom greeting based on the hour
  const getGreeting = () => {
    const hour = dayjs().hour();
    if (hour < 12) return "Bon matin";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
      {/* Greetings */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-text leading-tight flex items-center gap-2">
          {getGreeting()}, <span className="text-primary">{userName}</span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </h2>
        <p className="text-xs md:text-sm font-semibold text-textMuted capitalize mt-0.5">
          {currentDate}
        </p>
      </div>

      {/* Streak Badge (atypical premium highlight) */}
      <div className="self-start md:self-auto flex items-center gap-3 bg-gradient-to-r from-primary/10 to-orange-500/5 border border-primary/25 rounded-2xl px-4 py-3 shadow-lg shadow-primary/5 select-none">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary animate-bounce duration-2000">
          <Flame className="w-5 h-5 fill-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-text">Série active</span>
          <span className="text-sm font-black text-primary leading-none">
            {streak} {streak > 1 ? "jours" : "jour"} d'affilée !
          </span>
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
