"use client";
import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Download } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const TeamsManagementPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const router = useRouter();
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  const tournamentInfo = {
    title: "FIFA GLOBAL CUP COLOSSAL GAMES",
    startDate: "2nd December, 2025",
    endDate: "28 December, 2025",
  };

  const gameCategories = [
    {
      name: "PUBG",
      teams: 8,
      teamsList: [
        {
          id: "team1",
          name: "RGX",
          members: 4,
          logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
        },
        // ... other teams
      ],
    },
    // ... other game categories
  ];

  const totalTeams = gameCategories.reduce((sum, cat) => sum + cat.teams, 0);

  const handleTeamClick = (teamId: string, gameName: string) => {
    router.push(
      `/creator/tournaments/${tournamentId}/teams/${gameName.toLowerCase()}/${teamId}`,
    );
  };

  const handleBackToTournament = () => {
    router.push(`/creator/tournaments/${tournamentId}`);
  };

  // Team Details View
  if (selectedGame) {
    return (
      <div className="min-h-screen bg-[#0a1f2e] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Tournament Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
              {tournamentInfo.title} | {selectedGame.name} TEAMS
            </h1>
            <p className="text-gray-400">
              {tournamentInfo.startDate} - {tournamentInfo.endDate}
            </p>
          </div>

          {/* Teams Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedGame(null)}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-bold text-white">
              Teams - {selectedGame.name}
            </h2>
          </div>

          {/* Teams List */}
          <div className="space-y-4">
            {selectedGame.teamsList.map((team, index) => (
              <div
                key={index}
                onClick={() => handleTeamClick(team.id, selectedGame.name)}
                className="bg-[#0a1a2e]/60 border border-cyan-500/20 rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Team Logo */}
                  <div
                    className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0 border border-cyan-500/30"
                    style={{ backgroundImage: `url(${team.logo})` }}
                  ></div>

                  {/* Team Info */}
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {team.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {team.members} members
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className="text-purple-400 group-hover:text-purple-300 transition-colors"
                  size={24}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Teams Category View
  return (
    <div className="min-h-screen bg-[#0a1f2e] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Tournament Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
            {tournamentInfo.title}
          </h1>
          <p className="text-gray-400">
            {tournamentInfo.startDate} - {tournamentInfo.endDate}
          </p>
        </div>

        {/* Teams Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToTournament}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white">Teams</h2>
              <p className="text-gray-400 text-sm">
                (Teams are categorized based on the game they registered for)
              </p>
            </div>
          </div>
          <button className="px-6 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-md font-semibold hover:bg-cyan-500/10 transition-all">
            VIP ADD COMING SOON!
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Categories */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            {gameCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedGame(category)}
                className="relative bg-gradient-to-br from-[#1a0a2e]/60 to-[#0f051d]/60 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all cursor-pointer group overflow-hidden"
              >
                {/* Purple ribbon */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute transform -rotate-45 bg-purple-600 text-white text-xs font-semibold py-1 left-[-20px] top-[10px] w-[70px] text-center shadow-lg"></div>
                </div>

                <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{category.teams} Teams</p>
                  <ChevronRight
                    className="text-white group-hover:text-purple-400 transition-colors"
                    size={24}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Sidebar */}
          <div className="bg-gradient-to-br from-[#0c3540]/40 to-[#0a2d36]/40 border border-cyan-500/20 rounded-xl p-6 h-fit">
            <h3 className="text-cyan-400 text-lg font-semibold mb-6">
              Quick Stat
            </h3>

            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-gray-400">Total Teams:</span>
                <span className="text-5xl font-bold text-cyan-400">
                  {totalTeams}
                </span>
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-md font-semibold hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
              <Download size={18} />
              Download/Print all Teams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsManagementPage;
