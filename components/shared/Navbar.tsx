"use client";
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Tournaments", href: "/tournaments/hub" },
    { name: "Training", href: "/training" },
    { name: "Categories", href: "/game/categories" },
  ];

  return (
    <>
      <div className="max-w-7xl fixed mx-auto md:top-14 top-0 left-0 right-0 z-50">
        <nav
          className="relative py-6 md:px-12 lg:px-16 px-8 w-full flex items-center justify-between text-white md:rounded-[100px] rounded-none md:border-[0.2px] border-0 border-[#AFC0BBB2] shadow-[0_4px_32px_#0000004D]"
          style={{
            background:
              "linear-gradient(270deg, rgba(149, 24, 211, 1) 0%, rgba(74, 97, 221, 1) 50%, rgba(0, 170, 231, 1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          }}
        >
          <div className="bg-black/65 inset-0 absolute z-0 pointer-events-none left-0 right-0 md:rounded-[100px] rounded-none"></div>

          <div className="relative z-10 flex items-center justify-between w-full">
            {/* Logo */}
            <div className="shrink-0 relative">
              <h1 onClick={() => {router.push("/")}} className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00AAE7] orbitron cursor-pointer">
                GloroQ
              </h1>
            </div>

            {/* Search Bar — desktop only */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news, games & Tournaments"
                  className="w-full pl-11 py-3 px-4 rounded-xl bg-white/10 border border-[#01678B] text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors placeholder:font-normal placeholder:text-sm placeholder:font-[Inter] placeholder:tracking-wide"
                />
              </div>
            </div>

            {/* Navigation Links — desktop only */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`hover:text-cyan-300 transition-colors ${
                        isActive
                          ? "text-[#00AAE7] font-semibold text-lg lg:text-xl"
                          : "text-[#FFFFFF] font-medium text-sm lg:text-base"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Register Button — desktop only */}
            <div className="hidden md:block shrink-0 ml-8">
              <button
                onClick={() => router.push("/auth/signup")}
                className="relative p-px rounded-full bg-linear-to-bl from-[#6FCCA5] via-[#00C6FF] to-[#A218D4] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer"
              >
                <div className="py-3 rounded-full bg-[#9518D3]">
                  <span className="font-bold text-base text-white px-7 py-3.5 rounded-full bg-black/65 tracking-wide">
                    Register Now
                  </span>
                </div>
              </button>
            </div>

            {/* Mobile right side: search icon + hamburger */}
            <div className="md:hidden flex items-center justify-between gap-2 ml-auto">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news, games & Tournaments"
                  className="w-full pl-10 py-2 px-4 rounded-xl bg-white/10 border border-[#01678B] text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors placeholder:font-normal placeholder:text-sm placeholder:font-[Inter] placeholder:tracking-wide"
                />
              </div>
              <button
                className="text-white shrink-0 cursor-pointer"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-fit w-72 z-101 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(178, 139, 179, 0.2) 0%, rgba(144, 168, 168, 0.2) 100%)",
          backdropFilter: "blur(20px)",
          borderRight: "0.5px solid rgba(175, 192, 187, 0.3)",
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6">
          <h2 className="text-white text-2xl font-bold tracking-wide">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col gap-1 px-6">
          {links
            .filter((l) => l.name !== "Home")
            .map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-4 text-center text-base font-medium transition-colors ${
                      isActive
                        ? "text-[#00AAE7] font-semibold"
                        : "text-white/80 hover:text-cyan-300"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
        </ul>

        {/* Register Button */}
        <div className="pt-6 mt-4 pb-20 border-t border-[#989898] mx-6">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              router.push("/auth/signup");
            }}
            className="relative p-px rounded-full bg-linear-to-bl from-[#6FCCA5] via-[#00C6FF] to-[#A218D4] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer w-full"
          >
            <div className="py-3 rounded-full bg-[#2F3243]">
              <span className="font-bold text-base text-white tracking-wide">
                Register Now
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
