"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckSquare, Coins, Flame, Lightbulb, ArrowRight, User } from "lucide-react";
import { Button } from "../form/Button";
import { Input } from "../form/Input";

interface OnboardingProps {
  onComplete: (userName: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      if (!name.trim()) {
        setNameError("S'il te plaît, entre ton prénom pour continuer.");
        return;
      }
      onComplete(name.trim());
    }
  };

  const stepsData = [
    {
      title: "Bienvenue sur Faut faire",
      subtitle: "Prends ton destin en main",
      description: "Faut faire t'accompagne pour éclairer ton organisation personnelle, tes finances et booster ta discipline au quotidien.",
      image: "/onboarding-welcome.png",
      color: "from-primary to-yellow-500",
    },
    {
      title: "Domine tes Tâches",
      subtitle: "Gagne en clarté",
      description: "Crée tes tâches quotidiennes, hiérarchise tes priorités, et active des rappels. Termine tes journées l'esprit tranquille.",
      image: "/onboarding-tasks.png",
      color: "from-primary to-orange-600",
    },
    {
      title: "Prends le contrôle de tes finances",
      subtitle: "Pas de gaspillage",
      description: "Note tes dépenses quotidiennes (gbaka, maquis, forfait MTN/Orange) et tes revenus. Définis des objectifs d'épargne clairs (comme acheter un PC) et suis ta progression.",
      image: "/onboarding-finances.png",
      color: "from-emerald-400 to-teal-600",
    },
    {
      title: "Le Bilan du Soir",
      subtitle: "Crée ta série d'action",
      description: "Chaque soir, prends 2 minutes pour valider tes accomplissements et noter ton humeur. Cumule des jours consécutifs pour faire monter ta série de réussite 🔥 !",
      image: "/onboarding-bilan.png",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background text-text flex flex-col justify-between p-6 overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Top Header */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-md shadow-primary/20 bg-primary/10">
            <Image src="/img/logo.png" alt="Faut faire" fill className="object-cover" />
          </div>
          <span className="font-extrabold tracking-wider bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">Faut faire</span>
        </div>
        {step < 5 && (
          <button 
            onClick={() => setStep(5)} 
            className="text-xs font-bold text-textMuted hover:text-text cursor-pointer select-none"
          >
            Passer l'introduction
          </button>
        )}
      </div>

      {/* Content Slide Container */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full my-6">
        <AnimatePresence mode="wait">
          {step <= 4 ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              {/* Animated Image Container */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className={`w-48 h-48 rounded-[2rem] bg-gradient-to-br ${stepsData[step - 1].color} flex items-center justify-center text-white shadow-xl shadow-primary/10 mb-8 overflow-hidden relative border-4 border-border`}
              >
                <Image
                  src={stepsData[step - 1].image}
                  alt={stepsData[step - 1].title}
                  fill
                  className="object-cover"
                  priority={step === 1}
                />
              </motion.div>

              <h1 className="text-2xl font-black tracking-tight text-text mb-2">
                {stepsData[step - 1].title}
              </h1>
              <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                {stepsData[step - 1].subtitle}
              </span>
              <p className="text-sm text-textMuted leading-relaxed max-w-sm">
                {stepsData[step - 1].description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                  <User className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-black text-text">Prêt à briller ?</h1>
                <p className="text-xs font-bold text-textMuted uppercase tracking-wider mt-1.5">
                  Faisons les présentations
                </p>
              </div>

              <div className="flex flex-col gap-4 bg-surfaceLight/40 border border-border p-6 rounded-2xl">
                <Input
                  label="Comment t'appelles-tu ?"
                  placeholder="Ex: Awa, Ibrahim, Jean..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  error={nameError}
                  autoFocus
                />
                <p className="text-[11px] text-textMuted leading-normal">
                  Ce prénom sera utilisé localement pour te saluer chaque jour et personnaliser tes objectifs.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Nav & Action */}
      <div className="max-w-md mx-auto w-full flex flex-col gap-5 pb-6">
        {/* Step dots */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          onClick={handleNext}
          rightIcon={step < 5 ? <ArrowRight className="w-4 h-4" /> : undefined}
          className="w-full"
        >
          {step === 5 ? "C'est parti !" : "Continuer"}
        </Button>
      </div>
    </div>
  );
};
export default Onboarding;
