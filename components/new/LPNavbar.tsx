"use client";
import React, { useState, useEffect } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png"; // Import logo directly

const LPNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="relative mx-4 lg:mx-auto max-w-[1459px] px-6 sm:px-10 lg:px-[69px]">
          {/* Blur Background Container */}
          <div
            className={`absolute inset-0 transition-all duration-300 rounded-2xl lg:rounded-full`}
            style={{
              background: scrolled
                ? "linear-gradient(270deg, rgba(149, 24, 211, 0.2) 0%, rgba(74, 97, 221, 0.2) 50%, rgba(0, 170, 231, 0.2) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))"
                : "linear-gradient(270deg, rgba(149, 24, 211, 0.1) 0%, rgba(74, 97, 221, 0.1) 50%, rgba(0, 170, 231, 0.1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
              border: "0.5px solid rgba(175, 192, 187, 0.4)",
              boxShadow: scrolled 
                ? "0px 8px 32px 0px rgba(0, 0, 0, 0.5)" 
                : "0px 4px 32px 0px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          ></div>

          {/* Navbar Content */}
          <div className="relative w-full py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Using imported image */}
              <div className="flex-shrink-0">
                <Image 
                  src={Logo} 
                  alt="Gloroq Logo" 
                  width={140} // Adjust based on your logo size
                  height={50} // Adjust based on your logo size
                  className="h-auto w-auto"
                  priority
                />
              </div>

              {/* Desktop Search Bar */}
              <div className="hidden lg:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-700/30 rounded-xl bg-white/5 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    placeholder="Search news, games & Tournaments"
                  />
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-2">
                <a
                  href="#home"
                  className="text-cyan-400 hover:text-cyan-300 px-4 py-2.5 text-base font-medium transition-colors rounded-lg"
                >
                  Home
                </a>
                <a
                  href="#tournaments"
                  className="text-white hover:text-cyan-400 px-4 py-2.5 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  Tournaments
                </a>
                <a
                  href="#training"
                  className="text-white hover:text-cyan-400 px-4 py-2.5 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  Training
                </a>

                {/* Categories Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="text-white hover:text-cyan-400 px-4 py-2.5 text-base font-medium transition-colors flex items-center space-x-1 rounded-lg hover:bg-white/5"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isCategoriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isCategoriesOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsCategoriesOpen(false)}
                      ></div>
                      <div
                        className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border py-2 z-20"
                        style={{
                          background: "rgba(10, 10, 15, 0.95)",
                          border: "0.5px solid rgba(175, 192, 187, 0.3)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                        }}
                      >
                        <a
                          href="#fps"
                          className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                        >
                          FPS Games
                        </a>
                        <a
                          href="#moba"
                          className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                        >
                          MOBA
                        </a>
                        <a
                          href="#battle-royale"
                          className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                        >
                          Battle Royale
                        </a>
                        <a
                          href="#sports"
                          className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                        >
                          Sports
                        </a>
                      </div>
                    </>
                  )}
                </div>

                {/* Desktop Register Button */}
                <div
                  className="ml-2 rounded-full p-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(227.37deg, #6FCCA5 -19.74%, #00C6FF 17.4%, #A218D4 123.81%)",
                  }}
                >
                  <button className="px-6 py-2.5 rounded-full bg-black/50 text-white font-medium text-base hover:bg-black/70 transition-all duration-300 whitespace-nowrap">
                    Register Now
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-lg text-white hover:text-cyan-400 hover:bg-white/5 focus:outline-none transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Sidebar */}
          <div
            className="fixed right-0 top-0 h-full w-[320px] sm:w-[380px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(10, 10, 15, 0.98)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderLeft: "1px solid rgba(175, 192, 187, 0.15)",
              boxShadow: "-8px 0 32px 0 rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Sidebar Header - Replace text with logo here too */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Image 
                src={Logo} 
                alt="Gloroq Logo" 
                width={100} // Smaller size for mobile sidebar
                height={35}
                className="h-auto w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-white hover:text-cyan-400 hover:bg-white/5 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Rest of your sidebar content remains the same */}
            <div className="p-6 space-y-6">
              {/* Mobile Search Bar */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 border border-gray-700/30 rounded-xl bg-white/5 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                  placeholder="Search news, games & Tournaments"
                />
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <a
                  href="#home"
                  className="block text-cyan-400 hover:text-cyan-300 px-4 py-3.5 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#tournaments"
                  className="block text-white hover:text-cyan-400 px-4 py-3.5 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tournaments
                </a>
                <a
                  href="#training"
                  className="block text-white hover:text-cyan-400 px-4 py-3.5 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Training
                </a>
              </div>

              {/* Mobile Categories */}
              <div>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between text-white hover:text-cyan-400 px-4 py-3.5 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-2 ml-4 space-y-1">
                    <a
                      href="#fps"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-3 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      FPS Games
                    </a>
                    <a
                      href="#moba"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-3 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      MOBA
                    </a>
                    <a
                      href="#battle-royale"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-3 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Battle Royale
                    </a>
                    <a
                      href="#sports"
                      className="block text-gray-400 hover:text-cyan-400 px-4 py-3 text-sm transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sports
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Register Button */}
              <div className="pt-4">
                <div
                  className="rounded-full p-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(227.37deg, #6FCCA5 -19.74%, #00C6FF 17.4%, #A218D4 123.81%)",
                  }}
                >
                  <button
                    className="w-full px-6 py-4 rounded-full bg-black/50 text-white font-medium text-base hover:bg-black/70 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default LPNavbar;