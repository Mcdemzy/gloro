"use client";

/**
 * Step 3 — Settings & Rules
 *
 * Fixes vs original:
 * - State in WizardContext (prize pool, maxTeams, waitlist, description)
 * - submitTournament() actually calls the API
 * - Rules upload is honest: currently a textarea per game; real file upload
 *   requires a backend upload endpoint (documented below when ready)
 * - Validation is inline
 * - No alert() calls
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Users, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import TournamentFormLayout from "@/components/creator/host/TournamentFormLayout";
import { useWizard } from "@/context/TournamentWizardContext";

export default function HostTournamentStep3() {
  const router = useRouter();
  const {
    state,
    setPrizePool,
    setMaxTeamsPerGame,
    setHasWaitlist,
    setDescription,
    submitTournament,
    submitting,
  } = useWizard();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!state.description.trim()) e.description = "Description is required";
    if (state.prizePool.first && isNaN(Number(state.prizePool.first)))
      e.prize1 = "Must be a number";
    if (state.prizePool.second && isNaN(Number(state.prizePool.second)))
      e.prize2 = "Must be a number";
    if (state.prizePool.third && isNaN(Number(state.prizePool.third)))
      e.prize3 = "Must be a number";
    if (state.maxTeamsPerGame && isNaN(Number(state.maxTeamsPerGame)))
      e.maxTeams = "Must be a number";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitError("");
    const result = await submitTournament();

    if (result.success) {
      router.push(`/creator/host/tournament/complete?id=${result.tournamentId}`);
    } else {
      setSubmitError(result.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <TournamentFormLayout
      currentStep={3}
      onProceed={handleSubmit}
      proceedLabel={submitting ? "Submitting…" : "Submit Tournament"}
      proceedDisabled={submitting}
    >
      {/* Prize Pool */}
      <div>
        <label className="text-white font-semibold mb-1 block">Prize Pool</label>
        <p className="text-gray-500 text-sm mb-4">Optional — enter amounts in USD</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["first", "second", "third"] as const).map((place, i) => (
            <div key={place}>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block capitalize">
                {["1st", "2nd", "3rd"][i]} Place
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
                <input
                  type="number"
                  min={0}
                  value={state.prizePool[place]}
                  onChange={e => { setPrizePool({ [place]: e.target.value }); setErrors(er => ({ ...er, [`prize${i + 1}`]: "" })); }}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2.5 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>
              {errors[`prize${i + 1}`] && <p className="text-red-400 text-xs mt-1">{errors[`prize${i + 1}`]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Max teams per game + Waitlist row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-white font-semibold mb-1 block">Max Teams Per Game</label>
          <p className="text-gray-500 text-xs mb-3">Leave blank to use per-game settings from step 1</p>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
            <input
              type="number"
              min={1}
              value={state.maxTeamsPerGame}
              onChange={e => { setMaxTeamsPerGame(e.target.value); setErrors(er => ({ ...er, maxTeams: "" })); }}
              placeholder="e.g. 16"
              className="w-full pl-8 pr-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
            />
          </div>
          {errors.maxTeams && <p className="text-red-400 text-xs mt-1">{errors.maxTeams}</p>}
        </div>

        <div>
          <label className="text-white font-semibold mb-1 block">Waitlist</label>
          <p className="text-gray-500 text-xs mb-3">Allow teams to join a waitlist when slots are full</p>
          <button
            type="button"
            onClick={() => setHasWaitlist(!state.hasWaitlist)}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all text-sm font-semibold
              ${state.hasWaitlist
                ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-400"
                : "bg-white/5 border-gray-700 text-gray-400 hover:bg-white/10"}`}
          >
            {state.hasWaitlist
              ? <ToggleRight size={22} className="text-cyan-400" />
              : <ToggleLeft size={22} />}
            {state.hasWaitlist ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Tournament Description <span className="text-red-400">*</span>
        </label>
        <p className="text-gray-500 text-sm mb-3">
          Describe your tournament — format, prizes, eligibility, etc.
        </p>
        <textarea
          value={state.description}
          onChange={e => { setDescription(e.target.value); setErrors(er => ({ ...er, description: "" })); }}
          placeholder="Write a compelling description for your tournament…"
          rows={10}
          className={`w-full px-4 py-3 bg-[#0a2d36] border rounded-lg text-white placeholder-gray-600 focus:outline-none transition-colors resize-none text-sm leading-relaxed
            ${errors.description ? "border-red-500/60 focus:border-red-400" : "border-cyan-500/20 focus:border-cyan-400"}`}
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Submit error banner */}
      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
          {submitting && <Loader2 size={15} className="animate-spin shrink-0" />}
          {submitError}
        </div>
      )}

      {/* Summary panel — shows what will be submitted */}
      <div className="bg-[#051e26]/60 border border-cyan-500/10 rounded-xl p-5">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-semibold">Submission summary</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Title</span>
            <span className="text-white font-medium truncate max-w-xs text-right">{state.title || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Games</span>
            <span className="text-white font-medium">{state.games.length || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Stages</span>
            <span className="text-white font-medium">{state.schedules.length || "None"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tournament dates</span>
            <span className="text-white font-medium">
              {state.startDate && state.endDate
                ? `${new Date(state.startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(state.endDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status after submit</span>
            <span className="text-blue-400 font-semibold">Draft</span>
          </div>
        </div>
      </div>
    </TournamentFormLayout>
  );
}