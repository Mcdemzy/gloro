"use client";
import React, { useState } from "react";
import { Bell, Search, Copy } from "lucide-react";

const TopNav = () => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("GLR-001234");
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-b border-purple-500/20 bg-[#0a1628]/95 backdrop-blur-md z-[60]">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-cyan-400">Gloro</div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Gloro ID:</span>
              <span className="text-white">GLR-001234</span>
              <button
                onClick={copyToClipboard}
                className="text-cyan-400 hover:text-cyan-300 transition-colors relative"
              >
                <Copy size={18} />
                {showCopyTooltip && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              P
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
