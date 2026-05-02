// components/landing/Trending.tsx

"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { CalendarDays, Flame, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PSImage from "@/assets/images/PS.png";
import { getTrendingTournaments } from "@/lib/api/tournaments";

interface TournamentItem {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  status: string;
  startDate: string;
  endDate?: string;
}

const Trending = () => {
  const [tournaments, setTournaments] = useState<TournamentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const hoveredRef = useRef(false);

  const SPEED = 0.22;

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

  // Shuffle once whenever data changes
  const shuffled = useMemo(() => {
    const arr = [...tournaments];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }, [tournaments]);

  /**
   * Duplicate only if few cards.
   * >=4 cards = no duplicates
   */
  const loopData = useMemo(() => {
    if (shuffled.length === 1) return Array(8).fill(shuffled[0]);
    if (shuffled.length === 2) return [...shuffled, ...shuffled, ...shuffled];
    if (shuffled.length === 3) return [...shuffled, ...shuffled];
    return [...shuffled, ...shuffled];
  }, [shuffled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shuffled.length === 0) return;

    // stop previous loop
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    posRef.current = 0;
    container.scrollLeft = 0;

    const singleSetWidth =
      shuffled.length >= 4
        ? container.scrollWidth / 2
        : container.scrollWidth / (loopData.length / shuffled.length);

    const animate = () => {
      if (!hoveredRef.current) {
        posRef.current += SPEED;

        if (posRef.current >= singleSetWidth) {
          posRef.current = 0;
        }

        container.scrollLeft = posRef.current;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [loopData, shuffled]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusText = (status: string) => {
    if (status === "registration_open") return "Registration Open";
    if (status === "ongoing") return "Live Now";
    return "Upcoming";
  };

  return (
    <section className="w-full py-14 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-8"
      >
        <p className="text-cyan-400 text-[11px] tracking-[0.28em] uppercase font-semibold">
          Discover
        </p>

        <h2 className="text-white text-xl md:text-2xl font-bold flex items-center gap-2 mt-2">
          <Flame size={22} className="text-orange-400" />
          Trending Tournaments
        </h2>
      </motion.div>

      {/* Slider */}
      <div className="relative">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020818] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020818] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto px-6 pb-4 pt-1 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={() => (hoveredRef.current = true)}
          onMouseLeave={() => (hoveredRef.current = false)}
        >
          {/* Loading */}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[360px] h-[210px] rounded-2xl bg-white/5 animate-pulse shrink-0"
              />
            ))}

          {/* Empty */}
          {!loading && tournaments.length === 0 && (
            <div className="w-full text-center py-16">
              <h3 className="text-white text-xl font-semibold">
                No Trending Tournaments Yet
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Check back shortly for fresh tournaments.
              </p>
            </div>
          )}

          {/* Cards */}
          {!loading &&
            tournaments.length > 0 &&
            loopData.map((tournament, index) => (
              <motion.div
                key={`${tournament._id}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                className="shrink-0"
              >
                <Link
                  href={`/tournaments/${tournament.slug}`}
                  className="group block w-[360px] h-[210px] relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,255,255,0.08)] transition-all duration-300"
                >
                  <Image
                    src={tournament.coverImage || PSImage}
                    alt={tournament.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

                  {/* Status */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/10">
                    <span className="text-[11px] font-medium text-cyan-300">
                      {getStatusText(tournament.status)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-lg line-clamp-1">
                      {tournament.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
                      <CalendarDays size={15} className="text-cyan-400" />
                      <span>
                        {formatDate(tournament.startDate)}
                        {tournament.endDate &&
                          ` - ${formatDate(tournament.endDate)}`}
                      </span>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 text-sm font-medium group-hover:gap-3 transition-all">
                      View Tournament
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
