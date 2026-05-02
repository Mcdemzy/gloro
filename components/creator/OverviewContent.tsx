"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Loader2,
  AlertCircle,
  Trophy,
  Eye,
  Users,
  Calendar,
  Trash2,
  Settings,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  getAllTournaments,
  deleteTournament,
  publishTournament,
  Tournament,
  TournamentStatus,
} from "@/lib/api/tournaments";
import { useAuthStore } from "@/lib/store/auth/authStore";
import ConfirmModal from "@/components/dashboard/Confirmmodal";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Extracts the user's string ID from the auth store user object.
 * Handles both `_id` and `id` shapes that backends commonly return.
 */
function extractUserId(user: unknown): string | null {
  if (!user || typeof user !== "object") return null;
  const u = user as Record<string, unknown>;
  // Prefer _id, then id
  const raw = u._id ?? u.id;
  if (!raw) return null;
  // raw might itself be an object like { _id: "..." }
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && raw !== null) {
    const inner =
      (raw as Record<string, unknown>)._id ??
      (raw as Record<string, unknown>).id;
    return typeof inner === "string" ? inner : null;
  }
  return null;
}

/**
 * Compares a tournament's creatorId against the current user's ID.
 *
 * The API may return creatorId as:
 *   - a plain string  → "67abc123"
 *   - a populated obj → { _id: "67abc123", username: "..." }
 *
 * This handles both cases.
 */
