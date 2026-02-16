import React from "react";
import { ChevronDown, Gamepad2 } from "lucide-react";
import Image from "next/image";
import HeroBanner from "@/assets/images/hero-banner.png";

const HeroSection = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center overflow-hidden">
      {/* Animated background elements (same as above) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-purple-600/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-purple-700/5 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 sm:pt-20 md:pt-32 lg:pt-40">
          <h1 className="font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight sm:tracking-wide orbitron">
            THE ULTIMATE{" "}
            <span className="block sm:inline">
              <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-500 bg-clip-text text-transparent font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                GAMING{" "}
              </span>
              <span className="font-extrabold text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                PLATFORM
              </span>
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light text-gray-400 leading-relaxed">
            All your gaming essentials in one place. Tournaments, news, streams
            and community—designed for players and creators.
          </p>

          {/* Hero Banner Image - 85% width */}
          <div className="w-[85%] mx-auto mt-12 sm:mt-16 md:mt-20">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9]">
              <Image
                src={HeroBanner}
                alt="Gaming Hero Banner"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 80vw, 1200px"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center px-4 sm:px-0 mt-8 sm:mt-10">
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg sm:rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden w-full max-w-xs sm:max-w-none sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
                See all Tournaments
              </span>
            </button>
          </div>

          

          {/* Additional subtle text */}
          {/* <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
            Join thousands of gamers worldwide
          </p> */}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-[#020818] to-transparent"></div>
    </main>
  );
};

export default HeroSection;