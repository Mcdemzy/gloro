import React from "react";
import { Calendar, Users, ArrowRight } from "lucide-react";

const LatestCompetitions = () => {
  const competitions = [
    {
      id: 1,
      title: "FIFA Global Cup",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "• PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
      status: "Registration Open",
      bgStatusColor: "bg-[#09362A]",
      borderStatusColor: "#02DD6A",
    },
    {
      id: 2,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "(Creator Icon) Creator's Creator Name",
      games: "• PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      status: "Upcoming  △",
      bgStatusColor: "bg-[#210626]",
      borderStatusColor: "#4C1B61",
    },
    {
      id: 3,
      title: "Valorant Clash",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "• PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
      status: "Upcoming  △",
      bgStatusColor: "bg-[#4C1B61]",
      borderStatusColor: "#4C1B61",
    },
    {
      id: 4,
      title: "Fortnite Royale Cup",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "• PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Upcoming  △",
      bgStatusColor: "bg-[#210626]",
      borderStatusColor: "#4C1B61",
    },
  ];

  return (
    <main className="w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-12">
          <h3 className="text-base md:text-2xl font-semibold md:font-bold text-white orbitron">
            Latest Tournaments
          </h3>
          <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 group transition-colors cursor-pointer">
            See all
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Competition Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="group bg-linear-to-r from-[#040a1f] to-[#02050e] overflow-hidden transition-all duration-300 backdrop-blur-sm border border-[#455872] hover:shadow-[0_0_48px_2px_#0195D9]"
            >
              {/* Image - Full width with curved corners */}
              <div className="relative overflow-hidden rounded-b-2xl border-2 border-[#80A1CE]">
                <img
                  src={comp.image}
                  alt={comp.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-linear-to-t from-[#051225] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-white transition-colors orbitron">
                  {comp.title}
                </h2>

                {/* Date */}
                <p className="flex items-center gap-2 text-[#02DD6A] text-base md:text-lg font-medium">
                  <Calendar size={16} />
                  {comp.date}
                </p>

                {/* Organizer */}
                <p className="flex items-center gap-2 text-[#87A1A2] text-sm md:text-base">
                  <Users size={20} />
                  {comp.organizer}
                </p>

                {/* Games */}
                <p className="text-sm md:text-base text-[#87A1A2]">{comp.games}</p>

                {/* Status Badge */}
                <div className="pt-2">
                  <span
                    className={`${comp.bgStatusColor} text-[${comp.borderStatusColor}] border border-[${comp.borderStatusColor}] text-sm md:text-base px-4 py-2 rounded-full font-medium inline-block`}
                  >
                    {comp.status}
                  </span>
                </div>

                {/* Register Button */}
                <div className="mt-10 px-14">
                  <button className="w-full text-[#71D4F7] font-medium py-3 rounded-sm transition-all duration-300 hover:bg-cyan-400/10 border border-[#71D4F7] cursor-pointer hover:border-cyan-400 bg-[#030D0F]">
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
