"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import BottomTabNav from "@/components/layout/BottomTabNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable Main Screen */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-[88px] lg:pb-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Hidden on desktop) */}
      <BottomTabNav />
    </div>
  );
}
