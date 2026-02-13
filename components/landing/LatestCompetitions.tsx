import React from "react";
import { Calendar, Users, ArrowRight } from "lucide-react";

const LatestCompetitions = () => {
  const competitions = [
    {
      id: 1,
      title: "FIFA Global Cup",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
      status: "Registration Open",
      statusColor: "bg-green-500",
    },
    {
      id: 2,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "(Creator Icon) Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      status: "Upcoming 🔥",
      statusColor: "bg-purple-500",
    },
    {
      id: 3,
      title: "Valorant Clash",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
      status: "Upcoming 🔥",
      statusColor: "bg-purple-500",
    },
    {
      id: 4,
      title: "Fortnite Royale Cup",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Upcoming 🔥",
      statusColor: "bg-purple-500",
    },
  ];

  return (
    <main className="w-full py-8 sm:py-12 md:py-16 px-4 xs:px-6 sm:px-8 lg:px-12 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white orbitron">
            Latest Tournaments
          </h3>
          <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 group transition-colors self-start sm:self-auto">
            See all
            <ArrowRight
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Competition Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="group bg-gradient-to-b from-[#0a1f3d]/40 to-[#051225]/60 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-xl sm:hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-sm h-full flex flex-col"
              style={{
                border: "1px solid rgba(0, 198, 255, 0.3)",
                boxShadow: "0 0 20px rgba(0, 198, 255, 0.1)",
              }}
            >
              {/* Image - Full width with curved corners */}
              <div className="relative overflow-hidden flex-shrink-0">
                <img
                  src={comp.image}
                  alt={comp.title}
                  className="w-full h-40 xs:h-44 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051225] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 space-y-3 flex-grow flex flex-col">
                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {comp.title}
                </h2>

                {/* Date */}
                <p className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-medium">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {comp.date}
                </p>

                {/* Organizer */}
                <p className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm line-clamp-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{comp.organizer}</span>
                </p>

                {/* Games */}
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                  {comp.games}
                </p>

                {/* Status Badge */}
                <div className="pt-1 sm:pt-2">
                  <span
                    className={`${comp.statusColor} text-white text-xs px-3 py-1 rounded-full font-medium inline-block`}
                  >
                    {comp.status}
                  </span>
                </div>

                {/* Register Button - Pushes to bottom */}
                <div className="pt-3 sm:pt-4 mt-auto">
                  <button
                    className="w-full text-cyan-400 font-semibold py-2 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-cyan-400/10 border border-cyan-400/50 hover:border-cyan-400 text-sm sm:text-base"
                    style={{
                      background: "rgba(0, 198, 255, 0.05)",
                    }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* View All Button for Mobile - Optional */}
        <div className="sm:hidden mt-8 flex justify-center">
          <button className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all text-sm">
            View All Tournaments
          </button>
        </div>
      </div>
    </main>
  );
};

export default LatestCompetitions;