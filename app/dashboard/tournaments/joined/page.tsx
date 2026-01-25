"use client";
import React, { useState } from "react";
import { Search, AlertTriangle, ChevronDown } from "lucide-react";

const JoinedTournamentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMore, setShowMore] = useState(false);

  const tournaments = [
    {
      id: 1,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      name: "FIFA Mobile FIFA MobileFIFA Mobile",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop"
    }
  ];

  const visibleTournaments = showMore ? tournaments : tournaments.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-white mb-8">Joined Tournaments</h1>

        {/* Profile Warning */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3 mb-8">
          <AlertTriangle size={24} className="text-red-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-red-400 font-semibold mb-1">Profile update required</h3>
            <p className="text-gray-300 text-sm">
              Profile update completion is compulsory before being able to apply for Tournaments.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="text-right mb-2">
              <span className="text-white font-semibold text-sm">Progress</span>
            </div>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Search and Title Section */}
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Joined Tournaments</h2>
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="group cursor-pointer"
              >
                <div
                  className="w-full h-56 rounded-xl bg-cover bg-center mb-3 border border-[#455872] group-hover:border-cyan-400/50 transition-all overflow-hidden"
                  style={{ backgroundImage: `url(${tournament.image})` }}
                ></div>
                <p className="text-white text-sm font-medium mb-3 line-clamp-2">
                  {tournament.name}
                </p>
                <button className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-lg text-sm font-semibold transition-all">
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {tournaments.length > 8 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowMore(!showMore)}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                {showMore ? "Show Less" : "Load More"}
                <ChevronDown size={20} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinedTournamentsPage;