"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, Loader2, Check, AlertCircle, Users } from "lucide-react";
import { joinTeam } from "@/lib/api/teams";

/**
 * JoinTeamPage
 * Route: /team/:slug  (public-facing join page)
 *
 * This page handles the "Join Team" endpoint:
 *   POST /:slug/join  { password? }
 *
 * No dedicated UI was provided in the design files, so this is
 * implemented as a clean, focused join screen consistent with the
 * overall GloroQ dark aesthetic.
 */
export default function JoinTeamPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teamName, setTeamName] = useState<string | null>(null);

  const handleJoin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await joinTeam(slug, password || undefined);
      if (res.success) {
        setTeamName(res.data?.name || "the team");
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/teams"), 2500);
      } else {
        setError(res.message || "Could not join team.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#020818] via-[#0a1628] to-[#020818] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-wider">
            Gloro<span className="text-cyan-400">Q</span>
          </h1>
        </div>

        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
          {!success ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                  <Users size={28} className="text-cyan-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-1">
                Join Team
              </h2>
              <p className="text-gray-400 text-sm text-center mb-8">
                You&apos;ve been invited to join{" "}
                <span className="text-cyan-400 font-semibold">{slug}</span>
              </p>

              {error && (
                <div className="mb-5 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Team Password{" "}
                  <span className="text-gray-600 font-normal">
                    (if private team)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter team password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                    className="w-full px-4 py-3 pl-11 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                  />
                </div>
              </div>

              <button
                onClick={handleJoin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white rounded-xl font-semibold transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Joining...
                  </>
                ) : (
                  "Join Team"
                )}
              </button>

              <p className="mt-4 text-center text-gray-600 text-xs">
                Leave the password field empty if the team is public
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-5 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Check size={28} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                You&apos;re In!
              </h2>
              <p className="text-gray-400 text-sm">
                Successfully joined{" "}
                <span className="text-cyan-400 font-semibold">{teamName}</span>
              </p>
              <p className="text-gray-600 text-xs mt-3">
                Redirecting to your teams...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
