"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";
import Footer from "@/components/dashboard/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [tournamentsExpanded, setTournamentsExpanded] = useState(false);
  const [communitiesExpanded, setCommunitiesExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      <TopNav />

      <div className="flex pt-[73px]">
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
          tournamentsExpanded={tournamentsExpanded}
          setTournamentsExpanded={setTournamentsExpanded}
          communitiesExpanded={communitiesExpanded}
          setCommunitiesExpanded={setCommunitiesExpanded}
        />

        {/* Main Content */}
        <main
          className={`flex-1 p-8 transition-all duration-300 ${
            sidebarExpanded ? "ml-72" : "ml-20"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Profile Header - You can move this to individual pages if needed */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      Raymond Thomas
                    </h1>
                    <span className="text-gray-400">• Player_raytop635</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Gloro ID: GLR-001234</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
                  Switch to Creator's Dashboard
                </button>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
