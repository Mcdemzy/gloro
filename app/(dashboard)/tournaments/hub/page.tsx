"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Calendar, ChevronDown, Search, Users } from "lucide-react";
import Link from "next/link";
import { getTournamentHub, Tournament } from "@/lib/api/tournaments";
import { getAllGames } from "@/lib/api/games";

const SEE_ALL = "All Games";

const TournamentsHubPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCategory, setActiveCategory] = useState(SEE_ALL);
  const [visibleCount, setVisibleCount] = useState(6);
  const [search, setSearch] = useState("");

  const [games, setGames] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "Ongoing", "Upcoming", "Past"];

  useEffect(() => {
    loadGames();
    loadTournaments();
  }, []);

  const loadGames = async () => {
    try {
      const res = await getAllGames();
      setGames(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTournaments = async () => {
    try {
      const res = await getTournamentHub({
        page: 1,
        limit: 50,
      });

      setTournaments(res?.data?.tournaments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(
    () => [SEE_ALL, ...games.map((game) => game.name)],
    [games],
  );

  const filteredTournaments = tournaments.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === SEE_ALL
        ? true
        : item.games?.some(
            (game) =>
              game.gameName?.toLowerCase() === activeCategory.toLowerCase(),
          );

    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Ongoing"
          ? item.status === "ongoing"
          : activeFilter === "Upcoming"
            ? ["published", "registration_open"].includes(item.status)
            : ["completed", "cancelled"].includes(item.status);

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const visibleTournaments = filteredTournaments.slice(0, visibleCount);

  const formatDate = (date?: string) => {
    if (!date) return "TBA";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatus = (status: string) => {
    if (status === "registration_open") {
      return {
        text: "Registration Open",
        className: "bg-[#09362A] border-[#02DD6A] text-[#02DD6A]",
      };
    }

    if (status === "ongoing") {
      return {
        text: "Live",
        className: "bg-[#260612] border-[#FF6467]/40 text-[#FF6467]",
      };
    }

    if (status === "completed") {
      return {
        text: "Completed",
        className: "bg-[#1D2430] border-[#53627A] text-[#AFC0DA]",
      };
    }

    return {
      text: "Upcoming",
      className: "bg-[#210626] border-[#4C1B61] text-[#C084FC]",
    };
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white orbitron">
            Tournaments Hub
          </h1>

          <p className="text-[#AFC0DA] text-xs md:text-sm mt-2 max-w-2xl mx-auto">
            Explore active, upcoming and completed gaming tournaments.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-md mx-auto">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B92B0]"
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(6);
            }}
            placeholder="Search tournaments..."
            className="w-full h-10 bg-[#07101F] border border-[#334760] rounded-lg pl-9 pr-3 text-sm text-white outline-none focus:border-cyan-400"
          />
        </div>

        {/* Categories */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(6);
                }}
                className={`px-3 py-1.5 rounded-md text-[11px] whitespace-nowrap border transition ${
                  activeCategory === category
                    ? "bg-cyan-500 text-[#02111A] border-cyan-400 font-semibold"
                    : "bg-[#07101F] text-white border-[#334760]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="flex justify-between items-center gap-3 mb-5 flex-wrap">
          <h2 className="text-white text-lg font-semibold orbitron">
            Tournaments
          </h2>

          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6);
                }}
                className={`px-3 py-1.5 rounded-md text-[11px] border transition ${
                  activeFilter === filter
                    ? "bg-[#10307E] border-[#3E6DFF] text-white"
                    : "bg-[#07101F] border-[#334760] text-[#B4C5DC]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-white/5 border border-[#334760] animate-pulse"
              />
            ))}

          {!loading &&
            visibleTournaments.map((item) => {
              const status = getStatus(item.status);

              return (
                <div
                  key={item._id}
                  className="group border border-[#455872] bg-linear-to-r from-[#040a1f] to-[#02050e] overflow-hidden hover:border-cyan-400/50 transition"
                >
                  <div className="relative">
                    <img
                      src={
                        item.coverImage ||
                        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
                      }
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="text-white text-sm font-semibold line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-[#02DD6A] text-xs mt-1 flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(item.startDate)}
                    </p>

                    <p className="text-[#91A4BB] text-[11px] mt-1 flex items-center gap-1">
                      <Users size={12} />
                      {item.creatorId?.username || "GloroQ"}
                    </p>

                    <p className="text-[#91A4BB] text-[11px] mt-1">
                      Teams: {item.totalTeams || 0}
                    </p>

                    <div className="mt-2">
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full border ${status.className}`}
                      >
                        {status.text}
                      </span>
                    </div>

                    <Link
                      href={`/tournaments/${item.slug}`}
                      className="block text-center mt-3 py-2 text-xs border border-[#71D4F7] text-[#71D4F7] hover:bg-cyan-400/10 transition"
                    >
                      View Tournament
                    </Link>
                  </div>
                </div>
              );
            })}

          {!loading && filteredTournaments.length === 0 && (
            <div className="col-span-full">
              <div className="text-center border border-[#334760] bg-[#07101F] rounded-xl py-10 px-5">
                <h4 className="text-white text-sm font-semibold">
                  No Tournaments Found
                </h4>

                <p className="text-[#8FA7C2] text-xs mt-2 max-w-sm mx-auto">
                  No tournaments match your current search or filters. Try
                  changing category or status.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Load More */}
        {!loading && visibleCount < filteredTournaments.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-5 py-2 text-xs font-semibold rounded-lg text-[#02111A] bg-cyan-400 hover:bg-cyan-300 transition flex items-center gap-2"
            >
              Load More
              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TournamentsHubPage;
