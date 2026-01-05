import React from "react";
import { Search } from "lucide-react";
import navbarBG from "@/assets/images/navbarBG.png";
const Navbar = () => {
  return (
    <div className="w-full px-5 md:px-[130px] pt-5 fixed top-0 left-0 right-0 z-50">
      <nav
        className="min-h-[104px] w-full flex items-center justify-between text-white rounded-[100px] px-8 md:px-12"
        style={{
          background:
            "linear-gradient(270deg, rgba(149, 24, 211, 1) 0%, rgba(74, 97, 221, 1) 50%, rgba(0, 170, 231, 1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          border: "1px solid #AFC0BBB2",
          boxShadow: "0px 4px 32px 0px #0000004D",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <div className="shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent orbitron">
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
              className="w-full h-12 pl-12 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 flex-shrink-0">
          <li>
            <a
              href="#"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Tournaments
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Training
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Categories
            </a>
          </li>
        </ul>

        {/* Register Button */}
        <div className="flex-shrink-0 ml-8">
          <button className="px-8 py-3 rounded-full border border-purple-500 text-white font-medium hover:bg-purple-500/20 transition-all">
            Register Now
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
      </nav>
    </div>
  );
};

export default Navbar;
