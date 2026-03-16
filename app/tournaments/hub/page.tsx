"use client";
import React, { useState } from "react";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SEE_ALL = "See all Game Categories";

const TournamentsHubPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCategory, setActiveCategory] = useState(SEE_ALL);
  const [visibleCount, setVisibleCount] = useState(6);
  const pathname = usePathname();

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Tournaments", href: "/tournaments/hub" },
    { icon: Gamepad2, label: "Games", href: "/game/categories" },
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
    SEE_ALL,
  ];

  const filters = ["All", "Ongoing", "Upcoming", "Past"];

  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup",
      date: "20 Nov 2024",
      organizer: "PGMC Gamers Competition",
      games: "PUBG • CODM • Freefire",
      category: "FIFA",
      filterType: "Upcoming",
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
      category: "Call of Duty",
      filterType: "Ongoing",
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
      category: "Valorant Clash",
      filterType: "Ongoing",
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
      category: "Fortnite",
      filterType: "Past",
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
      category: "Asphalt",
      filterType: "Upcoming",
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
      category: "Mini Militia",
      filterType: "Past",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      status: "Live",
      statusType: "live",
      buttonText: "Watch Live",
    },
  ];

  // Apply category + filter tab filtering
  const filteredTournaments = tournaments.filter((t) => {
    const matchesCategory =
      activeCategory === SEE_ALL ? true : t.category === activeCategory;
    const matchesFilter =
      activeFilter === "All" ? true : t.filterType === activeFilter;
    return matchesCategory && matchesFilter;
  });

  const visibleTournaments = filteredTournaments.slice(0, visibleCount);

  const handleCategoryClick = (category: string) => {
    if (category === SEE_ALL) {
      setActiveCategory(SEE_ALL);
      setVisibleCount(6);
      return;
    }
    setActiveCategory(activeCategory === category ? SEE_ALL : category);
    setVisibleCount(6);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen bg-[#020818]">
      <Navbar />

      <div className="pt-44">
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
                const isActive = pathname === item.href;

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
            <div className="text-center mb-12">
              <h1 className="text-6xl font-extrabold text-white mb-4 orbitron">
                Tournaments Hub
              </h1>
              <p className="text-[#E0F5FB] font-medium text-xl max-w-4xl mx-auto">
                Explore all ongoing, upcoming and past gaming tournaments. Join,
                watch or follow your favorite games.
              </p>
            </div>

            {/* Top Categories */}
            <section className="mb-24">
              <h3 className="text-[#00C6FF] text-2xl font-medium mb-6">
                Top Categories
              </h3>
              <div className="flex flex-wrap gap-6">
                {topCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-5 py-2.5 border rounded-lg transition-all duration-300 text-sm cursor-pointer font-medium ${
                      activeCategory === category
                        ? "bg-[#00C6FF] border-cyan-400 text-[#000219] font-semibold"
                        : "bg-[#000A15] border-[#779BA0CC] text-white hover:bg-cyan-500/20 hover:border-cyan-400"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Tournaments Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold orbitron text-white">
                  Tournaments
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
                        activeFilter === filter
                          ? ""
                          : "bg-[#000A15]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tournament Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mb-12">
                {visibleTournaments.length > 0 ? (
                  visibleTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="group border border-[#455872] overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_48px_2px_#0195D9] transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(to right, #040a1f, #02050e)",
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
                        <h3 className="text-xl font-bold text-white transition-colors orbitron mb-10">
                          {tournament.title}
                        </h3>

                        <div className="space-y-2">
                          <p className="text-[#02DD6A] font-medium text-lg">
                            {tournament.date}
                          </p>
                          <p className="text-[#87A1A2] text-base flex items-center gap-2">
                            <Users size={20} className="text-[#87A1A2]" />
                            {tournament.organizer}
                          </p>
                          <p className="text-[#87A1A2] text-base">
                            {tournament.games}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="w-fit mt-10 mb-9">
                          <span
                            className={`${
                              tournament.statusType === "registration"
                                ? "bg-[#09362A] border border-[#02DD6A] text-[#02DD6A]"
                                : "bg-[#260612] border border-[#611B28] text-[#FF6467]"
                            } text-base px-4 py-2 rounded-full font-medium flex items-center gap-1`}
                          >
                            {tournament.statusType === "live" && "●"}{" "}
                            {tournament.status}
                          </span>
                        </div>

                        <button className="w-full bg-[#030D0F] border border-[#71D4F7] hover:bg-cyan-400/10 text-base font-medium py-3 transition-all duration-300 cursor-pointer text-[#71D4F7]">
                          {tournament.buttonText}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#87A1A2] col-span-3 text-center py-12">
                    No tournaments found for this selection.
                  </p>
                )}
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

export default TournamentsHubPage;