function isMine(tournament: Tournament, uid: string): boolean {
  const c = tournament.creatorId as unknown;
  if (!c) return false;
  if (typeof c === "string") return c === uid;
  if (typeof c === "object" && c !== null) {
    const obj = c as Record<string, unknown>;
    return obj._id === uid || obj.id === uid;
  }
  return false;
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: TournamentStatus }) {
  const map: Record<TournamentStatus, { label: string; cls: string }> = {
    completed: {
      label: "✓ Completed",
      cls: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20",
    },
    ongoing: {
      label: "● Active",
      cls: "bg-green-500/20 text-green-400 border border-green-500/20",
    },
    registration_open: {
      label: "● Registration Open",
      cls: "bg-green-500/20 text-green-400 border border-green-500/20",
    },
    published: {
      label: "Published",
      cls: "bg-blue-500/20 text-blue-400 border border-blue-500/20",
    },
    draft: {
      label: "📄 Draft",
      cls: "bg-gray-500/20 text-gray-400 border border-gray-500/20",
    },
    cancelled: {
      label: "Cancelled",
      cls: "bg-red-500/20 text-red-400 border border-red-500/20",
    },
  };
  const { label, cls } = map[status] ?? {
    label: status,
    cls: "bg-gray-500/20 text-gray-400 border border-gray-500/20",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/10 rounded-lg w-3/4" />
        <div className="h-4 bg-white/5 rounded-lg w-1/2" />
        <div className="h-3 bg-white/5 rounded-lg w-2/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-white/10 rounded-xl flex-1" />
          <div className="h-8 bg-cyan-500/10 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const CreatorOverviewContent = () => {
  const user = useAuthStore((s) => s.user);

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Publishing
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [publishMsg, setPublishMsg] = useState<{
    id: string;
    msg: string;
    ok: boolean;
  } | null>(null);

  // Delete confirm
  const [confirmDelete, setConfirmDelete] = useState<Tournament | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTournaments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllTournaments({ limit: 50 });

      if (res.success) {
        const all: Tournament[] = Array.isArray(res.data) ? res.data : [];

        const uid = extractUserId(user);

        // If we can resolve the current user's ID, filter to their tournaments.
        // Otherwise fall back to showing everything (e.g. during initial hydration).
        const mine = uid ? all.filter((t) => isMine(t, uid)) : all;

        setTournaments(mine);
      } else {
        setError(res.message || "Failed to load tournaments.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const handlePublish = async (id: string) => {
    setPublishingId(id);
    setPublishMsg(null);
    try {
      const res = await publishTournament(id);
      setPublishMsg({
        id,
        msg: res.success ? "Published!" : res.message || "Failed.",
        ok: res.success,
      });
      if (res.success) await fetchTournaments();
    } catch {
      setPublishMsg({ id, msg: "Network error.", ok: false });
    } finally {
      setPublishingId(null);
      setTimeout(() => setPublishMsg(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await deleteTournament(confirmDelete._id);
      if (res.success) {
        setTournaments((prev) =>
          prev.filter((t) => t._id !== confirmDelete._id),
        );
        setConfirmDelete(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const displayedTournaments = tournaments.slice(0, 4);

  const activeCount = tournaments.filter(
    (t) => t.status === "ongoing" || t.status === "registration_open",
  ).length;
  const draftCount = tournaments.filter((t) => t.status === "draft").length;
  const completedCount = tournaments.filter(
    (t) => t.status === "completed",
  ).length;

  return (
    <>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-1 orbitron">
            Overview
          </h1>
          <p className="text-cyan-300/60 text-sm">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="px-5 py-2.5 bg-[#063745] hover:bg-[#0a4a5a] text-white rounded-xl font-semibold transition-all text-sm"
        >
          Switch to User Dashboard
        </Link>
      </div>

      {/* ── Stats + CTA row ── */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        {/* Total tournaments */}
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 shadow-xl min-w-[180px]">
          <p className="text-cyan-300/70 text-sm mb-1">Total Tournaments</p>
          {loading ? (
            <div className="w-12 h-10 bg-white/10 rounded animate-pulse" />
          ) : (
            <p className="text-5xl font-bold text-white">
              {tournaments.length}
            </p>
          )}
        </div>

        {/* Quick stats */}
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Active", count: activeCount, color: "text-green-400" },
            { label: "Drafts", count: draftCount, color: "text-gray-400" },
            {
              label: "Completed",
              count: completedCount,
              color: "text-cyan-400",
            },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              className="bg-gradient-to-br from-[#0c3540]/40 to-[#0a2d36]/40 border border-cyan-500/10 rounded-xl p-4 min-w-[100px] text-center"
            >
              <p className={`text-2xl font-bold ${color}`}>
                {loading ? "—" : count}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/creator/host/tournament"
          className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/40 text-sm"
        >
          <Plus size={18} /> Create New Tournament
        </Link>
      </div>

      {/* ── My Tournaments header ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">My Tournaments</h2>
        <div className="flex items-center gap-3">
          {/* Manual refresh */}
          <button
            onClick={fetchTournaments}
            disabled={loading}
            className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/creator/tournaments"
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-semibold"
          >
            See all
          </Link>
        </div>
      </div>

      {/* ── Loading skeletons ── */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ── Error state ── */}
      {!loading && error && (
        <div className="flex flex-col items-center py-16 gap-4">
          <AlertCircle size={36} className="text-red-400" />
          <p className="text-gray-400">{error}</p>
          <button
            onClick={fetchTournaments}
            className="px-5 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/30 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && tournaments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-gradient-to-br from-[#0c3540]/30 to-[#0a2d36]/30 border border-cyan-500/10 rounded-2xl">
          <Trophy size={48} className="text-cyan-400/30" />
          <p className="text-gray-400 text-lg">No tournaments yet</p>
          <Link
            href="/creator/host/tournament"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold text-sm transition-all"
          >
            Create your first tournament
          </Link>
        </div>
      )}

      {/* ── Tournament cards ── */}
      {!loading && !error && tournaments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedTournaments.map((t) => (
            <div
              key={t._id}
              className="group bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Cover image */}
              <div className="relative overflow-hidden h-44">
                {t.coverImage ? (
                  <img
                    src={t.coverImage}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a2744] to-[#0d1628] flex items-center justify-center">
                    <Trophy size={40} className="text-cyan-400/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d36] via-transparent to-transparent" />

                {/* Hover action buttons */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/creator/tournaments/${t._id}/edit`}
                    className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-cyan-500/80 flex items-center justify-center text-white transition-all"
                    title="Edit"
                  >
                    <Settings size={14} />
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(t)}
                    className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-red-500/80 flex items-center justify-center text-white transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors orbitron truncate">
                  {t.title}
                </h3>

                {t.prizePool?.first && (
                  <p className="text-green-400 font-bold text-sm">
                    Prize: ${t.prizePool.first.toLocaleString()}
                  </p>
                )}

                <div className="flex items-center gap-2 text-cyan-300/60 text-xs">
                  <Calendar size={12} />
                  <span>
                    {formatDate(t.startDate)} — {formatDate(t.endDate)}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {t.totalTeams !== undefined && (
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <Users size={12} /> {t.totalTeams} teams
                    </span>
                  )}
                  {t.views !== undefined && (
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <Eye size={12} /> {t.views} views
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <StatusBadge status={t.status} />
                </div>

                {/* Publish feedback message */}
                {publishMsg?.id === t._id && (
                  <p
                    className={`text-xs font-medium ${
                      publishMsg.ok ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {publishMsg.msg}
                  </p>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 pt-1">
                  {t.status === "draft" && (
                    <button
                      onClick={() => handlePublish(t._id)}
                      disabled={publishingId === t._id}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl text-xs font-semibold transition-all border border-green-500/20 disabled:opacity-60"
                    >
                      {publishingId === t._id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : null}
                      Publish
                    </button>
                  )}
                  <Link
                    href={`/creator/tournaments/${t._id}/managers`}
                    className="flex-1 text-center py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-400 rounded-xl text-xs font-semibold transition-all"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete confirm modal ── */}
      {confirmDelete && (
        <ConfirmModal
          title="Delete Tournament"
          message={`Permanently delete "${confirmDelete.title}"? This cannot be undone.`}
          confirmLabel="Delete"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </>
  );
};

export default CreatorOverviewContent;
