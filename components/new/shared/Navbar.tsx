"use client";
import React, { useState } from "react";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react";

const Page = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <main className="relative top-10">
        <section className="px-4 sm:px-6">
          <nav
            className="w-full max-w-7xl mx-auto rounded-[100px] flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 lg:px-[69px] border-[0.2px] transition-all duration-300"
            style={{
              background: `linear-gradient(270deg, rgba(149, 24, 211, 0.05) 0%, rgba(74, 97, 221, 0.05) 50%, rgba(0, 170, 231, 0.05) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
              borderColor: "rgba(175, 192, 187, 0.7)",
              boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center">
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider"
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
            </div>

            {/* Search Bar - Hidden on small mobile, visible on medium+ */}
            <div
              className={`hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 lg:px-6 lg:py-3 transition-all duration-300 ${
                searchFocused ? "lg:w-[450px] border-white/20" : "lg:w-[400px]"
              } w-[300px]`}
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1 text-sm lg:text-base"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>

            {/* Mobile Search Button */}
            <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
            </button>

            {/* Navigation Links - Hidden on mobile, visible on large screens */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              <a
                href="#"
                className="text-[#00AAE7] font-medium text-base xl:text-lg hover:text-[#4A61DD] transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white/70 font-medium text-base xl:text-lg hover:text-white transition-colors"
              >
                Tournament
              </a>
              <button className="flex items-center gap-2 text-white/70 font-medium text-base xl:text-lg hover:text-white transition-colors">
                Categories
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
            </div>

            {/* Right Section - Notification & Profile */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {/* Notification Bell */}
              <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-white/70" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile - Hidden on mobile, visible on small screens and up */}
              <button className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#4A61DD] to-[#9518D3] items-center justify-center text-white font-bold text-base lg:text-lg hover:scale-105 transition-transform">
                P
              </button>
            </div>
          </nav>

          {/* Mobile Search Bar - Appears when needed */}
          <div
            className={`md:hidden mt-4 mx-auto max-w-md transition-all duration-300 ${
              searchFocused ? "opacity-100 visible" : "opacity-0 invisible h-0"
            }`}
          >
            <div
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3"
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
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`lg:hidden mt-4 transition-all duration-300 overflow-hidden ${
              mobileMenuOpen
                ? "max-h-96 opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            }`}
          >
            <div
              className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
              style={{
                background: `linear-gradient(270deg, rgba(149, 24, 211, 0.1) 0%, rgba(74, 97, 221, 0.1) 50%, rgba(0, 170, 231, 0.1) 100%)`,
              }}
            >
              {/* Mobile Profile Info */}
              <div className="flex items-center gap-4 mb-6">
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A61DD] to-[#9518D3] flex items-center justify-center text-white font-bold text-lg">
                  P
                </button>
                <div>
                  <p className="text-white font-semibold">Player Profile</p>
                  <p className="text-gray-400 text-sm">GLR-001234</p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-between text-white/70 hover:text-white transition-colors py-2 border-b border-white/10"
                >
                  <span className="text-lg font-medium">Home</span>
                  <span className="text-[#00AAE7]">→</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between text-white/70 hover:text-white transition-colors py-2 border-b border-white/10"
                >
                  <span className="text-lg font-medium">Tournament</span>
                  <span className="text-[#4A61DD]">→</span>
                </a>
                <button className="flex items-center justify-between w-full text-white/70 hover:text-white transition-colors py-2 border-b border-white/10">
                  <span className="text-lg font-medium">Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchFocused(true);
                }}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-all"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;