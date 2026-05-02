"use client";
import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/shared/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [tournamentsExpanded, setTournamentsExpanded] = useState(false);
  const [communitiesExpanded, setCommunitiesExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      <Navbar />
      <div className="flex pt-24">
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
          tournamentsExpanded={tournamentsExpanded}
          setTournamentsExpanded={setTournamentsExpanded}
          communitiesExpanded={communitiesExpanded}
          setCommunitiesExpanded={setCommunitiesExpanded}
        />
        <main
          className={`flex-1 p-8 transition-all duration-300 ${
            sidebarExpanded ? "md:ml-72 ml-0" : "md:ml-20 ml-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
