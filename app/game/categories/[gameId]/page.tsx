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
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const GameSpecificPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
  const params = useParams();
  const gameId = params.gameId as string;
  const pathname = usePathname();

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
    { icon: Trophy, label: "Tournaments", href: "/tournaments/hub" },
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

    const filteredTournaments = tournaments.filter((t) => {
      const matchesFilter =
        activeFilter === "All" ? true : t.type === activeFilter;
      return matchesFilter;
    });
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  }

  return (
    <div className="min-h-screen bg-[#020818]">
      <Navbar />
      <div className="flex pt-44">
        {/* Sidebar */}
        <aside className="fixed top-[180px] left-10 h-[400px]">
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
        <main className="flex-1 ml-20">
          <div className="max-w-7xl mx-auto px-8 py-12">
            {/* Header */}
            <div className="text-center mb-24">
              <h1 className="text-6xl font-extrabold text-white mb-4 orbitron">
                {gameTitle}
              </h1>
              <p className="text-[#E0F5FB] font-medium text-xl max-w-4xl mx-auto">
                Explore all ongoing, upcoming and past gaming Tournaments. Join,
                watch or follow your favorite games.
              </p>
            </div>

            {/* Tournaments Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold orbitron text-white">
                  {gameTitle} Tournaments
                </h2>

                {/* Filter Tabs */}
                <div className="flex gap-6 p-1 rounded-xl">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      style={
                        activeFilter === filter
                          ? {
                              background:
                                "linear-gradient(180deg, #0458EA -55.88%, #102D89 22.06%, #151758 61.03%, #180C40 80.51%, #190634 90.26%, #1B0128 100%)",
                            }
                          : {}
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-[#779BA0B2] text-[#FFFFFF] cursor-pointer ${
                        activeFilter === filter ? "" : "bg-[#000A15]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tournament Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mb-12">
                {tournaments.slice(0, visibleCount).map((tournament) => (
                  <div
                    key={tournament.id}
                    className="group border border-[#455872] overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_48px_2px_#0195D9] transition-all duration-300"
                    style={{
                      background: "linear-gradient(to right, #040a1f, #02050e)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-b-2xl border-2 border-[#80A1CE]">
                        <img
                          src={tournament.image}
                          alt={tournament.title}
                          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient overlay at bottom of image */}
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            background:
                              "linear-gradient(to top, #051225, transparent, transparent)",
                          }}
                        />
                      </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-bold text-white transition-colors mb-4">
                        {tournament.title}
                      </h3>

                      <div className="space-y-4">
                        <p className="text-[#02DD6A] font-medium text-lg">
                          Grand Prize: {tournament.prize}
                        </p>
                        <p className="text-[#87A1A2] text-base flex items-center gap-2">
                          <Calendar size={20} className="text-[#87A1A2]" />
                          {tournament.date}
                        </p>
                        <p className="text-[#87A1A2] text-base">
                          {tournament.type}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="w-fit mt-4 mb-6">
                        <span
                          className={`text-base px-4 py-2 rounded-full font-medium inline-flex items-center gap-1 ${
                            tournament.statusType === "registration"
                              ? "bg-[#09362A] border border-[#02DD6A] text-[#02DD6A]"
                              : tournament.statusType === "live"
                                ? "bg-[#260612] border border-[#611B28] text-[#FF6467]"
                                : "bg-[#210626] border border-[#4C1B61] text-[#E864FF]"
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
                        className="w-full bg-[#030D0F] border border-[#71D4F7] hover:bg-cyan-400/10 font-medium py-3 transition-all duration-300 mt-6 text-[#71D4F7] flex item-center justify-center"
                      >
                        {tournament.buttonText}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredTournaments.length && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3 text-[#030411] rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer mt-10"
                    style={{
                      background:
                        "linear-gradient(180deg, #80E3FF 0%, #00C6FF 50%, #00C6FF 75%, #00C6FF 87.5%, #01A3D1 100%)",
                    }}
                  >
                    Load More
                    <ChevronDown size={20} />
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default GameSpecificPage;
