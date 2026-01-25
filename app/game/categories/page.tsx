import React from "react";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const GameCategoriesPage = () => {
  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Tournaments", href: "/tournaments" },
    { icon: Gamepad2, label: "Games", href: "/game/categories", active: true },
    { icon: Users, label: "Community", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const games = [
    {
      id: 1,
      slug: "fifa-mobile",
      title: "FIFA Mobile",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
      tournaments: 24,
    },
    {
      id: 2,
      slug: "call-of-duty-mobile",
      title: "Call Of Duty - Mobile",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      tournaments: 18,
    },
    {
      id: 3,
      slug: "free-fire",
      title: "Free Fire",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
      tournaments: 32,
    },
    {
      id: 4,
      slug: "dream-league",
      title: "Dream League",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      tournaments: 15,
    },
    {
      id: 5,
      slug: "god-of-guns",
      title: "God of Guns - The Crossfade & Diners",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      tournaments: 12,
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
            <h1 className="text-5xl font-bold text-white mb-4 orbitron">
              Game Categories
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Explore all ongoing, upcoming and past gaming Tournaments. Join,
              watch or follow your favorite games.
            </p>
          </div>

          {/* Games Section */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">Games</h2>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="group bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${game.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors min-h-[3rem]">
                      {game.title}
                    </h3>

                    <Link
                      href={`/game/categories/${game.slug}`}
                      className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      See Tournaments
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

export default GameCategoriesPage;
