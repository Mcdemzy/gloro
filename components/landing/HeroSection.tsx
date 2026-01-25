import React from "react";
import { ChevronDown, Gamepad2 } from "lucide-react";

const HeroSection = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight tracking-wide mt-40 orbitron">
          THE ULTIMATE <br />
          <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-500 bg-clip-text text-transparent font-extrabold text-6xl md:text-8xl lg:text-9xl">
            GAMING {" "}
          </span>
          <span className="font-extrabold text-6xl md:text-8xl lg:text-9xl text-white">
            PLATFORM
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl font-light text-gray-400 leading-relaxed">
          All your gaming essentials in one place. Tournaments, news, streams
          and community—designed for players and creators.
        </p>

        {/* Animated chevron icon */}
        <div className="my-12 flex justify-center">
          <div className="relative">
            <ChevronDown
              className="text-cyan-400 animate-bounce"
              size={48}
              strokeWidth={2}
            />
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

          <span className="relative flex items-center gap-2">
            <Gamepad2 size={20} />
            See all Tournaments
          </span>
        </button>

        {/* Additional subtle text */}
        <p className="mt-6 text-sm text-gray-500">
          Join thousands of gamers worldwide
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020818] to-transparent"></div>
    </main>
  );
};

export default HeroSection;
