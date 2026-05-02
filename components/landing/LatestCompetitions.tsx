// components/landing/LatestCompetitions.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getLatestTournaments } from "@/lib/api/tournaments";

interface TournamentItem {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  status: string;
  startDate: string;
  totalTeams?: number;
  creatorId?: {
    username: string;
  };
  prizePool?: {
    first?: number;
  };
}

const LatestCompetitions = () => {
  const [competitions, setCompetitions] = useState<TournamentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatest = async () => {
      try {
        const res = await getLatestTournaments();
        setCompetitions(res?.data || []);
      } catch (error) {
        console.error("Failed to load latest tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLatest();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusStyle = (status: string) => {
    if (status === "registration_open") {
      return {
        bg: "bg-[#09362A]",
        border: "#02DD6A",
        text: "#02DD6A",
        label: "Registration Open",
      };
    }

    return {
      bg: "bg-[#210626]",
      border: "#4C1B61",
      text: "#a855f7",
      label: "Upcoming",
    };
  };

  return (
    <main className="w-full py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-5 md:mb-8">
          <h3 className="text-sm md:text-lg font-bold text-white orbitron">
            Latest Tournaments
          </h3>

          <Link
            href="/tournaments/hub"
            className="text-xs text-white/50 hover:text-cyan-400 transition-colors flex items-center gap-1 border-b border-white/10 hover:border-cyan-400/40 pb-0.5"
          >
            See all
            <ArrowRight size={12} />
          </Link>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[340px] bg-white/5 animate-pulse border border-[#455872]"
              />
            ))}

          {!loading && competitions.length === 0 && (
            <div className="col-span-2 md:col-span-3">
              <div className="text-center border border-[#2D4666] bg-[#07101F]/80 rounded-2xl px-8 py-14">
                <h4 className="text-white font-semibold text-lg orbitron">
                  No Tournaments Available
                </h4>

                <p className="text-sm text-[#8FA7C2] mt-2 mb-4 max-w-md mx-auto leading-relaxed">
                  No recent tournaments have been published at the moment.
                  Please check again later for upcoming competitions.
                </p>
                <Link className="underline text-cyan-400" href="/tournaments/hub">
 Browse All Tournaments
</Link>
              </div>
            </div>
          )}

          {!loading &&
            competitions.length > 0 &&
            competitions.map((comp) => {
              const status = getStatusStyle(comp.status);

              return (
                <div
                  key={comp._id}
                  className="group bg-linear-to-r from-[#040a1f] to-[#02050e] overflow-hidden transition-all duration-300 backdrop-blur-sm border border-[#455872] hover:shadow-[0_0_32px_1px_#0195D9]"
                >
                  <div className="relative overflow-hidden border-2 border-[#80A1CE]">
                    <img
                      src={
                        comp.coverImage ||
                        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
                      }
                      alt={comp.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#051225] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="p-4 space-y-2">
                    <h2 className="text-base font-bold text-white orbitron line-clamp-1">
                      {comp.title}
                    </h2>

                    <p className="text-[#02DD6A] text-sm font-medium">
                      Grand Prize: $
                      {comp.prizePool?.first?.toLocaleString() || "0"}
                    </p>

                    <p className="flex items-center gap-1.5 text-[#02DD6A] text-sm font-medium">
                      <Calendar size={13} />
                      {formatDate(comp.startDate)}
                    </p>

                    <p className="flex items-center gap-1.5 text-[#87A1A2] text-xs">
                      <Users size={14} />
                      {comp.creatorId?.username || "GloroQ"}
                    </p>

                    <p className="text-xs text-[#87A1A2]">
                      Teams: {comp.totalTeams || 0}
                    </p>

                    <div className="pt-1">
                      <span
                        className={`${status.bg} text-xs px-3 py-1 rounded-full font-medium inline-block border`}
                        style={{
                          borderColor: status.border,
                          color: status.text,
                        }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="pt-2 px-8">
                      <Link
                        href={`/tournaments/${comp.slug}`}
                        className="block text-center w-full text-[#71D4F7] text-xs font-medium py-2 rounded-sm transition-all duration-300 hover:bg-cyan-400/10 border border-[#71D4F7] cursor-pointer hover:border-cyan-400 bg-[#030D0F]"
                      >
                        View Tournament
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </main>
  );
};

export default LatestCompetitions;
