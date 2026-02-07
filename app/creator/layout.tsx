"use client";
import React, { useState } from "react";
import Sidebar from "@/components/creator/Sidebar";
import TopNav from "@/components/creator/TopNav";
import Footer from "@/components/creator/Footer";
import CreatorNavbar from "@/components/creator/CreatorNavbar";

interface CreatorLayoutProps {
  children: React.ReactNode;
}

const CreatorLayout = ({ children }: CreatorLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#021E26] flex flex-col">
      {/* <TopNav /> */}
      <CreatorNavbar/>
      
      <div className="flex pt73px] flex-1">
        <Sidebar 
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
        />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarExpanded ? "ml-64" : "ml-20"
          }`}
        >
          <div className="p-8 pb-0  min-h-screen">
            <div className=" mx-">
              {children}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default CreatorLayout;