"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, Share2, ChevronRight, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { getTournamentBySlug } from "@/lib/api/tournaments";

const TournamentDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchTournament = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await getTournamentBySlug(slug);

        // backend returns { status:"error", message:"Tournament not found" }
        if (
          res?.status === "error" ||
          res?.message?.toLowerCase()?.includes("not found")
        ) {
          setTournament(null);
          setNotFound(true);
          return;
        }

        const data = res?.data || res;

        if (!data || !data.title) {
          setTournament(null);
          setNotFound(true);
          return;
        }

        setTournament(data);
      } catch (error: any) {
        console.error(error);
        setTournament(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [slug]);

  const images =
    tournament?.media?.images?.length > 0
      ? tournament.media.images
      : tournament?.coverImage
        ? [tournament.coverImage]
        : [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&fit=crop",
          ];

  const tournamentGames = tournament?.games || [];
  const schedules = tournament?.schedules || [];
  const rules = tournament?.rules || [];

  const formatDate = (date?: string) => {
    if (!date) return "TBA";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const shareTournament = async () => {
    const shareData = {
      title: tournament?.title,
      text: tournament?.title,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Tournament link copied.");
    }
  };

  const getStatus = (status?: string) => {
    if (status === "registration_open") {
      return "bg-[#09362A] text-[#02DD6A] border-[#02DD6A]";
    }

    if (status === "ongoing") {
      return "bg-[#2D0B12] text-[#FF6B81] border-[#FF6B81]";
    }

    if (status === "completed") {
      return "bg-[#1A2434] text-[#9EB1C9] border-[#5A6D89]";
    }

    return "bg-[#210626] text-[#D8B4FE] border-[#8B5CF6]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020818] px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-4 animate-pulse">
          <div className="h-28 bg-white/5 rounded-xl" />
          <div className="h-72 bg-white/5 rounded-xl" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-64 bg-white/5 rounded-xl" />
            <div className="h-64 bg-white/5 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !tournament) {
    return (
      <div className="min-h-screen bg-[#020818] flex items-center justify-center px-4">
        <div className="w-full max-w-lg border border-[#334760] bg-[#07101F] rounded-2xl px-6 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 mx-auto flex items-center justify-center mb-4">
            <span className="text-red-400 text-xl">!</span>
          </div>

          <h2 className="text-white text-xl font-semibold">
            Tournament Not Found
          </h2>

          <p className="text-[#8FA7C2] text-sm mt-3 leading-6">
            The tournament you are trying to access does not exist, may have
            been removed, renamed, or the link is invalid.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <Link
              href="/tournaments/hub"
              className="px-4 py-2.5 rounded-lg bg-cyan-400 text-[#02111A] text-sm font-semibold"
            >
              Browse Tournaments
            </Link>

            <Link
              href="/"
              className="px-4 py-2.5 rounded-lg border border-[#334760] text-white text-sm font-medium hover:bg-white/5"
            >
              Return Home
            </Link>
          </div>

          <p className="text-[#60738D] text-xs mt-5">Requested slug: {slug}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020818]">
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <section className="bg-[#0a1628] border border-[#455872] rounded-xl p-4 md:p-5 mb-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {tournament.title}
              </h1>

              <span
                className={`text-[11px] px-2 py-1 rounded-full border ${getStatus(
                  tournament.status,
                )}`}
              >
                {tournament.status || "upcoming"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-[#9EB1C9] text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {formatDate(tournament.startDate)} -{" "}
                {formatDate(tournament.endDate)}
              </span>

              <span className="flex items-center gap-1">
                <Users size={13} />
                {tournament.totalTeams || 0} Teams
              </span>
            </div>

            <p className="text-[#F87171] text-xs">
              Registration closes:{" "}
              {formatDate(
                tournament.registrationDeadline ||
                  tournament.endRegistrationDate,
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Link
                href={`/tournaments/${slug}/registration`}
                className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center font-medium"
              >
                Register Now
              </Link>

              <a
                href="#details"
                className="px-4 py-2 text-sm border border-cyan-400 text-cyan-400 rounded-lg text-center"
              >
                See Details
              </a>

              <button
                onClick={shareTournament}
                className="px-4 py-2 text-sm border border-white/15 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-5">
          <div className="rounded-xl overflow-hidden border border-[#455872] h-56 md:h-80">
            <img
              src={images[selectedImage]}
              alt={tournament.title}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 rounded-lg overflow-hidden border ${
                    selectedImage === index
                      ? "border-cyan-400"
                      : "border-[#455872]"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Main Grid */}
        <section id="details" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Games */}
          <div className="bg-[#0a1628] border border-[#455872] rounded-xl p-4">
            <h2 className="text-white text-base font-semibold mb-3">
              Tournament Games
            </h2>

            {tournamentGames.length > 0 ? (
              <div className="space-y-3">
                {tournamentGames.map((game: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0"
                  >
                    <p className="text-white text-sm font-medium">
                      {game.gameName}
                    </p>

                    <div className="flex gap-3 text-xs">
                      <span className="text-[#8FA7C2]">
                        Min: {game.minPlayers || 1}
                      </span>
                      <span className="text-cyan-400">
                        Max: {game.maxPlayers || 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8FA7C2] text-sm">No games added yet.</p>
            )}
          </div>

          {/* Schedule */}
          <div className="bg-[#0a1628] border border-[#455872] rounded-xl p-4">
            <h2 className="text-white text-base font-semibold mb-3">
              Schedule
            </h2>

            {schedules.length > 0 ? (
              <div className="space-y-2">
                {schedules.map((schedule: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded-lg flex gap-2"
                  >
                    <ChevronRight
                      size={14}
                      className="text-purple-400 mt-0.5 shrink-0"
                    />

                    <div>
                      <p className="text-white text-sm">
                        {schedule.stage || schedule.title || "Round"}
                      </p>

                      <p className="text-[#8FA7C2] text-xs">
                        {formatDate(schedule.date || schedule.startDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8FA7C2] text-sm">
                Schedule not available yet.
              </p>
            )}
          </div>

          {/* Rules */}
          <div className="bg-[#0a1628] border border-[#455872] rounded-xl p-4">
            <h2 className="text-white text-base font-semibold mb-3">Rules</h2>

            {rules.length > 0 ? (
              <div className="space-y-2">
                {rules.map((rule: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded-lg flex items-center justify-between"
                  >
                    <span className="text-white text-sm">
                      {rule.game || rule.title || `Rule ${index + 1}`}
                    </span>

                    <button className="text-cyan-400 flex items-center gap-1 text-xs">
                      <Download size={13} />
                      File
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8FA7C2] text-sm">
                Rules will be added soon.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="bg-[#0a1628] border border-[#455872] rounded-xl p-4">
            <h2 className="text-white text-base font-semibold mb-3">
              Description
            </h2>

            <p className="text-[#9EB1C9] text-sm leading-6">
              {tournament.description ||
                "No description has been provided for this tournament yet."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TournamentDetailPage;
