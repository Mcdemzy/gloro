"use client"
import React, { useState } from "react";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  Calendar,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

const TournamentsHubPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const sidebarItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Trophy, label: "Tournaments", href: "#", active: true },
    { icon: Gamepad2, label: "Games", href: "#" },
    { icon: Users, label: "Community", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const topCategories = [
    "Call of Duty",
    "FIFA",
    "Valorant Clash",
    "Asphalt",
    "Fortnite",
    "Candy crushed",
    "Clash of Titans",
    "Prince of Persia",
    "Mini Militia",
    "Killer Bean Unleashed",
  ];

  const filters = ["All", "Ongoing", "Upcoming", "Past"];

  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
      status: "Registration Open",
      statusType: "registration",
      buttonText: "Register Now",
    },
    {
      id: 2,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Watch Live",
    },
    {
      id: 3,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Watch Live",
    },
    {
      id: 4,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Watch Live",
    },
    {
      id: 5,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Watch Live",
    },
    {
      id: 6,
      title: "Competition Name",
      date: "20 Nov 2024",
      organizer: "Creator's Creator Name",
      games: "PUBG • CODM • Freefire",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Watch Live",
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
                {/* Tooltip */}
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
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 orbitron">
              Tournaments Hub
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Explore all ongoing, upcoming and past gaming tournaments. Join,
              watch or follow your favorite games.
            </p>
          </div>

          {/* Top Categories */}
          <section className="mb-12">
            <h3 className="text-cyan-400 text-xl font-semibold mb-6">
              Top Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {topCategories.map((category, index) => (
                <button
                  key={index}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 text-sm"
                >
                  {category}
                </button>
              ))}
              <button className="px-5 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300 text-sm font-semibold">
                See all Game Categories
              </button>
            </div>
          </section>

          {/* Tournaments Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Tournaments</h2>

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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`${
                          tournament.statusType === "registration"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1`}
                      >
                        {tournament.statusType === "live" && "●"}{" "}
                        {tournament.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {tournament.title}
                    </h3>

                    <div className="space-y-2 text-sm">
                      <p className="text-green-400 font-medium">
                        {tournament.date}
                      </p>
                      <p className="text-gray-400 flex items-center gap-2">
                        <Users size={14} className="text-cyan-400" />
                        {tournament.organizer}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {tournament.games}
                      </p>
                    </div>

                    <button className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300">
                      {tournament.buttonText}
                    </button>
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

export default TournamentsHubPage;
