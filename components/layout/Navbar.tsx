"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, Bell } from "lucide-react";
import { NotificationPanel } from "./NotificationPanel";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Page titles
  const getPageTitle = () => {
    if (pathname === "/") return "Faut faire";
    if (pathname.startsWith("/taches")) return "Mes Tâches";
    if (pathname.startsWith("/finances")) return "Mes Finances";
    if (pathname.startsWith("/bilan")) return "Bilan du Soir";
    if (pathname.startsWith("/objectifs")) return "Objectifs Épargne";
    if (pathname.startsWith("/citations")) return "Citations Inspirantes";
    if (pathname.startsWith("/profil")) return "Mon Profil";
    return "Faut faire";
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 w-full glass-panel border-b border-border/60 px-4 sm:px-6 flex items-center justify-between">
        {/* Page Title / App Logo */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden flex items-center gap-1.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-md shadow-primary/20 bg-primary/10">
              <Image src="/img/logo.png" alt="Faut faire" fill className="object-cover" />
            </div>
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Faut faire
            </span>
          </div>
          <h1 className="hidden lg:block text-xl font-bold text-text">
            {getPageTitle()}
          </h1>
        </div>

        {/* Action buttons (Notifs / Quote Shortcut) */}
        <div className="flex items-center gap-3">
          <Link
            href="/citations"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surfaceLight border border-border text-primary/80 hover:text-primary transition-colors cursor-pointer"
            title="Citation inspirante"
          >
            <Sparkles className="w-5 h-5" />
          </Link>
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-surfaceLight border border-border text-textMuted hover:text-text transition-colors cursor-pointer"
            onClick={() => setIsNotifOpen(true)}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface" />
          </button>
          <Link
            href="/profil"
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-text font-bold border border-primary/30"
          >
            GJ
          </Link>
        </div>
      </header>

      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
export default Navbar;
