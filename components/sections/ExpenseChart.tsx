"use client";

import React from "react";
import { formatFCFA } from "@/lib/utils";

interface ExpenseChartProps {
  data?: { date: string; depense: number; revenu: number }[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  // Default static graph data representing standard values for demo
  const chartData = data || [
    { date: "Lun", depense: 4500, revenu: 12000 },
    { date: "Mar", depense: 12000, revenu: 5000 },
    { date: "Mer", depense: 6000, revenu: 15000 },
    { date: "Jeu", depense: 8000, revenu: 8000 },
    { date: "Ven", depense: 1500, revenu: 32000 },
    { date: "Sam", depense: 19500, revenu: 10000 },
    { date: "Dim", depense: 8500, revenu: 0 },
  ];

  // SVG parameters
  const width = 500;
  const height = 200;
  const padding = 30;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Max value to scale graph
  const maxVal = Math.max(
    ...chartData.map((d) => Math.max(d.depense, d.revenu)),
    10000 // min ceiling
  );

  // Generate SVG coordinates
  const getCoordinates = (type: "depense" | "revenu") => {
    return chartData.map((item, index) => {
      const x = padding + (index / (chartData.length - 1)) * graphWidth;
      const val = type === "depense" ? item.depense : item.revenu;
      const y = padding + graphHeight - (val / maxVal) * graphHeight;
      return { x, y };
    });
  };

  const depenseCoords = getCoordinates("depense");
  const revenuCoords = getCoordinates("revenu");

  // Create path strings
  const getPathString = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return "";
    return coords.reduce(
      (path, c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `${path} L ${c.x} ${c.y}`),
      ""
    );
  };

  const getAreaPathString = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return "";
    const linePath = getPathString(coords);
    const startX = coords[0].x;
    const endX = coords[coords.length - 1].x;
    const bottomY = padding + graphHeight;
    return `${linePath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  const depensePath = getPathString(depenseCoords);
  const depenseAreaPath = getAreaPathString(depenseCoords);

  const revenuPath = getPathString(revenuCoords);
  const revenuAreaPath = getAreaPathString(revenuCoords);

  return (
    <div className="rounded-3xl p-5 border border-border/80 bg-surface/50 glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-text">Flux financier hebdomadaire</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-[10px] font-bold text-textMuted uppercase">Revenus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-danger" />
            <span className="text-[10px] font-bold text-textMuted uppercase">Dépenses</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            {/* Gradients */}
            <linearGradient id="gradientRevenu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradientDepense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding + ratio * graphHeight;
            const gridVal = maxVal * (1 - ratio);
            return (
              <g key={ratio} className="opacity-20">
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#262C38"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding - 5}
                  y={y + 3}
                  fill="#9AA3B2"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  {gridVal >= 1000 ? `${Math.round(gridVal / 1000)}k` : Math.round(gridVal)}
                </text>
              </g>
            );
          })}

          {/* Area under curves */}
          <path d={revenuAreaPath} fill="url(#gradientRevenu)" />
          <path d={depenseAreaPath} fill="url(#gradientDepense)" />

          {/* Line paths */}
          <path d={revenuPath} fill="none" stroke="#22C55E" strokeWidth="2.5" />
          <path d={depensePath} fill="none" stroke="#EF4444" strokeWidth="2.5" />

          {/* Coordinates dots */}
          {revenuCoords.map((c, i) => (
            <circle key={`rev-${i}`} cx={c.x} cy={c.y} r="3.5" className="fill-surface stroke-success stroke-2" />
          ))}
          {depenseCoords.map((c, i) => (
            <circle key={`dep-${i}`} cx={c.x} cy={c.y} r="3.5" className="fill-surface stroke-danger stroke-2" />
          ))}

          {/* X axis labels */}
          {chartData.map((d, i) => {
            const x = padding + (i / (chartData.length - 1)) * graphWidth;
            const y = height - padding + 15;
            return (
              <text
                key={i}
                x={x}
                y={y}
                fill="#9AA3B2"
                fontSize="9"
                fontWeight="black"
                textAnchor="middle"
              >
                {d.date}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
export default ExpenseChart;
