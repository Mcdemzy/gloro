import React from "react";
import { Calendar, Users, ArrowRight, TrendingUp } from "lucide-react";

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
      organizer: "Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      status: "Upcoming",
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
      status: "Upcoming",
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
      status: "Upcoming",
      statusColor: "bg-purple-500",
    },
  ];

  return (
    <main className="w-full py-16 px-4 md:px-8 bg-[#020818]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl font-bold text-white">Latest Tournaments</h3>
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
              className="group bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${comp.image})`,
                    backgroundPosition: "center",
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
                </div>

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`${comp.statusColor} text-white text-sm px-4 py-1.5 rounded-full font-semibold flex items-center gap-2`}
                  >
                    <TrendingUp size={14} />
                    {comp.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {comp.title}
                </h2>

                <div className="space-y-2 text-gray-400">
                  <p className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-cyan-400" />
                    {comp.date}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-cyan-400" />
                    {comp.organizer}
                  </p>
                  <p className="text-sm text-gray-500">{comp.games}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
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
