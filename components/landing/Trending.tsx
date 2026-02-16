"use client";
import React, { useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const Trending = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sample tournament data
  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup",
      subtitle: "Registration Open",
      date: "20 Nov 2024",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Call of Duty Championship",
      subtitle: "Qualifiers Ongoing",
      date: "25 Nov 2024",
      image: "https://images.unsplash.com/photo-1533237264986-2c5c4c01e0b0?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Valorant Pro League",
      subtitle: "Finals Live",
      date: "30 Nov 2024",
      image: "https://images.unsplash.com/photo-1611302586125-43de9a4d5c7c?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      title: "League of Legends Worlds",
      subtitle: "Registration Open",
      date: "5 Dec 2024",
      image: "https://images.unsplash.com/photo-1533237264986-2c5c4c01e0b0?w=400&h=400&fit=crop"
    }
  ];

  // Scroll functions
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust this value based on your card width
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="w-full py-8 sm:py-12 bg-[#020818] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white orbitron text-center sm:text-left">
          Trending Tournaments
        </h3>
        
        {/* Arrow Controls */}
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/5 border border-gray-700/50 hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/5 border border-gray-700/50 hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Manual scroll container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 lg:w-32 bg-gradient-to-r from-[#020818] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 lg:w-32 bg-gradient-to-l from-[#020818] to-transparent z-10 pointer-events-none"></div>

        <style>{`
          /* Hide scrollbar but keep functionality */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <section
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 md:gap-6 pb-4 overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            cursor: 'grab'
          }}
        >
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-[#00000080] border border-[#CBE1EE80] min-w-[280px] xs:min-w-[300px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[380px] xl:min-w-[420px] p-3 sm:p-4 rounded-xl flex gap-3 sm:gap-4 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group flex-shrink-0"
            >
              <div className="border border-[#87A1A2] rounded-xl overflow-hidden flex-shrink-0">
                <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 opacity-80" 
                    viewBox="0 0 24 24" 
                    fill="none"
                  >
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="url(#grad)" opacity="0.3"/>
                    <path d="M12 2V22M2 7L22 17M22 7L2 17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="grad" x1="2" y1="2" x2="22" y2="22">
                        <stop offset="0%" stopColor="#8B5CF6"/>
                        <stop offset="100%" stopColor="#06B6D4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col justify-between py-1 flex-grow min-w-0">
                <div className="min-w-0">
                  <h4 className="text-white font-semibold text-sm xs:text-base sm:text-lg md:text-xl leading-tight truncate">
                    {tournament.title}
                  </h4>
                  <p className="text-xs xs:text-sm sm:text-base text-cyan-400 mb-1 sm:mb-2 truncate">
                    {tournament.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 sm:gap-2 truncate">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                    {tournament.date}
                  </p>
                </div>
                <button className="bg-[#020818] text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm border border-[#1901CA] rounded-3xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 mt-2 sm:mt-3 whitespace-nowrap">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Simple scroll indicator */}
      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400"
          ></div>
        ))}
      </div>

      {/* View all button */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <button className="px-6 py-2.5 sm:px-8 sm:py-3 border border-purple-500 text-white rounded-full hover:bg-purple-500/20 transition-all text-sm sm:text-base">
          View All Tournaments
        </button>
      </div>
    </main>
  );
};

export default Trending;