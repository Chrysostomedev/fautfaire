"use client";

import React, { useState } from "react";
import { Search, Sparkles, BookOpen } from "lucide-react";
import { Input } from "@/components/form/Input";
import { QuoteCard } from "@/components/cards/QuoteCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Citation } from "@/types/quote.types";
import citationsData from "@/data/json/citations.json";

export default function CitationsPage() {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("tous");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("tous");

  const quotes = citationsData as Citation[];

  // Unique domains extraction
  const domains = ["tous", "leadership", "entrepreneuriat", "resilience", "innovation", "discipline"];
  
  // Filter logic
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.texte.toLowerCase().includes(search.toLowerCase()) ||
      q.auteur.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      selectedDomain === "tous" || q.domaine.includes(selectedDomain as any);

    const matchesOrigin =
      selectedOrigin === "tous" || q.origine === selectedOrigin;

    return matchesSearch && matchesDomain && matchesOrigin;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-black text-text flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span>Bibliothèque Inspirante</span>
        </h2>
        <p className="text-xs font-semibold text-textMuted mt-0.5">
          Découvre les citations inspirantes de personnalités africaines et d'innovateurs tech.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 bg-surfaceLight/30 border border-border p-5 rounded-3xl">
        {/* Search */}
        <Input
          placeholder="Rechercher par auteur ou mot-clé..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
          className="h-11"
        />

        {/* Filters Group */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Domains horizontal filter */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">
              Domaine d'impact
            </span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap lowercase ${
                    selectedDomain === dom
                      ? "bg-primary/20 border border-primary/45 text-primary"
                      : "bg-surfaceLight/80 border border-border/80 text-textMuted hover:text-text"
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Origin filter toggle */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">
              Origine de la citation
            </span>
            <div className="flex p-1 rounded-xl bg-surfaceLight border border-border/80 self-start md:self-auto">
              {[
                { value: "tous", label: "Toutes" },
                { value: "afrique", label: "Afrique" },
                { value: "tech", label: "Tech" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedOrigin(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedOrigin === opt.value
                      ? "bg-primary text-text shadow-sm"
                      : "text-textMuted hover:text-text"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuotes.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              iconName="Sparkles"
              title="Aucune citation trouvée"
              description="Modifie tes critères de recherche pour trouver la citation qui va t'inspirer aujourd'hui !"
            />
          </div>
        ) : (
          filteredQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        )}
      </div>
    </div>
  );
}
