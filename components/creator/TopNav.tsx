"use client";
import React from "react";
import { Search, Bell, Home, Trophy, Gamepad2 } from "lucide-react";
import Link from "next/link";

const TopNav = () => {
  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Tournament", href: "/tournaments", icon: Trophy },
    { label: "Categories", href: "/game/categories", icon: Gamepad2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-[73px] bg-[#0c3540]/95 backdrop-blur-md border-b border-cyan-500/20 z-50 px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/creator" className="text-cyan-400 text-2xl font-bold">
          Gloro
        </Link>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-80 pl-12 pr-4 py-2 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
        <button className="relative text-white hover:text-cyan-400 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
          P
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
