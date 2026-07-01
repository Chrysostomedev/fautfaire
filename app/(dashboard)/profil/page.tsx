"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/form/Button";
import { useToast } from "@/components/ui/Toast";
import { Settings, HelpCircle, FileText, ShieldCheck, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const AccordionItem = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/60 bg-surface rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surfaceLight/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 text-text">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-bold">{title}</span>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-textMuted transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-sm text-textMuted leading-relaxed border-t border-border/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProfilPage() {
  const { user, resetOnboarding } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    resetOnboarding();
    showToast("Tu as scié la cabine (Déconnecté). À la prochaine chef !");
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Profil */}
      <div className="flex flex-col items-center text-center mt-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-orange-400 p-1 mb-4 shadow-lg shadow-primary/20">
          <div className="w-full h-full rounded-full bg-surface flex items-center justify-center border-4 border-surfaceLight">
            <span className="text-3xl font-black text-text uppercase">
              {user?.nom?.substring(0, 2) || "FF"}
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-black text-text">
          {user?.nom || "Le Boss"}
        </h1>
        <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">
          Gérant de ses bails
        </p>
      </div>

      {/* Sections Nouchi / Pro */}
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-bold text-textMuted uppercase tracking-wider mb-2 ml-2">
          Paramètres de la cabine
        </h2>
        
        <AccordionItem title="Comment on gère les bails (FAQ)" icon={HelpCircle}>
          <p className="mb-2"><strong className="text-text">C'est quoi Faut faire ?</strong></p>
          <p className="mb-4">
            C'est ton appli de poche pour gérer tes tâches (ce que tu dois dja), suivre ton djê (tes finances), et garder la motivation avec des citations pour bien te dja enjailler.
          </p>
          <p className="mb-2"><strong className="text-text">Mon djê est-il en sécurité ?</strong></p>
          <p>
            T'inquiète même pas ! Tout est sauvegardé localement sur ton téléphone pour l'instant. Personne ne voit tes affaires, même pas nous.
          </p>
        </AccordionItem>

        <AccordionItem title="Règles du jeu (Conditions)" icon={FileText}>
          <p>
            En utilisant <strong>Faut faire</strong>, tu t'engages à essayer de devenir la meilleure version de toi-même. Faut pas dja, on est là pour évoluer. L'appli est fournie "telle quelle" pour t'aider à organiser ton quotidien. 
            On ne te demande pas de carte bancaire, c'est juste de la bonne vibe et de la discipline !
          </p>
        </AccordionItem>

        <AccordionItem title="Secret bancaire (Confidentialité)" icon={ShieldCheck}>
          <p>
            On respecte ta vie privée comme on respecte les anciens. Tes données (tâches, épargne, humeur) restent sur ton appareil. 
            Quand on passera en ligne (Cloud), ce sera avec un chiffrement béton. Ton nom et tes habitudes ne seront jamais vendus pour du garba.
          </p>
        </AccordionItem>

        <button className="w-full flex items-center justify-between p-4 text-left bg-surface rounded-2xl border border-border/60 hover:bg-surfaceLight/30 transition-colors mt-3 cursor-pointer">
          <div className="flex items-center gap-3 text-text">
            <div className="w-8 h-8 rounded-lg bg-textMuted/10 flex items-center justify-center text-textMuted">
              <Settings className="w-4 h-4" />
            </div>
            <span className="font-bold">Préférences (Bientôt dispo)</span>
          </div>
        </button>
      </div>

      {/* Logout Action */}
      <div className="mt-4 px-2">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full border-danger/30 text-danger hover:bg-danger/10 py-4"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter (Quitter le navire)
        </Button>
        <p className="text-center text-[10px] text-textMuted uppercase font-bold tracking-widest mt-6">
          Faut faire v1.0.0 • Fabriqué avec <span className="text-danger">❤️</span> en Afrique
        </p>
      </div>
    </div>
  );
}
