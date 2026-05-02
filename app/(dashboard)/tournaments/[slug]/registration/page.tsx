"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  AlertCircle,
  Users,
  Loader2,
  Trophy,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getTournamentBySlug, registerTeamForTournament } from "@/lib/api/tournaments";
import { getMyTeams } from "@/lib/api/teams";

interface Game {
  _id?: string;
  id?: string;
  name?: string;
  gameName?: string;
  image?: string;
}

interface Team {
  _id?: string;
  id?: string;
  name: string;
  members?: any[];
  logo?: string;
}

const TournamentRegistration = () => {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [tournament, setTournament] = useState<any>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  const [currentStep, setCurrentStep] = useState<
    "game-selection" | "team-selection"
  >("game-selection");

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError("");

        const [tournamentRes, teamsRes] = await Promise.all([
          getTournamentBySlug(slug),
          getMyTeams(),
        ]);

        setTournament(tournamentRes?.data || null);
        setTeams(teamsRes?.data || []);
      } catch (err: any) {
        setError(err?.message || "Unable to load registration page.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadPage();
  }, [slug]);

  const games: Game[] = tournament?.games || [];

  const handleBack = () => {
    if (currentStep === "team-selection") {
      setCurrentStep("game-selection");
      setSelectedTeam(null);
      return;
    }

    router.push(`/tournaments/${slug}`);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentStep("team-selection");
  };

  const handleSubmit = async () => {
    if (!selectedTeam || !selectedGame) return;

    try {
      setSubmitting(true);
      setError("");

      await registerTeamForTournament(slug, {
        teamId: (selectedTeam._id || selectedTeam.id)!,
        gameId: (selectedGame._id || selectedGame.id)!,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------------------- Loading -------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="pt-28 flex justify-center items-center min-h-[70vh]">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Loader2 className="animate-spin" size={18} />
            Loading registration...
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ Not Found -------------------------------- */

  if (!tournament) {
    return (
      <div className="min-h-screen">
        <div className="pt-28 px-4 min-h-[75vh] flex items-center justify-center">
          <div className="max-w-md w-full bg-[#0a1628] border border-[#455872] rounded-2xl p-6 text-center">
            <Trophy className="mx-auto text-cyan-400 mb-3" size={28} />

            <h2 className="text-white text-lg font-semibold mb-2">
              Tournament Not Found
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              The tournament you are trying to register for does not exist or
              may have been removed.
            </p>

            <Link
              href="/tournaments/hub"
              className="inline-flex px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-semibold"
            >
              Browse Tournaments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ No Teams --------------------------------- */

  if (!teams?.length) {
    return (
      <div className="min-h-screen">
        <div className="pt-28 px-4 min-h-[75vh] flex items-center justify-center">
          <div className="max-w-md w-full bg-[#0a1628] border border-[#455872] rounded-2xl p-6 text-center">
            <Users className="mx-auto text-cyan-400 mb-3" size={28} />

            <h2 className="text-white text-lg font-semibold mb-2">
              No Team Available
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              You need to create or join a team before registering for this
              tournament.
            </p>

            <Link
              href="/dashboard/teams/create"
              className="inline-flex px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-semibold"
            >
              Create Team
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------- Success --------------------------------- */

  if (success) {
    return (
      <div className="min-h-screen">
        <div className="pt-28 px-4 min-h-[75vh] flex items-center justify-center">
          <div className="max-w-md w-full bg-[#0a1628] border border-[#455872] rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-cyan-500 mx-auto flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-white text-lg font-semibold mb-2">
              Registration Submitted
            </h2>

            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Your team registration has been submitted successfully. Awaiting
              approval from the tournament organizer.
            </p>

            <div className="space-y-2">
              <Link
                href={`/tournaments/${slug}`}
                className="block w-full py-2 rounded-lg bg-cyan-500 text-black text-sm font-semibold"
              >
                Back to Tournament
              </Link>

              <Link
                href="/tournaments/hub"
                className="block w-full py-2 rounded-lg border border-white/10 text-white text-sm"
              >
                Browse More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------- Main UI --------------------------------- */

  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
            <button
              onClick={handleBack}
              className="hover:text-cyan-400 transition"
            >
              {tournament?.title}
            </button>
            <ChevronRight size={14} />
            <span className="text-white">Register</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* Step 1 */}
          {currentStep === "game-selection" && (
            <div className="space-y-4">
              {/* Notice */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">
                    Before You Continue
                  </span>
                </div>

                <ul className="text-gray-300 text-xs space-y-1 leading-relaxed">
                  <li>• Only team owners can register a team.</li>
                  <li>
                    • Team members should be configured for selected game.
                  </li>
                </ul>
              </div>

              {/* Card */}
              <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-5">
                <h2 className="text-white text-base font-semibold mb-4">
                  Select Tournament Game
                </h2>

                <div className="space-y-2">
                  {games.map((game: any, index: number) => {
                    const name =
                      game?.gameName || game?.name || `Game ${index + 1}`;

                    return (
                      <button
                        key={index}
                        onClick={() => handleGameSelect(game)}
                        className="w-full text-left p-3 rounded-xl border border-[#455872] hover:border-cyan-400 hover:bg-white/5 transition"
                      >
                        <span className="text-sm text-white">{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === "team-selection" && (
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-5">
              <h2 className="text-white text-base font-semibold mb-1">
                Select Team
              </h2>

              <p className="text-xs text-gray-400 mb-4">
                Game:{" "}
                {selectedGame?.gameName || selectedGame?.name || "Selected"}
              </p>

              <div className="space-y-2">
                {teams.map((team: any, index: number) => {
                  const active =
                    (selectedTeam?._id || selectedTeam?.id) ===
                    (team._id || team.id);

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedTeam(team)}
                      className={`w-full flex justify-between items-center p-3 rounded-xl border transition ${
                        active
                          ? "border-cyan-400 bg-cyan-500/10"
                          : "border-[#455872] hover:border-cyan-400"
                      }`}
                    >
                      <span className="text-sm text-white">{team.name}</span>

                      <span className="text-xs text-gray-400">
                        {team?.members?.length || 0} members
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={handleBack}
                  className="py-2 rounded-lg border border-white/10 text-sm text-white"
                >
                  Back
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedTeam || submitting}
                  className="py-2 rounded-lg bg-cyan-500 text-black text-sm font-semibold disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Register"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TournamentRegistration;
