"use client";
import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Tournament {
  id: number;
  title: string;
  date: string;
  image: string;
  prize?: string;
  status: "Completed" | "Active" | "Draft";
}

const OverviewContent = () => {
  const tournaments: Tournament[] = [
    {
      id: 1,
      title: "FIFA Global Cup",
      date: "Apr 1 • May 10",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
      status: "Completed",
    },
    {
      id: 2,
      title: "COD: Warzone Master",
      prize: "$75,000",
      date: "Jun 15 • Jul 22",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      status: "Active",
    },
    {
      id: 3,
      title: "Valorant Clash",
      date: "Apr 1 • May 10",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
      status: "Draft",
    },
    {
      id: 4,
      title: "Fortnite Royale Cup",
      date: "Sep 02 • Oct 16",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      status: "Completed",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold flex items-center gap-1">
            ✓ Completed
          </span>
        );
      case "Active":
        return (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
            ● Active
          </span>
        );
      case "Draft":
        return (
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-semibold flex items-center gap-1">
            📄 Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Overview</h1>
          <p className="text-cyan-300/70">
            Manage your tournaments and track performance
          </p>
        </div>
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50"
        >
          Switch to User's Dashboard
        </Link>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-xl">
        <p className="text-cyan-300/70 text-sm mb-2">
          Total Tournaments Created
        </p>
        <p className="text-5xl font-bold text-white">12</p>
      </div>

      {/* My Tournaments Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Tournaments</h2>
        <div className="flex items-center gap-4">
          <Link
            href="/creator/tournaments"
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
          >
            See all
          </Link>
          <Link
            href="/creator/host/tournament"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Tournament
          </Link>
        </div>
      </div>

      {/* Tournament Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="group bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <div className="relative overflow-hidden h-48">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${tournament.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d36] via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {tournament.title}
              </h3>

              {tournament.prize && (
                <p className="text-green-400 font-bold text-lg">
                  Grand Prize: {tournament.prize}
                </p>
              )}

              <p className="text-cyan-300/70 text-sm">{tournament.date}</p>

              <div className="flex items-center justify-between pt-2">
                {getStatusBadge(tournament.status)}
              </div>

              <Link
                href={`/creator/tournaments/${tournament.id}`}
                className="block w-full text-center px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 rounded-xl font-semibold transition-all"
              >
                Manage
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OverviewContent;
