"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";
import Footer from "@/components/dashboard/Footer";
import Navbar from "@/components/new/shared/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [tournamentsExpanded, setTournamentsExpanded] = useState(false);
  const [communitiesExpanded, setCommunitiesExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      {/* <TopNav /> */}
      <Navbar />

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
            {/* Profile Header */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Profile Info */}
                <div className="flex-1">
                  {/* Name and Username */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white orbitron">
                      Raymond Thomas
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="text-gray-400 text-sm sm:text-base">
                        Player_raytop635
                      </span>
                    </div>
                  </div>

                  {/* Gloro ID */}
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Gloro ID: GLR-001234
                    </span>
                  </div>
                </div>

                {/* Switch Button */}
                <button className="w-full sm:w-auto px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2 text-sm sm:text-base">
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
