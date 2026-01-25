import React from "react";
import { Calendar } from "lucide-react";

const Trending = () => {
  // Sample tournament data - duplicate for infinite scroll effect
  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup Registration",
      subtitle: "Open",
      date: "20 Nov 2024",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "FIFA Global Cup Registration",
      subtitle: "Open",
      date: "20 Nov 2024",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "FIFA Global Cup Registration",
      subtitle: "Open",
      date: "20 Nov 2024",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop"
    }
  ];

  // Duplicate tournaments for seamless infinite scroll
  const duplicatedTournaments = [...tournaments, ...tournaments, ...tournaments];

  return (
    <main className="w-full min-h-40 py-12 bg-[#020818] overflow-hidden">
      <h3 className="mb-10 text-3xl font-bold text-white px-4 md:px-8">
        Trending Tournaments
      </h3>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020818] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020818] to-transparent z-10 pointer-events-none"></div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <section className="flex gap-8 pb-4 animate-scroll">
          {duplicatedTournaments.map((tournament, index) => (
            <div
              key={`${tournament.id}-${index}`}
              className="bg-[#00000080] border border-[#CBE1EE80] min-w-[420px] p-4 rounded-xl flex gap-4 justify-center hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              <div className="border border-[#87A1A2] rounded-2xl w-fit overflow-hidden group-hover:border-cyan-400 transition-colors duration-300">
                <div 
                  className="w-[150px] h-[150px] rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"
                >
                  {/* PlayStation-style icon */}
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="opacity-80">
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
              <div className="flex flex-col justify-between py-2">
                <div>
                  <h4 className="text-white font-semibold text-lg leading-tight mb-2">
                    {tournament.title} <br /> {tournament.subtitle}
                  </h4>
                  <p className="text-[14px] text-gray-400 flex items-center gap-2">
                    <Calendar size={14} className="text-cyan-400" />
                    {tournament.date}
                  </p>
                </div>
                <button className="bg-[#020818] text-white px-6 py-2.5 border border-[#1901CA] rounded-3xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 mt-3">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Optional: Scroll indicator */}
      <div className="flex justify-center gap-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse delay-150"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse delay-300"></div>
      </div>
    </main>
  );
};

export default Trending;