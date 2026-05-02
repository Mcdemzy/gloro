"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Share2,
  Edit,
  Trash2,
  Users,
  UserPlus,
  X,
  Check,
  Loader2,
  AlertCircle,
  Clock,
  ChevronDown,
  LogOut,
  Upload,
  Camera,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getTeamById,
  updateTeam,
  removeMember,
  updateMemberRole,
  addMembers,
  extendJoinWindow,
  dissolveTeam,
  leaveTeam,
  getInviteLink,
  uploadTeamLogo,
  uploadTeamCover,
  Team,
  TeamMember,
} from "@/lib/api/teams";
import { useAuthStore } from "@/lib/store/auth/authStore";
import ProfileWarning from "@/components/dashboard/ProfileWarning";
import ShareModal from "@/components/dashboard/ShareModal";
import ConfirmModal from "./Confirmmodal";

interface TeamDetailContentProps {
  autoOpenEdit?: boolean;
  teamId: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Resolve creatorId whether the API returns it as a string or populated object
function getCreatorId(team: Team): string {
  if (!team.creatorId) return "";
  if (typeof team.creatorId === "string") return team.creatorId;
  return team.creatorId._id ?? "";
}

// ── Member row ────────────────────────────────────────────────────────────────
function MemberRow({
  member,
  isCreator,
  onUpdateRole,
  onRemove,
}: {
  member: TeamMember;
  isCreator: boolean;
  onUpdateRole: (userId: string, role: string) => Promise<void>;
  onRemove: (userId: string, name: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [roleInput, setRoleInput] = useState(member.role || "");
  const [saving, setSaving] = useState(false);

  const saveRole = async () => {
    if (!roleInput.trim() || roleInput === member.role) {
      setEditing(false);
      return;
    }
    setSaving(true);
    await onUpdateRole(member.userId._id, roleInput.trim());
    setSaving(false);
    setEditing(false);
  };

  const displayName =
    member.userId.firstName && member.userId.lastName
      ? `${member.userId.firstName} ${member.userId.lastName}`
      : member.userId.username;

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/[0.07] rounded-xl transition-all group">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {member.userId.avatar ? (
          <img
            src={member.userId.avatar}
            alt={displayName}
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-cyan-500/40 to-purple-500/40 flex items-center justify-center shrink-0 border border-cyan-400/20">
            <span className="text-white text-sm font-bold">
              {getInitials(displayName)}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <p className="text-white font-medium text-sm">{displayName}</p>
          {editing ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveRole()}
                className="px-2 py-0.5 bg-white/10 border border-cyan-400/40 rounded-lg text-white text-xs focus:outline-none w-28"
                autoFocus
              />
              <button
                onClick={saveRole}
                disabled={saving}
                className="p-1 text-green-400 hover:text-green-300"
              >
                {saving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Check size={12} />
                )}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setRoleInput(member.role || "");
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
          ) : member.role ? (
            <span
              onClick={() => isCreator && setEditing(true)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                member.role === "Team Lead"
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-white/10 text-gray-300"
              } ${isCreator ? "cursor-pointer hover:opacity-80" : ""}`}
              title={isCreator ? "Click to edit role" : undefined}
            >
              {member.role}
            </span>
          ) : null}
          <span className="text-gray-600 text-xs hidden sm:block">
            {member.userId.gloroId}
          </span>
        </div>
      </div>
      {isCreator && (
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
          <button
            onClick={() => setEditing(true)}
            title="Edit role"
            className="w-8 h-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-all"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onRemove(member.userId._id, displayName)}
            title="Remove member"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all"
          >
            <span className="text-base leading-none font-bold">−</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Edit Team Modal ───────────────────────────────────────────────────────────
function EditTeamModal({
  team,
  onClose,
  onSaved,
}: {
  team: Team;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description || "");
  const [maxMembers, setMaxMembers] = useState(team.maxMembers || 20);
  const [isPrivate, setIsPrivate] = useState(team.isPrivate);
  const [accessPassword, setAccessPassword] = useState("");

  // Logo
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    team.logo || null,
  );
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Cover
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    team.coverImage || null,
  );
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name.trim()) return setError("Team name is required.");
    setLoading(true);
    setError(null);
    try {
      // 1. Update text fields
      const payload: Parameters<typeof updateTeam>[1] = {
        name: name.trim(),
        description: description.trim(),
        maxMembers,
        isPrivate,
      };
      if (isPrivate && accessPassword) payload.accessPassword = accessPassword;
      const res = await updateTeam(team._id, payload);
      if (!res.success) {
        setError(res.message || "Update failed.");
        return;
      }

      // 2. Upload logo if changed
      if (logoFile) {
        await uploadTeamLogo(team._id, logoFile);
      }

      // 3. Upload cover if changed
      if (coverFile) {
        await uploadTeamCover(team._id, coverFile);
      }

      onSaved();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#0a1628] border border-[#455872] rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 sticky top-0 bg-[#0a1628] z-10 border-b border-white/5">
          <div className="flex items-center gap-3">
            {/* Editable logo inline (matching design) */}
            <div className="relative w-12 h-12 shrink-0">
              <div
                className="w-12 h-12 rounded-xl overflow-hidden bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 cursor-pointer"
                onClick={() => logoInputRef.current?.click()}
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {getInitials(name || "T")}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => logoInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow"
              >
                <Camera size={10} className="text-white" />
              </button>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Team name"
              className="bg-transparent text-white font-bold text-xl focus:outline-none border-b border-transparent focus:border-cyan-400/50 transition-colors w-52 truncate"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-all"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Save
          </button>
        </div>

        <div className="px-8 py-6 space-y-5">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Cover image */}
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Cover Image
            </label>
            <div
              className="relative w-full h-36 rounded-xl overflow-hidden bg-gradient-to-br from-[#1a2744] to-[#0d1628] border border-[#455872] cursor-pointer group"
              onClick={() => coverInputRef.current?.click()}
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                  <Upload size={24} />
                  <span className="text-xs">Click to upload cover image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  <Camera size={18} /> Change Cover
                </div>
              </div>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Description / Team Slogan
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description / Team Slogan"
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-colors resize-none text-sm"
            />
          </div>

          {/* Max Members */}
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Max Members
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={maxMembers}
              onChange={(e) =>
                setMaxMembers(Math.max(1, Math.min(50, Number(e.target.value))))
              }
              className="w-full px-4 py-3 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Privacy */}
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Privacy
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setIsPrivate(val)}
                  className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    isPrivate === val
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                      : "bg-white/5 border-[#455872] text-gray-400 hover:border-cyan-400/40"
                  }`}
                >
                  {val ? "Private" : "Public"}
                </button>
              ))}
            </div>
          </div>

          {/* Password — only when private */}
          {isPrivate && (
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                New Access Password{" "}
                <span className="text-gray-600 font-normal">
                  (leave empty to keep current)
                </span>
              </label>
              <input
                type="password"
                value={accessPassword}
                onChange={(e) => setAccessPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-colors text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TeamDetailContent({
  teamId,
  autoOpenEdit = false,
}: TeamDetailContentProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);

  // Share
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [loadingInvite, setLoadingInvite] = useState(false);

  // Add members
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [newMemberInput, setNewMemberInput] = useState("");
  const [newMemberIds, setNewMemberIds] = useState<string[]>([]);
  const [addingMembers, setAddingMembers] = useState(false);
  const [addMemberError, setAddMemberError] = useState<string | null>(null);

  // Extend
  const [extending, setExtending] = useState(false);
  const [extendMsg, setExtendMsg] = useState<string | null>(null);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  // Confirm modals
  const [confirmDissolve, setConfirmDissolve] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<{
    userId: string;
    name: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAuthError(false);
    try {
      const res = await getTeamById(teamId);
      if (res.success) {
        setTeam(res.data);
      } else if (
        res.message?.toLowerCase().includes("token") ||
        res.message?.toLowerCase().includes("unauthorized") ||
        res.status === "error"
      ) {
        setAuthError(true);
      } else {
        setError(res.message || "Team not found.");
      }
    } catch {
      setError("Network error. Could not load team.");
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    if (teamId) fetchTeam();
  }, [fetchTeam, teamId]);

  useEffect(() => {
    if (authError) {
      clearAuth();
      router.replace(`/auth/login?callbackUrl=/dashboard/teams/${teamId}`);
    }
  }, [authError, clearAuth, router, teamId]);

  // ── isCreator: handle both string and object creatorId ──
  const isCreator = Boolean(
    user &&
    team &&
    (() => {
      const cid = getCreatorId(team);
      return (
        cid &&
        (cid === user._id ||
          cid === (user as unknown as Record<string, unknown>).id)
      );
    })(),
  );

  // Auto-open edit modal if navigated with ?edit=1
  useEffect(() => {
    if (autoOpenEdit && team && isCreator) setShowEditModal(true);
  }, [autoOpenEdit, team, isCreator]);

  // Redirect to login if auth error
  // Auto-open edit modal if navigated with ?edit=1
  useEffect(() => {
    if (autoOpenEdit && team && isCreator) setShowEditModal(true);
  }, [autoOpenEdit, team, isCreator]);

  // ── Share ──
  const handleShare = async () => {
    setLoadingInvite(true);
    try {
      const res = await getInviteLink(teamId);
      setShareUrl(
        res.success
          ? res.data.inviteLink
          : `${window.location.origin}/team/${team?.slug}`,
      );
    } catch {
      setShareUrl(`${window.location.origin}/team/${team?.slug}`);
    } finally {
      setLoadingInvite(false);
      setShowShareModal(true);
    }
  };

  // ── Role update ──
  const handleUpdateRole = async (userId: string, role: string) => {
    const res = await updateMemberRole(teamId, userId, role);
    if (res.success) await fetchTeam();
  };

  // ── Remove member ──
  const handleRemoveMember = async () => {
    if (!confirmRemove) return;
    setActionLoading(true);
    try {
      const res = await removeMember(teamId, confirmRemove.userId);
      if (res.success) {
        setConfirmRemove(null);
        await fetchTeam();
      }
    } finally {
      setActionLoading(false);
    }
  };

  // ── Add members ──
  const handleAddMemberId = () => {
    const trimmed = newMemberInput.trim();
    if (!trimmed || newMemberIds.includes(trimmed)) return;
    setNewMemberIds((p) => [...p, trimmed]);
    setNewMemberInput("");
  };

  const handleSubmitAddMembers = async () => {
    if (!newMemberIds.length) return;
    setAddingMembers(true);
    setAddMemberError(null);
    try {
      const res = await addMembers(teamId, newMemberIds);
      if (res.success) {
        setNewMemberIds([]);
        setShowAddMembers(false);
        await fetchTeam();
      } else setAddMemberError(res.message || "Failed to add members.");
    } catch {
      setAddMemberError("Network error.");
    } finally {
      setAddingMembers(false);
    }
  };

  // ── Extend ──
  const handleExtend = async () => {
    setExtending(true);
    setExtendMsg(null);
    try {
      const res = await extendJoinWindow(teamId);
      setExtendMsg(
        res.success
          ? res.message || "Extended!"
          : res.message || "Could not extend.",
      );
      if (res.success) await fetchTeam();
    } catch {
      setExtendMsg("Network error.");
    } finally {
      setExtending(false);
    }
  };

  // ── Leave ──
  const handleLeave = async () => {
    setActionLoading(true);
    try {
      const res = await leaveTeam(teamId);
      if (res.success) router.push("/dashboard/teams");
    } finally {
      setActionLoading(false);
      setConfirmLeave(false);
    }
  };

  // ── Dissolve ──
  const handleDissolve = async () => {
    setActionLoading(true);
    try {
      const res = await dissolveTeam(teamId);
      if (res.success) router.push("/dashboard/teams");
    } finally {
      setActionLoading(false);
      setConfirmDissolve(false);
    }
  };

  // ── Join window label ──
  const jwLabel = (() => {
    if (!team?.joinWindowExpiry) return null;
    const diff = new Date(team.joinWindowExpiry).getTime() - Date.now();
    if (diff <= 0) return { expired: true, label: "Closed" };
    return {
      expired: false,
      label: `${Math.ceil(diff / 86400000)}d remaining`,
    };
  })();

  // ─────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={36} className="text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (authError) return null; // redirect in progress

  if (error || !team) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <AlertCircle size={40} className="text-red-400" />
        <p className="text-gray-400">{error || "Team not found."}</p>
        <button
          onClick={() => router.push("/dashboard/teams")}
          className="px-5 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/30"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileWarning progress={33} />

      {/* ── Team Header / Hero Banner ── */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative min-h-[300px] md:min-h-[340px]">
          {/* Cover image */}
          {team.coverImage ? (
            <img
              src={team.coverImage}
              alt={team.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#16345f_0%,#091120_55%,#05070d_100%)]" />
          )}

          {/* Film / cinematic overlays */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a1628] via-[#0a1628]/45 to-black/10" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-size-[26px_26px] opacity-20" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />

          {/* Top pills */}
          <div className="absolute top-5 right-5 flex flex-wrap justify-end gap-2 z-20">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                team.status === "active"
                  ? "bg-green-500/15 text-green-400 border-green-500/30"
                  : "bg-red-500/15 text-red-400 border-red-500/30"
              }`}
            >
              {team.status}
            </span>

            <span className="px-4 py-1.5 rounded-full text-xs font-semibold border bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
              • {team.currentTournaments ?? 0} Tournaments
            </span>

            {jwLabel && (
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                  jwLabel.expired
                    ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
                    : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
                }`}
              >
                <Clock size={12} />
                {jwLabel.label}
              </span>
            )}
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
            {/* Logo + Text */}
            <div className="flex items-end gap-5">
              {/* Logo */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl bg-white/5 backdrop-blur-md shrink-0">
                {team.logo ? (
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white">
                    {getInitials(team.name)}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="pb-1">
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {team.name}
                </h1>

                {team.description && (
                  <p className="text-gray-300 mt-2 max-w-2xl text-sm md:text-lg">
                    {team.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="px-6 md:px-8 py-5 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-4">
              {/* Main actions */}
              <div className="flex flex-wrap gap-3">
                {isCreator && (
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="px-5 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={handleShare}
                  disabled={loadingInvite}
                  className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                >
                  {loadingInvite ? (
                    <Loader2 size={15} className="animate-spin inline mr-1" />
                  ) : (
                    "Share"
                  )}
                </button>

                {isCreator ? (
                  <button
                    onClick={() => setConfirmDissolve(true)}
                    className="px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmLeave(true)}
                    className="px-5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    Leave
                  </button>
                )}
              </div>
            </div>

            {/* Row 2 Creator controls */}
            {isCreator && (
              <div className="flex flex-wrap gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={handleExtend}
                  disabled={extending}
                  className="px-4 py-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 text-sm transition"
                >
                  {extending ? (
                    <Loader2 size={14} className="animate-spin inline mr-1" />
                  ) : (
                    <Clock size={14} className="inline mr-1" />
                  )}
                  Extend Join Window
                </button>

                <button
                  onClick={() => setShowAddMembers((v) => !v)}
                  className="px-4 py-2 rounded-xl bg-green-500/15 text-green-300 border border-green-500/30 hover:bg-green-500/25 text-sm transition flex items-center gap-2"
                >
                  + Add Members
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      showAddMembers ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {extendMsg && (
                  <p className="text-yellow-300 text-sm self-center">
                    {extendMsg}
                  </p>
                )}
              </div>
            )}

            {/* Add members panel */}
            {isCreator && showAddMembers && (
              <div className="mt-2 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                {addMemberError && (
                  <p className="text-red-400 text-sm">{addMemberError}</p>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="GLR-123456"
                    value={newMemberInput}
                    onChange={(e) => setNewMemberInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddMemberId()}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
                  />

                  <button
                    onClick={handleAddMemberId}
                    className="px-4 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600"
                  >
                    <UserPlus size={16} />
                  </button>
                </div>

                {newMemberIds.length > 0 && (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {newMemberIds.map((id) => (
                        <span
                          key={id}
                          className="px-3 py-1 rounded-full bg-white/10 text-white text-xs flex items-center gap-2"
                        >
                          {id}
                          <button
                            onClick={() =>
                              setNewMemberIds((p) => p.filter((x) => x !== id))
                            }
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={handleSubmitAddMembers}
                      disabled={addingMembers}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 text-sm"
                    >
                      {addingMembers
                        ? "Adding..."
                        : `Confirm Add ${newMemberIds.length}`}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Members ── */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-5">
          <Users size={20} className="text-cyan-400" />
          Members ({team.members.length}
          {team.maxMembers ? `/${team.maxMembers}` : ""})
        </h2>
        {team.members.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>No members yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {team.members.map((member) => (
              <MemberRow
                key={member.userId._id}
                member={member}
                isCreator={isCreator}
                onUpdateRole={handleUpdateRole}
                onRemove={(userId, name) => setConfirmRemove({ userId, name })}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {showEditModal && (
        <EditTeamModal
          team={team}
          onClose={() => setShowEditModal(false)}
          onSaved={async () => {
            setShowEditModal(false);
            await fetchTeam();
          }}
        />
      )}

      {confirmDissolve && (
        <ConfirmModal
          title="Dissolve Team"
          message={`Are you sure you want to permanently dissolve "${team.name}"? All members will be removed and this cannot be undone.`}
          confirmLabel="Dissolve"
          loading={actionLoading}
          onConfirm={handleDissolve}
          onCancel={() => setConfirmDissolve(false)}
        />
      )}

      {confirmLeave && (
        <ConfirmModal
          title="Leave Team"
          message={`Are you sure you want to leave "${team.name}"?`}
          confirmLabel="Leave"
          variant="warning"
          loading={actionLoading}
          onConfirm={handleLeave}
          onCancel={() => setConfirmLeave(false)}
        />
      )}

      {confirmRemove && (
        <ConfirmModal
          title="Remove Member"
          message={`Remove ${confirmRemove.name} from "${team.name}"?`}
          confirmLabel="Remove"
          loading={actionLoading}
          onConfirm={handleRemoveMember}
          onCancel={() => setConfirmRemove(null)}
        />
      )}

      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
