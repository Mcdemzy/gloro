"use client"
import React, { useState } from "react";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface Game {
  id: string;
  name: string;
  image: string;
}

interface Team {
  id: string;
  name: string;
  members: number;
  image: string;
}

const TournamentRegistration = () => {
  const [currentStep, setCurrentStep] = useState<
    "game-selection" | "team-selection"
  >("game-selection");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Trophy, label: "Tournaments", href: "#", active: true },
    { icon: Gamepad2, label: "Games", href: "#" },
    { icon: Users, label: "Community", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const games = [
    {
      id: "dream-league",
      name: "Dream League",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
    },
    {
      id: "call-of-duty",
      name: "Call of Duty Mobile",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    },
    {
      id: "free-fire",
      name: "FreeFire",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
    },
  ];

  const teams = [
    {
      id: "night-owls",
      name: "Night Owls",
      members: 6,
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop",
    },
    {
      id: "dreamer-leagues-1",
      name: "Dreamer Leagues",
      members: 10,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    },
    {
      id: "dreamer-leagues-2",
      name: "Dreamer Leagues",
      members: 7,
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop",
    },
    {
      id: "elites-triads",
      name: "The Elites Triads",
      members: 12,
      image:
        "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200&h=200&fit=crop",
    },
  ];

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentStep("team-selection");
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleBack = () => {
    setCurrentStep("game-selection");
    setSelectedGame(null);
    setSelectedTeam(null);
  };

  const handleContinue = () => {
    if (selectedTeam) {
      setShowSuccessModal(true);
    }
  };

  const handleGoToHomepage = () => {
    setShowSuccessModal(false);
    // Navigate to homepage
    console.log("Navigate to homepage");
  };

  const handleGoToCommunity = () => {
    setShowSuccessModal(false);
    // Navigate to community
    console.log("Navigate to community");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 bg-[#1a1d2e]/80 backdrop-blur-md border-r border-purple-500/20 flex flex-col items-center py-8 z-50">
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>

        <div className="space-y-6">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative ${
                  item.active
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-400"
                }`}
              >
                <Icon size={22} />
                <span className="absolute left-full ml-4 px-3 py-2 bg-[#1a1d2e] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-purple-500/20">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 text-gray-400 mb-6">
              <button
                onClick={handleBack}
                className="hover:text-cyan-400 transition-colors"
              >
                Dream League Abeokuta
              </button>
              <ChevronRight size={20} />
              <span className="text-white font-medium">Register</span>
            </div>
          </div>

          {/* Game Selection View */}
          {currentStep === "game-selection" && (
            <div className="space-y-6">
              {/* Importance Notice */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle size={24} className="text-yellow-400" />
                  <h2 className="text-xl font-bold text-yellow-400">
                    IMPORTANCE ⚠️
                  </h2>
                </div>
                <h3 className="text-green-400 font-semibold mb-3">
                  Note these before you continue
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Only Team creator can apply</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>
                      Before you can be allowed to register, all your team
                      members need to have set config for the game you want to
                      register for
                    </span>
                  </li>
                </ul>
              </div>

              {/* Game Selection */}
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Choose the Game you want to Register for
                </h2>

                <div className="space-y-4">
                  {games.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => handleGameSelect(game)}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all duration-300 border-2 ${
                        selectedGame?.id === game.id
                          ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30"
                          : "bg-white/5 border-[#455872] hover:border-cyan-400/50 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className="w-16 h-16 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${game.image})` }}
                      ></div>
                      <span className="text-white text-lg font-medium">
                        {game.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Selection View */}
          {currentStep === "team-selection" && (
            <div className="space-y-6">
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Choose a Team
                </h2>

                <div className="space-y-4">
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleTeamSelect(team)}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all duration-300 border-2 ${
                        selectedTeam?.id === team.id
                          ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30"
                          : "bg-white/5 border-[#455872] hover:border-cyan-400/50 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className="w-16 h-16 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${team.image})` }}
                      ></div>
                      <div className="flex flex-col items-start">
                        <span className="text-white text-lg font-medium">
                          {team.name}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {team.members} members
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleBack}
                    className="flex-1 px-8 py-3 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={!selectedTeam}
                    className={`flex-1 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedTeam
                        ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/50"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0d2137] border-2 border-cyan-400/30 rounded-3xl p-12 max-w-lg w-full shadow-2xl shadow-cyan-500/20">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-3">
                Tournament Registration
                <br />
                Successful
              </h2>

              {/* Subtitle */}
              <p className="text-gray-400 mb-8 text-sm">
                You have successfully registered for the tournament!
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleGoToHomepage}
                  className="w-full px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  Go to Homepage
                </button>
                <button
                  onClick={handleGoToCommunity}
                  className="w-full px-8 py-3 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all duration-300"
                >
                  Go to Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentRegistration;
