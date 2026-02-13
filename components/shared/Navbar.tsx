"use client"
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[130px] pt-4 sm:pt-5 fixed top-0 left-0 right-0 z-50">
      <nav
        className="min-h-[80px] sm:min-h-[90px] md:min-h-[104px] w-full flex items-center justify-between text-white rounded-[50px] md:rounded-[100px] px-4 sm:px-6 md:px-8 lg:px-12"
        style={{
          background:
            "linear-gradient(270deg, rgba(149, 24, 211, 1) 0%, rgba(74, 97, 221, 1) 50%, rgba(0, 170, 231, 1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          border: "1px solid rgba(175, 192, 187, 0.7)",
          boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Logo */}
        <div className="shrink-0">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent orbitron"
            style={{
              backgroundBlendMode: "multiply",
            }}
          >
            Gloro
          </h1>
        </div>

        {/* Search Bar - Tablet and Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news, games & Tournaments"
              className="w-full h-10 md:h-12 pl-10 md:pl-12 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm md:text-base"
            />
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
          <li>
            <a
              href="#"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors text-sm xl:text-base"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors text-sm xl:text-base"
            >
              Tournaments
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors text-sm xl:text-base"
            >
              Training
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors text-sm xl:text-base"
            >
              Categories
            </a>
          </li>
        </ul>

        {/* Register Button - Tablet and Desktop */}
        <div className="hidden md:flex flex-shrink-0 ml-4 lg:ml-8">
          <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-purple-500 text-white font-medium hover:bg-purple-500/20 transition-all text-sm md:text-base">
            Register Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden flex-shrink-0 ml-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 px-4">
            <div 
              className="rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(270deg, rgba(149, 24, 211, 0.95) 0%, rgba(74, 97, 221, 0.95) 50%, rgba(0, 170, 231, 0.95) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                border: "1px solid rgba(175, 192, 187, 0.7)",
                boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)",
                backgroundBlendMode: "multiply",
              }}
            >
              {/* Mobile Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news, games & Tournaments"
                    className="w-full h-12 pl-12 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between text-cyan-400 font-medium hover:text-cyan-300 transition-colors py-2 border-b border-white/10"
                  >
                    <span>Home</span>
                    <span className="text-xs opacity-70">Current</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between text-white/80 hover:text-white transition-colors py-2 border-b border-white/10"
                  >
                    <span>Tournaments</span>
                    <span className="text-xs opacity-70">New</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between text-white/80 hover:text-white transition-colors py-2 border-b border-white/10"
                  >
                    <span>Training</span>
                    <span className="text-xs opacity-70">Free</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between text-white/80 hover:text-white transition-colors py-2 border-b border-white/10"
                  >
                    <span>Categories</span>
                    <span className="text-xs opacity-70">All</span>
                  </a>
                </li>
              </ul>

              {/* Mobile Register Button */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <button className="w-full px-8 py-3 rounded-full border border-purple-500 text-white font-medium hover:bg-purple-500/20 transition-all">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;