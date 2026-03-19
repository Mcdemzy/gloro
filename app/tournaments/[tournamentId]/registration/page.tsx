"use client";

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
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";

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

  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const tournamentId = params.tournamentId as string;

  const tournamentTitles: Record<string, string> = {
    "dream-league-abeokuta": "Dream League Abeokuta",
    "dream-league-unilorin": "Dream League Unilorin",
    "dream-league-ibadan": "Dream League Ibadan",
    "osun-fuo-dream-league": "Osun FUO Dream League",
    "diamond-yearly-tournament": "Diamond yearly Tournament",
    "golden-era-tournament": "Golden Era Tournament",
  };

  const tournamentTitle = tournamentTitles[tournamentId] || "Tournament";

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Tournaments", href: "/tournaments/hub" },
    { icon: Gamepad2, label: "Games", href: "/game/categories" },
    { icon: Users, label: "Community", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const games: Game[] = [
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

  const teams: Team[] = [
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
    if (currentStep === "team-selection") {
      setCurrentStep("game-selection");
      setSelectedGame(null);
      setSelectedTeam(null);
    } else {
      router.push(`/tournaments/${tournamentId}`);
    }
  };

  const handleContinue = () => {
    if (selectedTeam) setShowSuccessModal(true);
  };

  const handleGoToHomepage = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  const handleGoToCommunity = () => {
    setShowSuccessModal(false);
    router.push("/community");
  };

  return (
    <div className="min-h-screen bg-[#020818]">
      <Navbar />

      <div className="pt-32 md:pt-44">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block fixed top-[180px] left-10 h-[400px]">
          <div className="relative w-16 h-[400px]">
            <Image
              src={rectangle}
              alt="Side Profile"
              className="w-full h-full opacity-80"
              fill
            />
            <div className="absolute inset-0 flex flex-col items-center space-y-8 pt-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative last:pt-16 ${
                      isActive
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                        : "text-gray-400 hover:text-cyan-400"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="absolute left-full ml-4 px-3 py-2 bg-[#1a1d2e] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-purple-500/20">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Breadcrumb */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                <button
                  onClick={handleBack}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base cursor-pointer"
                >
                  <ChevronRight size={18} className="rotate-180" />
                  <span className="truncate max-w-[140px] sm:max-w-none">
                    {tournamentTitle}
                  </span>
                </button>
                <ChevronRight size={16} />
                <span className="text-white font-medium text-sm md:text-base">
                  Register
                </span>
              </div>
            </div>

            {/* Game Selection */}
            {currentStep === "game-selection" && (
              <div className="space-y-4 md:space-y-6">
                {/* Importance Notice */}
                <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <AlertCircle
                      size={22}
                      className="text-yellow-400 shrink-0"
                    />
                    <h2 className="text-lg md:text-xl font-bold text-yellow-400">
                      IMPORTANCE ⚠️
                    </h2>
                  </div>
                  <h3 className="text-green-400 font-semibold mb-2 md:mb-3 text-sm md:text-base">
                    Note these before you continue
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>Only Team creator can apply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>
                        Before you can be allowed to register, all your team
                        members need to have set config for the game you want to
                        register for
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Game Selection Card */}
                <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-5 md:p-8">
                  <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                    Choose the Game you want to Register for
                  </h2>

                  <div className="space-y-3 md:space-y-4">
                    {games.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => handleGameSelect(game)}
                        className={`w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 border-2 cursor-pointer ${
                          selectedGame?.id === game.id
                            ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30"
                            : "bg-white/5 border-[#455872] hover:border-cyan-400/50 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-cover bg-center shrink-0"
                          style={{ backgroundImage: `url(${game.image})` }}
                        />
                        <span className="text-white text-base md:text-lg font-medium">
                          {game.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Team Selection */}
            {currentStep === "team-selection" && (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-5 md:p-8">
                  <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                    Choose a Team
                  </h2>

                  <div className="space-y-3 md:space-y-4">
                    {teams.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => handleTeamSelect(team)}
                        className={`w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 border-2 cursor-pointer ${
                          selectedTeam?.id === team.id
                            ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30"
                            : "bg-white/5 border-[#455872] hover:border-cyan-400/50 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-cover bg-center shrink-0"
                          style={{ backgroundImage: `url(${team.image})` }}
                        />
                        <div className="flex flex-col items-start">
                          <span className="text-white text-base md:text-lg font-medium">
                            {team.name}
                          </span>
                          <span className="text-gray-400 text-xs md:text-sm">
                            {team.members} members
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
                    <button
                      onClick={handleBack}
                      className="flex-1 px-4 md:px-8 py-2.5 md:py-3 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinue}
                      disabled={!selectedTeam}
                      className={`flex-1 px-4 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                        selectedTeam
                          ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer"
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
      </div>

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative bg-linear-to-br from-[#0a1628] to-[#0d2137] border-2 border-cyan-400/30 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl shadow-cyan-500/20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="mb-5 md:mb-6 flex justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
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
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 md:mb-3 orbitron">
                Tournament Registration
                <br />
                Successful
              </h2>
              <p className="text-gray-400 mb-6 md:mb-8 text-xs md:text-sm">
                You have successfully registered for {tournamentTitle}!
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleGoToHomepage}
                  className="w-full px-8 py-2.5 md:py-3 bg-[#00628D] hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 text-sm md:text-base cursor-pointer"
                >
                  Go to Homepage
                </button>
                <button
                  onClick={handleGoToCommunity}
                  className="w-full px-8 py-2.5 md:py-3 bg-transparent border border-[#00628D] text-white hover:bg-cyan-400/10 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base cursor-pointer"
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
