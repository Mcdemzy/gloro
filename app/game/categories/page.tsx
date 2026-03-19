"use client";
import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const GameCategoriesPage = () => {
  const pathname = usePathname();
  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Tournaments", href: "/tournaments/hub" },
    { icon: Gamepad2, label: "Games", href: "/game/categories", active: true },
    { icon: Users, label: "Community", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];
  const [visibleCount, setVisibleCount] = useState(6);

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
    <div className="min-h-screen bg-[#020818]">
      <Navbar />
      <div className="flex pt-32 md:pt-44">
        {/* Sidebar — hidden on mobile */}
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
        <main className="flex-1 lg:ml-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4 orbitron">
                Game Categories
              </h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
                Explore all ongoing, upcoming and past gaming Tournaments. Join,
                watch or follow your favorite games.
              </p>
            </div>

            {/* Games Section */}
            <section>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 orbitron">
                Games
              </h2>

              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14 mb-12">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="group border border-[#455872] overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_48px_2px_#0195D9] transition-all duration-300"
                    style={{
                      background: "linear-gradient(to right, #040a1f, #02050e)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-b-2xl border-2 border-[#80A1CE]">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 sm:h-56 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            "linear-gradient(to top, #051225, transparent, transparent)",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5 space-y-8 md:space-y-20">
                      <h3 className="text-base md:text-xl font-bold text-white transition-colors orbitron leading-[100%] tracking-[0%]">
                        {game.title}
                      </h3>

                      <Link
                        href={`/game/categories/${game.slug}`}
                        className="w-full bg-[#030D0F] border border-[#71D4F7] text-[#71D4F7] hover:bg-cyan-400/10 text-sm md:text-base font-medium py-2.5 md:py-3 transition-all duration-300 flex items-center justify-center cursor-pointer"
                      >
                        See Tournaments
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-6 md:px-8 py-2.5 md:py-3 text-[#030411] rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer mt-6 md:mt-10 text-sm md:text-base"
                    style={{
                      background:
                        "linear-gradient(180deg, #80E3FF 0%, #00C6FF 50%, #00C6FF 75%, #00C6FF 87.5%, #01A3D1 100%)",
                    }}
                  >
                    Load More
                    <ChevronDown size={18} />
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

export default GameCategoriesPage;
