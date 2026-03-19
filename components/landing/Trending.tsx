"use client";
import React, { useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import PSImage from "@/assets/images/PS.png";

const Trending = () => {
  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup Registration",
      subtitle: "Open",
      date: "20 Nov 2024",
      image: PSImage,
    },
    {
      id: 2,
      title: "FIFA Global Cup Registration",
      subtitle: "Open",
      date: "20 Nov 2024",
      image: PSImage,
    },
    {
      id: 3,
      title: "FIFA Global Cup Registration",
      subtitle: "Open",
      date: "20 Nov 2024",
      image: PSImage,
    },
  ];

  const duplicatedTournaments = [
    ...tournaments,
    ...tournaments,
    ...tournaments,
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const SPEED = 0.6;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getLoopWidth = () => container.scrollWidth / 3;

    const tick = () => {
      if (!isHoveredRef.current) {
        posRef.current += SPEED;
        const loopWidth = getLoopWidth();
        if (posRef.current >= loopWidth) {
          posRef.current -= loopWidth;
        }
        container.scrollLeft = posRef.current;
      } else {
        // While hovered, keep posRef in sync with native scroll
        posRef.current = container.scrollLeft;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <main className="w-full min-h-40 py-12 overflow-hidden">
      <h3 className="mb-10 text-base md:text-2xl font-bold text-white max-w-7xl mx-auto orbitron tracking-[0%] leading-[100%] px-6">
        Trending Tournaments
      </h3>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#020818] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#020818] to-transparent z-10 pointer-events-none" />

        {/* Scrollable container — overflow-x-scroll enables native trackpad/touch scroll */}
        <div
          ref={containerRef}
          className="flex gap-8 pb-4 overflow-x-scroll"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE */,
          }}
        >
          {/* Hide webkit scrollbar */}
          <style>{`
            .trending-track::-webkit-scrollbar { display: none; }
          `}</style>

          {duplicatedTournaments.map((tournament, index) => (
            <div
              key={`${tournament.id}-${index}`}
              className="bg-[#00000080] border border-[#CBE1EE80] min-w-[420px] shrink-0 p-4 rounded-xl flex gap-4 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="overflow-hidden shrink-0 my-auto">
                <Image
                  src={tournament.image}
                  alt={tournament.title}
                  width={120}
                  height={120}
                  className="object-cover w-[120px] h-[120px]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between py-2">
                <div className="flex flex-col gap-1">
                  <h4 className="text-white font-bold text-base md:text-lg text-nowrap leading-tight">
                    {tournament.title}
                  </h4>
                  <p className="font-bold text-base md:text-lg text-white leading-snug">
                    {tournament.subtitle}
                  </p>
                  <p className="text-[14px] text-gray-400 flex items-center gap-2 mt-1">
                    <Calendar size={14} className="text-cyan-400" />
                    {tournament.date}
                  </p>
                </div>

                <button className="relative p-px rounded-full bg-linear-to-r from-[#00C6FF] to-[#1901CA] mt-3 w-fit cursor-pointer hover:shadow-[0_0_16px_rgba(0,198,255,0.6)] transition-all duration-300">
                  <div className="px-6 py-2.5 rounded-full bg-[#020818] hover:bg-[#020818]/80 transition-colors duration-300">
                    <span className="font-semibold text-sm text-white whitespace-nowrap">
                      Register Now
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Trending;
