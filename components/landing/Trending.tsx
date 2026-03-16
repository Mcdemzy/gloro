import React from "react";
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

  return (
    <main className="w-full min-h-40 py-12 overflow-hidden">
      <h3 className="mb-10 text-2xl font-bold text-white max-w-7xl mx-auto orbitron tracking-[0%] leading-[100%]">
        Trending Tournaments
      </h3>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020818] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020818] to-transparent z-10 pointer-events-none"></div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
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
              className="bg-[#00000080] border border-[#CBE1EE80] min-w-[420px] p-4 rounded-xl flex gap-4 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="overflow-hidden shrink-0 group-hover:border-cyan-400 transition-colors duration-300 my-auto">
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
                  <h4 className="text-white font-bold text-lg text-nowrap leading-tight">
                    {tournament.title}
                  </h4>
                  <p className="font-bold text-lg text-white leading-">
                    {tournament.subtitle}
                  </p>
                  <p className="text-[14px] text-gray-400 flex items-center gap-2 mt-1">
                    <Calendar size={14} className="text-cyan-400" />
                    {tournament.date}
                  </p>
                </div>

                {/* Register Now Button */}
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
        </section>
      </div>
    </main>
  );
};

export default Trending;
