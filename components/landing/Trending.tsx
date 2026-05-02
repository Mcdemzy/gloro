// components/landing/Trending.tsx

"use client";

import React, { useRef, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PSImage from "@/assets/images/PS.png";
import { getTrendingTournaments } from "@/lib/api/tournaments";

interface TournamentItem {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  status: string;
  startDate: string;
}

const Trending = () => {
  const [tournaments, setTournaments] = useState<TournamentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const res = await getTrendingTournaments();
        setTournaments(res?.data || []);
      } catch (error) {
        console.error("Failed to load trending tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  const duplicatedTournaments =
    tournaments.length > 0
      ? [...tournaments, ...tournaments, ...tournaments]
      : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const SPEED = 0.6;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || tournaments.length === 0) return;

    const getLoopWidth = () => container.scrollWidth / 3;

    const tick = () => {
      if (!isHoveredRef.current) {
        posRef.current += SPEED;

        const loopWidth = getLoopWidth();

        if (posRef.current >= loopWidth) {
          posRef.current -= loopWidth;
        }

        container.scrollLeft = posRef.current;
      } else {
        posRef.current = container.scrollLeft;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [tournaments]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusText = (status: string) => {
    if (status === "registration_open") return "Open";
    if (status === "published") return "Upcoming";
    return status.replace(/_/g, " ");
  };

  return (
    <main className="w-full py-8 overflow-hidden">
      <h3 className="mb-6 text-sm md:text-lg font-bold text-white max-w-7xl mx-auto orbitron tracking-wide px-6">
        Trending Tournaments
      </h3>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#020818] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#020818] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="flex gap-5 pb-3 overflow-x-scroll"
          onMouseEnter={() => (isHoveredRef.current = true)}
          onMouseLeave={() => (isHoveredRef.current = false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[320px] h-[120px] rounded-xl bg-white/5 animate-pulse"
              />
            ))}

          {!loading && tournaments.length === 0 && (
            <div className="w-full flex justify-center px-6">
              <div className="min-w-[420px] max-w-xl text-center border border-[#2D4666] bg-[#07101F]/80 rounded-2xl px-8 py-10">
                <h4 className="text-white font-semibold text-lg orbitron">
                  No Trending Tournaments Yet
                </h4>

                <p className="text-sm text-[#8FA7C2] mt-2 leading-relaxed">
                  There are currently no trending tournaments available. Check
                  back shortly as new competitions gain momentum.
                </p>
              </div>
            </div>
          )}

          {!loading &&
            tournaments.length > 0 &&
            duplicatedTournaments.map((tournament, index) => (
              <div
                key={`${tournament._id}-${index}`}
                className="bg-[#00000080] border border-[#CBE1EE80] min-w-[320px] shrink-0 p-3 rounded-xl flex gap-3 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="overflow-hidden shrink-0 my-auto">
                  <Image
                    src={tournament.coverImage || PSImage}
                    alt={tournament.title}
                    width={80}
                    height={80}
                    className="object-cover w-[80px] h-[80px]"
                  />
                </div>

                <div className="flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-1">
                      {tournament.title}
                    </h4>

                    <p className="font-bold text-sm text-white leading-snug capitalize">
                      {getStatusText(tournament.status)}
                    </p>

                    <p className="text-[12px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <Calendar size={11} className="text-cyan-400" />
                      {formatDate(tournament.startDate)}
                    </p>
                  </div>

                  <Link
                    href={`/tournaments/${tournament.slug}`}
                    className="relative p-px rounded-full bg-linear-to-r from-[#00C6FF] to-[#1901CA] mt-2 w-fit hover:shadow-[0_0_12px_rgba(0,198,255,0.5)] transition-all duration-300"
                  >
                    <div className="px-4 py-1.5 rounded-full bg-[#020818] hover:bg-[#020818]/80 transition-colors duration-300">
                      <span className="font-semibold text-xs text-white whitespace-nowrap">
                        View Details
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Trending;
