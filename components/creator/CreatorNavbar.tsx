"use client";
import React, { useState } from "react";
import { Search, Bell, Menu, X, ChevronDown } from "lucide-react";

const CreatorNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      <nav
        className="relative mx-4 lg:mx-auto my-8 max-w-[1459px] px-8 sm:px-12 lg:px-[69px] py-6"
        style={{
          background:
            "linear-gradient(270deg, rgba(149, 24, 211, 0.05) 0%, rgba(74, 97, 221, 0.05) 50%, rgba(0, 170, 231, 0.05) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          border: "0.2px solid rgba(175, 192, 187, 0.7)",
          boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.3)",
          borderRadius: "100px",
        }}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight orbitron">
                Gloro
              </h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-700/30 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                  placeholder="Search news, games & Tournaments"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2">
              <a
                href="#home"
                className="text-cyan-400 hover:text-cyan-300 px-4 py-2 text-base font-medium transition-colors rounded-lg"
              >
                Home
              </a>
              <a
                href="#tournaments"
                className="text-white hover:text-cyan-400 px-4 py-2 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
              >
                Tournaments
              </a>
              <a
                href="#training"
                className="text-white hover:text-cyan-400 px-4 py-2 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
              >
                Training
              </a>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="text-white hover:text-cyan-400 px-4 py-2 text-base font-medium transition-colors flex items-center space-x-1 rounded-lg hover:bg-white/5"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCategoriesOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsCategoriesOpen(false)}
                    ></div>
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border py-2 z-20 backdrop-blur-md"
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(149, 24, 211, 0.1) 0%, rgba(74, 97, 221, 0.1) 50%, rgba(0, 170, 231, 0.1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                        border: "0.2px solid rgba(175, 192, 187, 0.5)",
                      }}
                    >
                      <a
                        href="#fps"
                        className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                      >
                        FPS Games
                      </a>
                      <a
                        href="#moba"
                        className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                      >
                        MOBA
                      </a>
                      <a
                        href="#battle-royale"
                        className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                      >
                        Battle Royale
                      </a>
                      <a
                        href="#sports"
                        className="block px-4 py-2.5 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                      >
                        Sports
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Side - Notification & Profile */}
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <button className="relative p-2 text-white hover:text-cyan-400 focus:outline-none transition-colors rounded-lg hover:bg-white/5">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Profile Avatar with Gradient Border */}
              <div className="relative">
                <div
                  className="h-12 w-12 rounded-full p-[5px] flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(227.37deg, #6FCCA5 -19.74%, #00C6FF 17.4%, #A218D4 123.81%)",
                  }}
                >
                  <div
                    className="h-full w-full rounded-full flex items-center justify-center text-white font-semibold text-lg cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(90deg, #00C6FF -41.07%, #A218D4 146.43%)",
                    }}
                  >
                    P
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:text-cyan-400 hover:bg-white/5 focus:outline-none transition-colors ml-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-gray-700/30 rounded-xl bg-white/5 backdrop-blur-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                placeholder="Search news, games & Tournaments"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <a
                href="#home"
                className="block text-cyan-400 hover:text-cyan-300 px-4 py-3 text-base font-medium transition-colors rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#tournaments"
                className="block text-white hover:text-cyan-400 px-4 py-3 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tournaments
              </a>
              <a
                href="#training"
                className="block text-white hover:text-cyan-400 px-4 py-3 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Training
              </a>

              {/* Mobile Categories */}
              <div>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between text-white hover:text-cyan-400 px-4 py-3 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-2 ml-4 space-y-1">
                    <a
                      href="#fps"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      FPS Games
                    </a>
                    <a
                      href="#moba"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      MOBA
                    </a>
                    <a
                      href="#battle-royale"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Battle Royale
                    </a>
                    <a
                      href="#sports"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sports
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default CreatorNavbar;
