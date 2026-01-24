"use client";
import React, { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import {
  Maximize2,
  Trophy,
  Users,
  Gamepad2,
  UsersRound,
  ArrowRight,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

const page = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(true);

  return (
    <>
      <main className="bg-[#021E26] min-h-screen">
        <section className="py-20">
          <nav
            className="w-[96%] mx-auto rounded-[100px] flex items-center justify-between px-[69px] py-6 border-[0.2px]"
            style={{
              background: `linear-gradient(270deg, rgba(149, 24, 211, 0.05) 0%, rgba(74, 97, 221, 0.05) 50%, rgba(0, 170, 231, 0.05) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
              borderColor: "rgba(175, 192, 187, 0.7)",
              boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Logo */}
            <div className="flex items-center">
              <h1
                className="text-4xl font-bold tracking-wider"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  background:
                    "linear-gradient(90deg, #00AAE7 0%, #4A61DD 50%, #9518D3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                GloroQ
              </h1>
            </div>

            {/* Search Bar */}
            <div
              className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 transition-all duration-300 ${
                searchFocused ? "w-[450px] border-white/20" : "w-[400px]"
              }`}
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12">
              <a
                href="#"
                className="text-[#00AAE7] font-medium text-lg hover:text-[#4A61DD] transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white/70 font-medium text-lg hover:text-white transition-colors"
              >
                Tournament
              </a>
              <button className="flex items-center gap-2 text-white/70 font-medium text-lg hover:text-white transition-colors">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Right Section - Notification & Profile */}
            <div className="flex items-center gap-6">
              {/* Notification Bell */}
              <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                <Bell className="w-6 h-6 text-white/70" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A61DD] to-[#9518D3] flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition-transform">
                P
              </button>
            </div>
          </nav>
        </section>

        <div className="min-h-screen p-8 flex items-center">
          <aside
            className="w-[426px] rounded-3xl border py-4 flex flex-col gap-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(178, 139, 179, 0.2) 0%, rgba(144, 168, 168, 0.2) 100%)",
              borderColor: "#DEF4FF",
              boxShadow: "0px 0px 24px 8px rgba(8, 33, 15, 0.16) inset",
            }}
          >
            {/* Add Button */}
            <div className="px-6">
              <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col gap-1 px-3">
              {/* Overview */}
              <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-white/5 transition-colors">
                <Maximize2 className="w-6 h-6" />
                <span className="text-lg font-medium">Overview</span>
              </button>

              {/* Tournaments with Dropdown */}
              <div>
                <button
                  onClick={() => setTournamentsOpen(!tournamentsOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Trophy className="w-6 h-6" />
                    <span className="text-lg font-medium">Tournaments</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${tournamentsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {tournamentsOpen && (
                  <div className="mt-1 ml-12 flex flex-col gap-1">
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Active Tournaments
                    </button>
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Past Tournaments
                    </button>
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Upcoming Events
                    </button>
                  </div>
                )}
              </div>

              {/* Communities with Dropdown - Active State */}
              <div>
                <button
                  onClick={() => setCommunitiesOpen(!communitiesOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl text-white transition-colors"
                  style={{
                    background: "#0074AB",
                    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.16)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Users className="w-6 h-6" />
                    <span className="text-lg font-medium">Communities</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${communitiesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {communitiesOpen && (
                  <div className="mt-1 ml-12 flex flex-col gap-1">
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      My Communities
                    </button>
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Discover New
                    </button>
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Community Events
                    </button>
                    <button className="px-6 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Leaderboards
                    </button>
                  </div>
                )}
              </div>

              {/* Configure Games ID */}
              <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-white/5 transition-colors">
                <Gamepad2 className="w-6 h-6" />
                <span className="text-lg font-medium">Configure Games ID</span>
              </button>

              {/* Teams */}
              <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-white/5 transition-colors">
                <UsersRound className="w-6 h-6" />
                <span className="text-lg font-medium">Teams</span>
              </button>

              {/* Go to creator's Dashboard */}
              <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-[#0EA5E9] hover:bg-white/5 transition-colors mt-8">
                <ArrowRight className="w-6 h-6" />
                <span className="text-lg font-medium">
                  Go to creator's Dashboard
                </span>
              </button>

              {/* Settings */}
              <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-white/5 transition-colors mt-8">
                <Settings className="w-6 h-6" />
                <span className="text-lg font-medium">Settings</span>
              </button>

              {/* Logout */}
              <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-white/5 transition-colors">
                <LogOut className="w-6 h-6" />
                <span className="text-lg font-medium">Logout</span>
              </button>
            </nav>
          </aside>
        </div>

        <section>
          <div className="w-[98%] bg-[#020818] h-60 mx-auto"></div>
        </section>
      </main>
    </>
  );
};

export default page;
