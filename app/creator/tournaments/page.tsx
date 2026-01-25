"use client";
import React, { useState } from "react";
import {
  Search,
  Users,
  Calendar,
  Trophy,
  Settings,
  Eye,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const TournamentManagementApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup Colossal Games",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
      teamsRegistered: 18,
      communities: 4,
      startDate: "2nd December, 2025",
      endDate: "28 December, 2025",
      status: "Active",
    },
    {
      id: 2,
      title: "COD: Warzone Master",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      teamsRegistered: 24,
      communities: 6,
      startDate: "15th January, 2026",
      endDate: "30 January, 2026",
      status: "Active",
    },
    // ... other tournaments
  ];

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleManageClick = (tournamentId: number) => {
    router.push(`/creator/tournaments/${tournamentId}`);
  };

  return (
    <div className="min-h-screen bg-[#0a1f2e] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Search */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Hosted Tournaments</h1>

          {/* Search Bar */}
          <div className="relative w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search hosted Tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0c3540] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Tournaments List */}
        <div className="space-y-4">
          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Tournament Image */}
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${tournament.image})` }}
                ></div>

                {/* Tournament Title */}
                <h3 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                  {tournament.title}
                </h3>
              </div>

              {/* Manage Button */}
              <button
                onClick={() => handleManageClick(tournament.id)}
                className="px-6 py-2 bg-[#0c3540] hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 rounded-lg font-semibold transition-all"
              >
                Manage
              </button>
            </div>
          ))}

          {/* Empty State */}
          {filteredTournaments.length === 0 && (
            <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-12 text-center">
              <p className="text-gray-400">
                No tournaments found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentManagementApp;
