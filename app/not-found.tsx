"use client";

import Link from "next/link";
import { ArrowLeft, Map } from "lucide-react";
import { Button } from "@/components/form/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#0B0E14] text-text p-6 text-center relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-surfaceLight border border-border flex items-center justify-center text-primary mb-6 shadow-2xl shadow-primary/5">
          <Map className="w-10 h-10 opacity-80" />
        </div>
        
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 mb-2">
          404
        </h1>
        
        <h2 className="text-2xl font-bold mb-4">Oups, tu t'es égaré(e)</h2>
        
        <p className="text-textMuted max-w-sm mb-8 leading-relaxed">
          Cette page n'existe pas ou a été déplacée. Retourne sur le tableau de bord pour reprendre le contrôle de ta journée.
        </p>

        <Link href="/">
          <Button variant="primary" className="px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
