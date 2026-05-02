"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Trophy,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getLatestTournaments } from "@/lib/api/tournaments";
import PSImage from "@/assets/images/PS.png";

interface TournamentItem {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  status: string;
  startDate: string;
  endDate?: string;
  totalTeams?: number;
  maxTeamsPerGame: number;
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
        console.error(error);
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

  const getStatus = (status: string) => {
    if (status === "registration_open") return "bg-green-500/20 text-green-300";
    if (status === "ongoing") return "bg-red-500/20 text-red-300";

    return "bg-purple-500/20 text-purple-300";
  };

  return (
    <section className="w-full py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <p className="text-cyan-400 text-xs tracking-[0.25em] uppercase font-semibold">
              New Drops
            </p>

            <h2 className="text-white text-lg md:text-xl font-bold flex items-center gap-2 mt-1">
              <Sparkles size={22} className="text-cyan-400" />
              Latest Tournaments
            </h2>
          </div>

          <Link
            href="/tournaments/hub"
            className="text-sm text-cyan-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            See All
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[340px] rounded-2xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && competitions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="text-center py-16 border border-white/10 rounded-2xl"
          >
            <h3 className="text-white text-xl font-semibold">
              No Tournaments Yet
            </h3>

            <p className="text-gray-400 mt-2">
              New competitions will appear here soon.
            </p>
          </motion.div>
        )}

        {/* Grid */}
        {!loading && competitions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {competitions.map((comp, index) => (
              <motion.div
                key={comp._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href={`/tournaments/${comp.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-[#07101F] hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={comp.coverImage || PSImage}
                      alt={comp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatus(
                        comp.status,
                      )}`}
                    >
                      {comp.status.replace(/_/g, " ")}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg line-clamp-1">
                      {comp.title}
                    </h3>

                    <p className="text-cyan-300 mt-2 font-semibold flex items-center gap-2">
                      <Trophy size={16} />$
                      {comp.prizePool?.first?.toLocaleString() || "0"}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-gray-300">
                      <p className="flex gap-2 items-center">
                        <CalendarDays size={15} />
                        {formatDate(comp.startDate)}
                        {comp.endDate && ` - ${formatDate(comp.endDate)}`}
                      </p>

                      <p className="flex gap-2 items-center">
                        <Users size={15} />
                        {comp.totalTeams || 0}/{comp.maxTeamsPerGame || 0} Teams
                      </p>
                    </div>

                    <div className="mt-5 text-cyan-300 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Tournament
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCompetitions;
