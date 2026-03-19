import React from "react";
import { ChevronDown, Gamepad2 } from "lucide-react";
import BgImage from "@/assets/images/Group31.png";

const HeroSection = () => {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden bg-position-[center_10%] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BgImage.src})` }}
    >
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/5 rounded-full blur-3xl"></div>
      </div> */}

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="font-bold text-4xl md:text-7xl leading-tight tracking-wide md:mt-44 mt-10 orbitron">
          THE ULTIMATE <br />
          <span className="bg-linear-to-r from-[#7C3AED] via-[#2F82EE] to-[#00AEEF] bg-clip-text text-transparent font-extrabold text-5xl md:text-8xl mr-2">
            GAMING{" "}
          </span>
          <span className="font-extrabold text-5xl md:text-8xl text-white">
            PLATFORM
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto md:text-lg text-base font-normal text-[#FFFFFFC7] leading-7 tracking-[2%]">
          All your gaming essentials in one place. Tournaments, news, streams
          and community—designed for players and creators.
        </p>

        {/* Animated chevron icon */}
        <div className="my-10 flex justify-center">
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
        <button className="group relative text-lg font-semibold text-white bg-linear-to-b from-[#00FF51] to-[#9EFAAF] rounded-lg shadow-lg hover:shadow-[#9EFAAF]/50 transition-all duration-300 hover:scale-105 overflow-hidden p-px cursor-pointer">
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-20"></div>

          <span className="relative z-10 flex items-center gap-2.5 bg-[#232230] backdrop-blur-sm py-4 px-9 rounded-lg">
            <Gamepad2 size={32} color="#9EF5B4" />
            See all Tournaments
          </span>
        </button>
      </div>
    </main>
  );
};

export default HeroSection;
