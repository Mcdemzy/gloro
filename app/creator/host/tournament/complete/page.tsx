"use client";

/**
 * Tournament Complete page
 *
 * Fixes vs original:
 * - Reads the new tournament ID from the query string (?id=xxx)
 * - "View my Tournaments" navigates to /creator/tournaments
 * - "Manage Tournament" navigates to the specific tournament manage page
 * - Both buttons actually work
 * - Subtle entrance animation
 */

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Trophy, ArrowRight, Settings, AlertTriangle } from "lucide-react";
import React from "react";

const STEPS = [1, 2, 3];

function StepProgress() {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((n, idx) => (
        <React.Fragment key={n}>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/30">
              ✓
            </div>
            <span className="text-xs font-medium text-cyan-600 whitespace-nowrap">
              {["Basic Info", "Dates & Schedule", "Settings & Rules"][idx]}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className="flex-1 h-px mx-3 mb-5 bg-cyan-500" />
          )}
        </React.Fragment>
      ))}

      {/* Done bubble */}
      <div className="flex flex-col items-center gap-1.5 ml-3">
        <div className="px-3 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/30">
          Done
        </div>
        <span className="text-xs font-medium text-cyan-400">Complete</span>
      </div>
    </div>
  );
}

export default function TournamentComplete() {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("id");

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-white orbitron">Create New Tournament</h1>

      {/* Warning */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
        <p className="text-red-400/90 text-sm leading-relaxed">
          <span className="font-semibold">Note:</span> If any team member hasn't configured a
          particular game, their team won't be allowed to register for that game.
        </p>
      </div>

      {/* Step progress — all complete */}
      <StepProgress />

      {/* Success card */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-12 flex flex-col items-center">
        {/* Trophy with glow */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-purple-600 to-cyan-500 opacity-25 blur-3xl rounded-full" />
          <Trophy
            size={110}
            className="relative text-purple-400 drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            strokeWidth={1.2}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-purple-500/30 blur-xl rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-3 orbitron">
          Tournament created!
        </h2>
        <p className="text-gray-400 text-center text-sm mb-10 max-w-md leading-relaxed">
          Your tournament has been saved as a <span className="text-blue-400 font-semibold">draft</span>.
          Head to the manage page to add more details, publish it, and start accepting registrations.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <Link
            href="/creator/tournaments"
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/40 text-sm"
          >
            View my tournaments
            <ArrowRight size={18} />
          </Link>

          {tournamentId ? (
            <Link
              href={`/creator/tournaments/${tournamentId}/managers`}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all text-sm"
            >
              <Settings size={18} />
              Manage tournament
            </Link>
          ) : (
            <Link
              href="/creator/tournaments"
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all text-sm"
            >
              <Settings size={18} />
              Manage tournaments
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}