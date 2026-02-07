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
    <main className="w-full py-16 px-4 md:px-8 bg-[#020818]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl font-bold text-white orbitron">Latest Tournaments</h3>
          <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 group transition-colors">
            See all
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Competition Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="group bg-gradient-to-b from-[#0a1f3d]/40 to-[#051225]/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
              style={{
                border: "1px solid rgba(0, 198, 255, 0.3)",
                boxShadow: "0 0 30px rgba(0, 198, 255, 0.1)",
              }}
            >
              {/* Image - Full width with curved corners */}
              <div className="relative overflow-hidden">
                <img
                  src={comp.image}
                  alt={comp.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051225] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {comp.title}
                </h2>

                {/* Date */}
                <p className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                  <Calendar size={16} />
                  {comp.date}
                </p>

                {/* Organizer */}
                <p className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users size={16} />
                  {comp.organizer}
                </p>

                {/* Games */}
                <p className="text-sm text-gray-500">{comp.games}</p>

                {/* Status Badge */}
                <div className="pt-2">
                  <span
                    className={`${comp.statusColor} text-white text-xs px-3 py-1 rounded-full font-medium inline-block`}
                  >
                    {comp.status}
                  </span>
                </div>

                {/* Register Button */}
                <div className="pt-2">
                  <button
                    className="w-full text-cyan-400 font-semibold py-3 rounded-xl transition-all duration-300 hover:bg-cyan-400/10 border border-cyan-400/50 hover:border-cyan-400"
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
      </div>
    </main>
  );
};

export default LatestCompetitions;
