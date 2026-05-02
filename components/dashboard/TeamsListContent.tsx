"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Share2, Users, Plus, Loader2, AlertCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMyTeams, getInviteLink, dissolveTeam, Team } from "@/lib/api/teams";
import { useAuthStore } from "@/lib/store/auth/authStore";
import ProfileWarning from "@/components/dashboard/ProfileWarning";
import ShareModal from "@/components/dashboard/ShareModal";
import ConfirmModal from "./Confirmmodal";

export default function TeamsListContent() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [shareUrl, setShareUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loadingInvite, setLoadingInvite] = useState<string | null>(null);

  // Confirm dissolve
  const [confirmDissolve, setConfirmDissolve] = useState<Team | null>(null);
  const [dissolving, setDissolving] = useState(false);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyTeams();
      if (res.success) setTeams(res.data || []);
      else setError(res.message || "Failed to load teams.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTeams(); }, [fetchTeams]);

  const handleShare = async (teamId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingInvite(teamId);
    try {
      const res = await getInviteLink(teamId);
      const team = teams.find((t) => t._id === teamId);
      setShareUrl(
        res.success ? res.data.inviteLink : `${window.location.origin}/team/${team?.slug || teamId}`
      );
    } catch {
      const team = teams.find((t) => t._id === teamId);
      setShareUrl(`${window.location.origin}/team/${team?.slug || teamId}`);
    } finally {
      setLoadingInvite(null);
      setShowShareModal(true);
    }
  };

  const handleEdit = (e: React.MouseEvent, teamId: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to detail page and open edit — we store intent in query
    router.push(`/dashboard/teams/${teamId}?edit=1`);
  };

  const handleDissolveConfirm = async () => {
    if (!confirmDissolve) return;
    setDissolving(true);
    try {
      const res = await dissolveTeam(confirmDissolve._id);
      if (res.success) {
        setTeams((prev) => prev.filter((t) => t._id !== confirmDissolve._id));
        setConfirmDissolve(null);
      }
    } finally {
      setDissolving(false);
    }
  };

  // Check if user is creator of a team
  const isCreatorOf = (team: Team) => {
    if (!user || !team.creatorId) return false;
    const cid = typeof team.creatorId === "string" ? team.creatorId : team.creatorId._id;
    return cid === user._id || cid === (user as unknown as Record<string, unknown>).id;
  };

  return (
    <div className="space-y-6">
      <ProfileWarning progress={33} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Teams</h2>
        <Link
          href="/dashboard/teams/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all text-sm"
        >
          <Plus size={16} /> Create new team
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={32} className="text-cyan-400 animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <AlertCircle size={40} className="text-red-400" />
          <p className="text-gray-400">{error}</p>
          <button onClick={fetchTeams}
            className="px-5 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/30">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && teams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-[#0a1628] border border-[#455872] rounded-2xl">
          <Users size={48} className="text-gray-600" />
          <p className="text-gray-400 text-lg">You haven&apos;t joined any teams yet</p>
          <Link href="/dashboard/teams/create"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all">
            Create your first team
          </Link>
        </div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => {
            const creator = isCreatorOf(team);
            return (
              <Link
                key={team._id}
                href={`/dashboard/teams/${team._id}`}
                className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all cursor-pointer group"
              >
                {/* Cover / Logo */}
                <div className="relative h-44 bg-gradient-to-br from-[#1a2744] to-[#0d1628]">
                  {team.coverImage ? (
                    <div className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${team.coverImage})` }} />
                  ) : team.logo ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={team.logo} alt={team.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#455872]" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center border border-cyan-400/20">
                        <span className="text-3xl font-bold text-white/60">
                          {team.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      team.status === "active"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : team.status === "expired"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>{team.status}</span>
                  </div>

                  {/* Creator action buttons top-right */}
                  {creator && (
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEdit(e, team._id)}
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-cyan-500/80 flex items-center justify-center text-white transition-all"
                        title="Edit team"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmDissolve(team); }}
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-red-500/80 flex items-center justify-center text-white transition-all"
                        title="Dissolve team"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors truncate">
                    {team.name}
                  </h3>
                  {team.description && (
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{team.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Users size={14} />
                      <span>
                        {team.members.length}
                        {team.maxMembers ? `/${team.maxMembers}` : ""}{" "}
                        member{team.members.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleShare(team._id, e)}
                      disabled={loadingInvite === team._id}
                      className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                      title="Share invite link"
                    >
                      {loadingInvite === team._id
                        ? <Loader2 size={16} className="animate-spin" />
                        : <Share2 size={16} />}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Dissolve confirm */}
      {confirmDissolve && (
        <ConfirmModal
          title="Dissolve Team"
          message={`Permanently dissolve "${confirmDissolve.name}"? All members will be removed and this cannot be undone.`}
          confirmLabel="Dissolve"
          loading={dissolving}
          onConfirm={handleDissolveConfirm}
          onCancel={() => setConfirmDissolve(null)}
        />
      )}

      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}