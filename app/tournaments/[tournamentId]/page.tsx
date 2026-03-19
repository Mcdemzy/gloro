"use client";

import React, { useState } from "react";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  Download,
  Share2,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";

const TournamentDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const params = useParams();
  const tournamentId = params.tournamentId as string;
  const pathname = usePathname();

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

  const images = [
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
  ];

  const tournamentGames = [
    { name: "Dream League", minParticipants: 2, maxParticipants: 6 },
    { name: "Call of Duty Mobile", minParticipants: 3, maxParticipants: 8 },
    { name: "Free Fire", minParticipants: 3, maxParticipants: 12 },
  ];

  const schedules = [
    { date: "Apr 10th - Apr 31st", stage: "Qualifiers" },
    { date: "May 3rd - May 6th", stage: "Group Stage" },
    { date: "May 10th - May 24th", stage: "Semi Final" },
    { date: "June 1st - June 2nd", stage: "Grand Final" },
  ];

  const rules = [
    { game: "PUBG", icon: "📄" },
    { game: "CODM", icon: "📄" },
    { game: "Free Fire", icon: "📄" },
    { game: "Asphalt", icon: "📄" },
  ];

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
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Header Card */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-5 md:p-8 mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-center">
                {tournamentTitle}
              </h1>
              <p className="text-gray-400 text-sm md:text-base text-center mb-1 md:mb-2">
                December 5th, 2025 - December 21st, 2025
              </p>
              <p className="text-red-400 text-sm md:text-base text-center mb-5 md:mb-6">
                Registration closes on December 18th, 2025
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href={`/tournaments/${tournamentId}/registration`}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 text-sm md:text-base text-center"
                >
                  Register Now
                </Link>
                <button className="px-6 md:px-8 py-2.5 md:py-3 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Download size={18} />
                  See Details
                </button>
                <button className="px-6 md:px-8 py-2.5 md:py-3 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-6 md:mb-8">
              {/* Main Image */}
              <div className="mb-3 md:mb-4 rounded-2xl overflow-hidden border border-[#455872] h-52 sm:h-72 md:h-96">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[selectedImage]})` }}
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-300 h-16 sm:h-20 md:h-32 ${
                      selectedImage === index
                        ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
                        : "border-[#455872] hover:border-cyan-400/50"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tournament Games + Schedules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Tournament Games */}
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                  Tournament Games
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {tournamentGames.map((game, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center pb-3 md:pb-4 border-b border-white/10 last:border-0"
                    >
                      <span className="text-white font-medium text-sm md:text-base">
                        {game.name}
                      </span>
                      <div className="flex gap-3 md:gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Min</p>
                          <p className="text-cyan-400 font-bold text-sm md:text-base">
                            {game.minParticipants}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Max</p>
                          <p className="text-cyan-400 font-bold text-sm md:text-base">
                            {game.maxParticipants}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/tournaments/${tournamentId}/registration`}
                  className="w-full mt-5 md:mt-6 px-8 py-2.5 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center text-sm md:text-base"
                >
                  Register Now
                </Link>
              </div>

              {/* Schedules */}
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                  Schedules
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <ChevronRight
                          size={18}
                          className="text-purple-400 shrink-0"
                        />
                        <div>
                          <p className="text-white font-medium text-sm md:text-base">
                            {schedule.date}
                          </p>
                          <p className="text-gray-400 text-xs md:text-sm">
                            {schedule.stage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rules + Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
              {/* Rules */}
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                  Rules
                </h2>
                <div className="space-y-2 md:space-y-3">
                  {rules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-white font-medium text-sm md:text-base">
                        {rule.game}
                      </span>
                      <button className="flex items-center gap-1.5 md:gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        <Download size={16} />
                        <span className="text-xs md:text-sm">
                          Download file
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-4 md:p-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                  Description
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Welcome to the FIFA Global Cup 2025! This event features
                  world-class players competing in an online + LAN hybrid
                  format. The Tournament is designed to showcase skill,
                  strategy, and teamwork at the highest level.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TournamentDetailPage;
