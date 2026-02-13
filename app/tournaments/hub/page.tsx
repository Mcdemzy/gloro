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
  Menu,
  X,
  Search,
} from "lucide-react";

const TournamentsHubPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
    "Candy Crush",
    "Clash of Titans",
    "Prince of Persia",
    "Mini Militia",
    "Killer Bean",
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
      title: "COD Championship",
      date: "25 Nov 2024",
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
      title: "Valorant Pro League",
      date: "30 Nov 2024",
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
      title: "Fortnite Royale Cup",
      date: "5 Dec 2024",
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
      title: "League of Legends Worlds",
      date: "10 Dec 2024",
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
      title: "Apex Legends Global",
      date: "15 Dec 2024",
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
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a1d2e]/90 backdrop-blur-md border-b border-purple-500/20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <h1 className="text-xl font-bold text-white orbitron">Tournaments</h1>
        
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-white">
          <Search size={20} />
        </button>
      </div>

      {/* Sidebar - Mobile Overlay / Desktop Fixed */}
      <aside className={`
        fixed md:relative z-40 h-screen w-64 md:w-20 bg-[#1a1d2e]/90 md:bg-[#1a1d2e]/80 backdrop-blur-md border-r border-purple-500/20 flex flex-col py-8
        transition-transform duration-300 md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Decorative line */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>

        <div className="space-y-6 px-4 md:px-0">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className={`
                  w-full md:w-12 h-12 rounded-xl flex items-center transition-all duration-300 group relative
                  ${item.active
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-400"
                  }
                `}
              >
                <div className="flex items-center justify-center md:justify-center w-12">
                  <Icon className="w-6 h-6 md:w-5 md:h-5" />
                </div>
                <span className="md:hidden text-white text-sm ml-3">{item.label}</span>
                
                {/* Desktop Tooltip */}
                <span className="hidden md:block absolute left-full ml-4 px-3 py-2 bg-[#1a1d2e] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-purple-500/20">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-20 pt-14 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 py-6 sm:py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 orbitron">
              Tournaments Hub
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl md:max-w-3xl mx-auto px-4">
              Explore all ongoing, upcoming and past gaming tournaments. Join,
              watch or follow your favorite games.
            </p>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tournaments..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Top Categories */}
          <section className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-cyan-400 text-lg sm:text-xl font-semibold">
                Top Categories
              </h3>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm md:hidden">
                See all
              </button>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="relative">
              <div className="overflow-x-auto pb-3 -mx-4 px-4">
                <div className="flex gap-2 min-w-max">
                  {topCategories.slice(0, 5).map((category, index) => (
                    <button
                      key={index}
                      className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 text-xs sm:text-sm whitespace-nowrap"
                    >
                      {category}
                    </button>
                  ))}
                  <button className="px-3 sm:px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300 text-xs sm:text-sm font-semibold whitespace-nowrap">
                    + More
                  </button>
                </div>
              </div>
            </div>
            
            {/* Full Categories - Desktop */}
            <div className="hidden md:flex flex-wrap gap-3">
              {topCategories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 text-sm"
                >
                  {category}
                </button>
              ))}
              <button className="px-4 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300 text-sm font-semibold">
                See all
              </button>
            </div>
          </section>

          {/* Tournaments Section */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Tournaments</h2>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg flex items-center gap-2 text-sm"
              >
                Filter: {activeFilter}
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Filter Tabs - Desktop */}
              <div className="hidden md:flex gap-2 bg-white/5 p-1 rounded-xl">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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

            {/* Mobile Filter Dropdown */}
            {mobileFilterOpen && (
              <div className="md:hidden mb-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
                <div className="grid grid-cols-2 gap-3">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setMobileFilterOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeFilter === filter
                          ? "bg-purple-600 text-white"
                          : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tournament Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="group bg-[#0a1628] border border-[#455872] rounded-xl sm:rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 h-full"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${tournament.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span
                        className={`
                          ${tournament.statusType === "registration"
                            ? "bg-green-500"
                            : "bg-red-500"
                          } text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1
                        `}
                      >
                        {tournament.statusType === "live" && "●"}{" "}
                        <span className="text-xs">{tournament.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {tournament.title}
                    </h3>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <p className="text-green-400 font-medium">
                        {tournament.date}
                      </p>
                      <p className="text-gray-400 flex items-center gap-2 line-clamp-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{tournament.organizer}</span>
                      </p>
                      <p className="text-gray-500 text-xs line-clamp-1">
                        {tournament.games}
                      </p>
                    </div>

                    <button className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base">
                      {tournament.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 text-sm sm:text-base">
                Load More
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TournamentsHubPage;