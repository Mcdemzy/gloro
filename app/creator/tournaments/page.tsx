"use client";
import React, { useState } from "react";
import {
  Search,
  ArrowLeft,
  Users,
  Calendar,
  Trophy,
  Settings,
  Eye,
  Edit,
} from "lucide-react";

const TournamentManagementApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTournament, setSelectedTournament] = useState(null);

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
    {
      id: 3,
      title: "Valorant Clash",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
      teamsRegistered: 16,
      communities: 3,
      startDate: "5th February, 2026",
      endDate: "20 February, 2026",
      status: "Active",
    },
    {
      id: 4,
      title: "Fortnite Royale Cup",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
      teamsRegistered: 32,
      communities: 8,
      startDate: "1st March, 2026",
      endDate: "15 March, 2026",
      status: "Active",
    },
  ];

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (selectedTournament) {
    return (
      <div className="min-h-screen bg-[#0a1f2e] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button & Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedTournament(null)}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={28} />
            </button>
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
              {selectedTournament.title}
            </h1>
          </div>

          {/* Date & Edit Button */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-400">
              {selectedTournament.startDate} - {selectedTournament.endDate}
            </p>
            <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-semibold transition-all">
              Edit Tournament
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0c3540]/40 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-cyan-400" size={28} />
                <h3 className="text-gray-400">Teams Registered</h3>
              </div>
              <p className="text-4xl font-bold text-white">
                {selectedTournament.teamsRegistered}
              </p>
            </div>

            <div className="bg-[#0c3540]/40 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-cyan-400" size={28} />
                <h3 className="text-gray-400">Tournament Communities</h3>
              </div>
              <p className="text-4xl font-bold text-white">
                {selectedTournament.communities}
              </p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teams Section */}
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Users className="text-purple-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Teams
                </h2>
              </div>
              <p className="text-gray-400 mb-4">
                Manage registered teams, approve applications, and monitor team
                rosters.
              </p>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-semibold">&raquo;</span>
                <span className="text-cyan-400 font-semibold">
                  View & Manage
                </span>
              </div>
            </div>

            {/* Communities Section */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Users className="text-cyan-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Communities
                </h2>
              </div>
              <p className="text-gray-400 mb-4">
                Manage tournament communities, moderators, and community
                settings.
              </p>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-semibold">&raquo;</span>
                <span className="text-cyan-400 font-semibold">
                  View & Manage
                </span>
              </div>
            </div>

            {/* Managers Section */}
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Settings className="text-blue-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  Managers
                </h2>
              </div>
              <p className="text-gray-400 mb-4">
                Add or remove tournament managers and configure their
                permissions.
              </p>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-semibold">&raquo;</span>
                <span className="text-cyan-400 font-semibold">
                  View & Manage
                </span>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/40 backdrop-blur-md border border-teal-500/30 rounded-2xl p-8 hover:border-teal-400/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-teal-500/20 rounded-lg">
                  <Eye className="text-teal-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors">
                  Preview
                </h2>
              </div>
              <p className="text-gray-400 mb-4">
                View the public-facing tournament page as participants will see
                it.
              </p>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-semibold">&raquo;</span>
                <span className="text-cyan-400 font-semibold">
                  View Preview
                </span>
              </div>
            </div>

            {/* Scheduling Section */}
            <div className="w-1/2 bg-gradient-to-br from-orange-900/40 to-orange-950/40 backdrop-blur-md border border-orange-500/30 rounded-2xl p-8 hover:border-orange-400/50 transition-all cursor-pointer group md:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Calendar className="text-orange-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  Scheduling
                </h2>
              </div>
              <p className="text-gray-400 mb-4">
                Manage tournament schedule, playoffs, quarter finals, semi
                finals, and final matches.
              </p>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-semibold">&raquo;</span>
                <span className="text-cyan-400 font-semibold">
                  Manage Schedule
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                onClick={() => setSelectedTournament(tournament)}
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
