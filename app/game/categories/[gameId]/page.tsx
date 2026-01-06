"use client";

import React, { useState } from "react";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  ChevronDown,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const GameSpecificPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const params = useParams();
  const gameId = params.gameId as string;

  // Map game slugs to titles
  const gameTitles: Record<string, string> = {
    "fifa-mobile": "FIFA Mobile",
    "call-of-duty-mobile": "Call Of Duty - Mobile",
    "free-fire": "Free Fire",
    "dream-league": "Dream League",
    "god-of-guns": "God of Guns - The Crossfade & Diners",
  };

  const gameTitle = gameTitles[gameId] || "Game";

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Tournaments", href: "/tournaments" },
    { icon: Gamepad2, label: "Games", href: "/game/categories", active: true },
    { icon: Users, label: "Community", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const filters = ["All", "Ongoing", "Upcoming", "Past"];

  const tournaments = [
    {
      id: 1,
      slug: "dream-league-abeokuta",
      title: "Dream League Abeokuta",
      prize: "$115,000",
      date: "Sep 02 • Oct 16",
      type: "Online",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Registration Open",
      statusType: "registration",
      buttonText: "Learn More",
    },
    {
      id: 2,
      slug: "dream-league-unilorin",
      title: "Dream League Unilorin",
      prize: "$75,000",
      date: "Jun 15 • Jul 22",
      type: "LAN Event",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Learn More",
    },
    {
      id: 3,
      slug: "dream-league-ibadan",
      title: "Dream League Ibadan",
      prize: "$25,000",
      date: "Jul 25 • Aug 12",
      type: "Regional Qualifiers",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Upcoming",
      statusType: "upcoming",
      buttonText: "Learn More",
    },
    {
      id: 4,
      slug: "osun-fuo-dream-league",
      title: "Osun FUO Dream League",
      prize: "$115,000",
      date: "Sep 02 • Oct 16",
      type: "Online",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Upcoming",
      statusType: "upcoming",
      buttonText: "Learn More",
    },
    {
      id: 5,
      slug: "diamond-yearly-tournament",
      title: "Diamond yearly Tournament",
      prize: "$115,000",
      date: "Sep 02 • Oct 16",
      type: "Online",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Upcoming",
      statusType: "upcoming",
      buttonText: "Learn More",
    },
    {
      id: 6,
      slug: "golden-era-tournament",
      title: "Golden Era Tournament",
      prize: "$115,000",
      date: "Sep 02 • Oct 16",
      type: "Online",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Upcoming",
      statusType: "upcoming",
      buttonText: "Learn More",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 bg-[#1a1d2e]/80 backdrop-blur-md border-r border-purple-500/20 flex flex-col items-center py-8 z-50">
        {/* Decorative line */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>

        <div className="space-y-6">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative ${
                  item.active
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-400"
                }`}
              >
                <Icon size={22} />
                {/* Tooltip */}
                <span className="absolute left-full ml-4 px-3 py-2 bg-[#1a1d2e] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-purple-500/20">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">{gameTitle}</h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Explore all ongoing, upcoming and past gaming Tournaments. Join,
              watch or follow your favorite games.
            </p>
          </div>

          {/* Tournaments Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                {gameTitle} Tournaments
              </h2>

              {/* Filter Tabs */}
              <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Tournament Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="group bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${tournament.image})` }}
                    >
                      {/* Overlay with FORTNITE text effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/60 via-orange-600/40 to-[#0a1628] flex items-start justify-center pt-8">
                        <div
                          className="text-white text-6xl font-black tracking-wider opacity-90"
                          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
                        >
                          FORTNITE
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {tournament.title}
                    </h3>

                    <div className="space-y-2 text-sm">
                      <p className="text-green-400 font-bold text-lg">
                        Grand Prize: {tournament.prize}
                      </p>
                      <p className="text-gray-400 flex items-center gap-2">
                        <Calendar size={14} className="text-cyan-400" />
                        {tournament.date}
                      </p>
                      <p className="text-gray-500 text-xs">{tournament.type}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1 ${
                          tournament.statusType === "registration"
                            ? "bg-green-500/20 text-green-400"
                            : tournament.statusType === "live"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {tournament.statusType === "live" && "● "}
                        {tournament.statusType === "upcoming" && (
                          <TrendingUp size={12} />
                        )}
                        {tournament.status}
                      </span>
                    </div>

                    <Link
                      href={`/tournaments/${tournament.slug}`}
                      className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 mt-3 flex items-center justify-center"
                    >
                      {tournament.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50">
                Load More
                <ChevronDown size={20} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GameSpecificPage;
