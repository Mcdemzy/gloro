"use client";
import React, { use } from "react";
import { Search } from "lucide-react";
import navbarBG from "@/assets/images/navbarBG.png";
import { usePathname, useRouter } from "next/navigation";


const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Tournaments", href: "/tournaments/hub" },
    { name: "Training", href: "/training" },
    { name: "Categories", href: "/game/categories" },
  ];

  return (
    <div className="max-w-7xl fixed mx-auto top-14 left-0 right-0 z-50">
      <nav
        className="relative py-6 px-16 w-full flex items-center justify-between text-white rounded-[100px] border-[0.2px] border-[#AFC0BBB2] shadow-[0_4px_32px_#0000004D]"
        style={{
          background:
            "linear-gradient(270deg, rgba(149, 24, 211, 1) 0%, rgba(74, 97, 221, 1) 50%, rgba(0, 170, 231, 1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        }}
      >
        <div className="bg-black/65 inset-0 absolute z-0 pointer-events-none left-0 right-0 rounded-[100px]"></div>

        <div className="relative z-10 flex items-center w-full">
          {/* Logo */}
          <div className="shrink-0 relative">
            <h1 className="text-2xl md:text-4xl font-bold text-[#00AAE7] orbitron">
              Gloro
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news, games & Tournaments"
                className="w-full pl-14 py-3.5 px-8 rounded-xl bg-white/10 border border-[#01678B] text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors placeholder:font-normal placeholder:text-sm placeholder:font-[Inter] placeholder:tracking-wide"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 shrink-0">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <li key={link.name}>
            <a
              href={link.href}
              className={`hover:text-cyan-300 transition-colors ${
                isActive
                  ? "text-[#00AAE7] font-semibold text-xl"
                  : "text-[#FFFFFF] font-medium text-base"
              }`}
            >
              {link.name}
            </a>
          </li>
        );
      })}
    </ul>

          {/* Register Button */}
          <div className="shrink-0 ml-8">
            <button
              onClick={() => router.push("/auth/signup")}
              className="relative p-px rounded-full bg-linear-to-bl from-[#6FCCA5] via-[#00C6FF] to-[#A218D4] hover:from-[#6FCCA5] hover:via-[#00C6FF] hover:to-[#A218D4] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer"
            >
              <div className="py-3 rounded-full bg-[#9518D3]">
                <span className="font-bold text-base text-white px-7 py-3.5 rounded-full bg-black/65 tracking-wide">
                  Register Now
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden flex-shrink-0 ml-4">
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
      </nav>
    </div>
  );
};

export default Navbar;
