"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, CheckSquare, Coins, Moon, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomTabNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Tâches", href: "/taches", icon: CheckSquare },
    { label: "Finances", href: "/finances", icon: Coins },
    { label: "Bilan", href: "/bilan", icon: Moon },
    { label: "Épargne", href: "/epargne", icon: PiggyBank },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden h-[72px] glass-panel border-t border-border/80 px-4 pb-safe flex items-center justify-around shadow-[0_-4px_24px_rgba(232,150,125,0.08)]">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-colors duration-200"
          >
            {/* Active background indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-primary/10 rounded-2xl border border-primary/20"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}

            <motion.div
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              whileTap={{ scale: 0.85, rotate: isActive ? 0 : -5 }}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 relative z-10",
                isActive ? "text-primary" : "text-text/50 hover:text-text/80"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
              <span className="text-[10px] font-bold tracking-wide uppercase">
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};
export default BottomTabNav;
