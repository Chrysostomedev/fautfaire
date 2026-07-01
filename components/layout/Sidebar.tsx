"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  CheckSquare,
  Coins,
  Moon,
  User,
  Sparkles,
  Target,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Tâches", href: "/taches", icon: CheckSquare },
    { label: "Finances", href: "/finances", icon: Coins },
    { label: "Bilan Journalier", href: "/bilan", icon: Moon },
    { label: "Objectifs Épargne", href: "/objectifs", icon: Target },
    { label: "Citations", href: "/citations", icon: Sparkles },
    { label: "Profil & Réglages", href: "/profil", icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen sticky top-0 bg-surface border-r border-border/80 p-6 flex-shrink-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 bg-primary/10">
          <Image src="/img/logo.png" alt="Faut faire" fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Faut faire
          </span>
          <span className="text-[9px] text-textMuted uppercase font-bold tracking-widest">
            Vie & Ambition
          </span>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3.5 px-4 h-12 rounded-xl text-sm font-semibold transition-all select-none group cursor-pointer",
                isActive ? "text-primary" : "text-textMuted hover:text-text hover:bg-surfaceLight/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-105", isActive ? "text-primary" : "text-textMuted group-hover:text-text")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account status */}
      <div className="border-t border-border pt-4 mt-auto">
        <div className="flex items-center gap-3 px-2 py-1.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-surfaceLight border border-border flex items-center justify-center font-bold text-primary">
            GJ
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-text truncate">G. Jean-Jacques</span>
            <span className="text-[10px] text-textMuted truncate">gjean@yelen.ci</span>
          </div>
        </div>
        <button
          className="flex w-full items-center gap-3 px-4 h-10 rounded-xl text-xs font-bold text-danger hover:bg-danger/10 transition-colors cursor-pointer"
          onClick={() => {
            alert("Simulation Déconnexion - Retour à l'onboarding");
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
