"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  Trophy,
  Gamepad2,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Loader2,
  AlertCircle,
  RefreshCw,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Hourglass,
  Globe,
  Ban,
  Save,
  ImageIcon,
  DollarSign,
  Shield,
  ChevronDown,
  ChevronUp,
  ListOrdered,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  getTournamentRegistrations,
  updateRegistrationStatus,
  addGameToTournament,
  updateTournamentGame,
  removeTournamentGame,
  addScheduleToTournament,
  updateTournamentSchedule,
  removeTournamentSchedule,
  updateTournament,
  deleteTournament,
  publishTournament,
  getTournamentBySlug,
  Tournament,
  TournamentGame,
  TournamentSchedule,
  RegistrationStatus,
  UpdateTournamentPayload,
} from "@/lib/api/tournaments";
import { getAllGames, Game } from "@/lib/api/games";
import ConfirmModal from "@/components/dashboard/Confirmmodal";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Registration {
  _id: string;
  teamId: { name: string; slug: string } | string;
  teamName: string;
  gameName: string;
  status: RegistrationStatus;
  registeredAt: string;
  rejectionReason?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toInputDate(d?: string) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────
// Status Badge (Tournament)
// ─────────────────────────────────────────────

function TournamentStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    completed: { label: "Completed", cls: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
    ongoing: { label: "● Active", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    registration_open: { label: "● Reg. Open", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    published: { label: "Published", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    draft: { label: "Draft", cls: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    cancelled: { label: "Cancelled", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const { label, cls } = map[status] ?? { label: status, cls: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Registration Status Badge
// ─────────────────────────────────────────────

function RegStatusBadge({ status }: { status: RegistrationStatus }) {
  const map: Record<RegistrationStatus, { label: string; cls: string; icon: React.ReactNode }> = {
    pending:    { label: "Pending",    cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: <Hourglass size={11} /> },
    confirmed:  { label: "Confirmed",  cls: "bg-green-500/20 text-green-400 border-green-500/30",   icon: <CheckCircle2 size={11} /> },
    rejected:   { label: "Rejected",   cls: "bg-red-500/20 text-red-400 border-red-500/30",         icon: <XCircle size={11} /> },
    cancelled:  { label: "Cancelled",  cls: "bg-gray-500/20 text-gray-400 border-gray-500/30",      icon: <Ban size={11} /> },
    waitlisted: { label: "Waitlisted", cls: "bg-purple-500/20 text-purple-400 border-purple-500/30",icon: <Clock size={11} /> },
  };
  const { label, cls, icon } = map[status] ?? { label: status, cls: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: null };
  return (
    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {icon}{label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Tabs config
// ─────────────────────────────────────────────

const TABS = [
  { id: "overview",      label: "Overview",      icon: Trophy },
  { id: "games",         label: "Games",         icon: Gamepad2 },
  { id: "schedules",     label: "Schedules",     icon: Calendar },
  { id: "registrations", label: "Registrations", icon: Users },
  { id: "analytics",     label: "Analytics",     icon: BarChart3 },
  { id: "settings",      label: "Settings",      icon: Settings },
];

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

const TournamentManagersPage = () => {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params?.id as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch tournament by ID (using slug endpoint as per existing pattern)
  const fetchTournament = useCallback(async () => {
    if (!tournamentId) return;
    setLoading(true);
    setError(null);
    try {
      // The route param is the MongoDB _id; we use getAllTournaments or a direct fetch
      // Since getTournamentBySlug exists and the overview links here with _id,
      // we call the ID-based general fetch
      const res = await fetch(
        `${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/auth\/?$/, "")}/tournaments/${tournamentId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success) {
        setTournament(data.data);
      } else {
        setError(data.message || "Failed to load tournament.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [tournamentId]);

  useEffect(() => {
    fetchTournament();
  }, [fetchTournament]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020818]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="text-cyan-400 animate-spin" />
          <p className="text-gray-400 text-sm">Loading tournament…</p>
        </div>
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020818]">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle size={32} className="text-red-400" />
          <p className="text-gray-400">{error || "Tournament not found."}</p>
          <button
            onClick={fetchTournament}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#020818] via-[#0a1628] to-[#020818] text-white">
      {/* ── Top Header ── */}
      <div className="border-b border-cyan-500/10 bg-[#020818]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Cover thumb */}
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-[#1a2744] to-[#0d1628] flex-shrink-0">
            {tournament.coverImage ? (
              <img src={tournament.coverImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Trophy size={18} className="text-cyan-400/40" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate orbitron">{tournament.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <TournamentStatusBadge status={tournament.status} />
              <span className="text-gray-500 text-xs">
                {formatDate(tournament.startDate)} — {formatDate(tournament.endDate)}
              </span>
            </div>
          </div>

          <button
            onClick={fetchTournament}
            className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
            title="Refresh"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview"      && <OverviewTab tournament={tournament} />}
        {activeTab === "games"         && <GamesTab tournament={tournament} tournamentId={tournamentId} onRefresh={fetchTournament} />}
        {activeTab === "schedules"     && <SchedulesTab tournament={tournament} tournamentId={tournamentId} onRefresh={fetchTournament} />}
        {activeTab === "registrations" && <RegistrationsTab tournamentId={tournamentId} />}
        {activeTab === "analytics"     && <AnalyticsTab tournament={tournament} />}
        {activeTab === "settings"      && <SettingsTab tournament={tournament} tournamentId={tournamentId} onRefresh={fetchTournament} router={router} />}
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════
// TAB: Overview
// ═════════════════════════════════════════════

function OverviewTab({ tournament }: { tournament: Tournament }) {
  return (
    <div className="space-y-6">
      {/* Hero cover */}
      {tournament.coverImage && (
        <div className="relative h-56 rounded-2xl overflow-hidden">
          <img src={tournament.coverImage} alt={tournament.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020818] via-[#020818]/40 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-bold text-white orbitron">{tournament.title}</h2>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Teams",    value: tournament.totalTeams ?? 0,            icon: <Users size={18} />,    color: "text-cyan-400" },
          { label: "Views",          value: tournament.views ?? 0,                 icon: <Eye size={18} />,      color: "text-blue-400" },
          { label: "Games",          value: tournament.games?.length ?? 0,          icon: <Gamepad2 size={18} />, color: "text-purple-400" },
          { label: "Schedule Stages",value: tournament.schedules?.length ?? 0,      icon: <Calendar size={18} />, color: "text-green-400" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-5">
            <div className={`mb-2 ${color}`}>{icon}</div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Prize pool */}
      {tournament.prizePool && (
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-green-400" /> Prize Pool
          </h3>
          <div className="flex gap-6 flex-wrap">
            {tournament.prizePool.first  && <div><p className="text-yellow-400 font-bold text-xl">${tournament.prizePool.first.toLocaleString()}</p><p className="text-gray-500 text-xs">1st Place</p></div>}
            {tournament.prizePool.second && <div><p className="text-gray-300 font-bold text-xl">${tournament.prizePool.second.toLocaleString()}</p><p className="text-gray-500 text-xs">2nd Place</p></div>}
            {tournament.prizePool.third  && <div><p className="text-orange-400 font-bold text-xl">${tournament.prizePool.third.toLocaleString()}</p><p className="text-gray-500 text-xs">3rd Place</p></div>}
          </div>
        </div>
      )}

      {/* Tournament details */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-bold">Tournament Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Start Date",            value: formatDate(tournament.startDate) },
            { label: "End Date",              value: formatDate(tournament.endDate) },
            { label: "Registration Opens",    value: formatDate(tournament.registrationOpenDate) },
            { label: "Registration Closes",   value: formatDate(tournament.registrationCloseDate) },
            { label: "Max Teams Per Game",    value: tournament.maxTeamsPerGame ?? "—" },
            { label: "Waitlist",              value: tournament.hasWaitlist ? "Enabled" : "Disabled" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400 text-sm">{label}</span>
              <span className="text-white text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      {tournament.description && (
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Description</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{tournament.description}</p>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════
// TAB: Games
// ═════════════════════════════════════════════

function GamesTab({
  tournament,
  tournamentId,
  onRefresh,
}: {
  tournament: Tournament;
  tournamentId: string;
  onRefresh: () => void;
}) {
  const [games, setGames] = useState<Game[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGame, setEditingGame] = useState<TournamentGame | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<TournamentGame | null>(null);
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);

  // Add form state
  const [addForm, setAddForm] = useState({
    gameId: "",
    minTeamMembers: 1,
    maxTeamMembers: 5,
    maxTeams: 16,
    rules: "",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    minTeamMembers: 1,
    maxTeamMembers: 5,
    maxTeams: 16,
    rules: "",
  });

  useEffect(() => {
    getAllGames().then((res) => {
      if (res.success) setGames(res.data || []);
    });
  }, []);

  const handleAdd = async () => {
    if (!addForm.gameId) return;
    setSaving(true);
    try {
      const res = await addGameToTournament(tournamentId, {
        gameId: addForm.gameId,
        minTeamMembers: addForm.minTeamMembers,
        maxTeamMembers: addForm.maxTeamMembers,
        maxTeams: addForm.maxTeams,
        rules: addForm.rules,
      });
      if (res.success) {
        setShowAddModal(false);
        setAddForm({ gameId: "", minTeamMembers: 1, maxTeamMembers: 5, maxTeams: 16, rules: "" });
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEditOpen = (g: TournamentGame) => {
    setEditingGame(g);
    setEditForm({
      minTeamMembers: g.minTeamMembers,
      maxTeamMembers: g.maxTeamMembers,
      maxTeams: g.maxTeams,
      rules: g.rules || "",
    });
  };

  const handleEditSave = async () => {
    if (!editingGame?._id) return;
    setSaving(true);
    try {
      const res = await updateTournamentGame(tournamentId, editingGame._id, editForm);
      if (res.success) {
        setEditingGame(null);
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    if (!confirmRemove?._id) return;
    setRemoving(true);
    try {
      const res = await removeTournamentGame(tournamentId, confirmRemove._id);
      if (res.success) {
        setConfirmRemove(null);
        onRefresh();
      }
    } finally {
      setRemoving(false);
    }
  };

  const tournamentGames = tournament.games || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Tournament Games</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-all"
        >
          <Plus size={15} /> Add Game
        </button>
      </div>

      {tournamentGames.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4 bg-gradient-to-br from-[#0c3540]/30 to-[#0a2d36]/30 border border-cyan-500/10 rounded-2xl">
          <Gamepad2 size={40} className="text-cyan-400/30" />
          <p className="text-gray-400">No games added yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-all"
          >
            Add First Game
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tournamentGames.map((g) => (
            <div
              key={g._id}
              className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold">{g.gameName || "Unknown Game"}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">ID: {g.gameId}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditOpen(g)}
                    className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setConfirmRemove(g)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Min Members", value: g.minTeamMembers },
                  { label: "Max Members", value: g.maxTeamMembers },
                  { label: "Max Teams",   value: g.maxTeams },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-black/20 rounded-lg p-3 text-center">
                    <p className="text-white font-bold text-lg">{value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {g.currentTeams !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Teams Registered</span>
                    <span>{g.currentTeams} / {g.maxTeams}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all"
                      style={{ width: `${Math.min((g.currentTeams / g.maxTeams) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {g.rules && (
                <p className="mt-3 text-gray-400 text-xs border-t border-white/5 pt-3 line-clamp-2">{g.rules}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Add Game Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#0a1628] border border-cyan-500/20 rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-white font-bold mb-5">Add Game to Tournament</h3>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Select Game</label>
                <select
                  value={addForm.gameId}
                  onChange={(e) => setAddForm((f) => ({ ...f, gameId: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
                >
                  <option value="">— Choose a game —</option>
                  {games.map((g) => (
                    <option key={g._id} value={g._id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "minTeamMembers", label: "Min Members" },
                  { key: "maxTeamMembers", label: "Max Members" },
                  { key: "maxTeams",       label: "Max Teams" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
                    <input
                      type="number"
                      min={1}
                      value={(addForm as Record<string, string | number>)[key] as number}
                      onChange={(e) => setAddForm((f) => ({ ...f, [key]: parseInt(e.target.value) || 1 }))}
                      className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Rules (optional)</label>
                <textarea
                  rows={3}
                  value={addForm.rules}
                  onChange={(e) => setAddForm((f) => ({ ...f, rules: e.target.value }))}
                  placeholder="Game-specific rules…"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm resize-none focus:border-cyan-500/50 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all">
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={saving || !addForm.gameId}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold disabled:opacity-60 transition-all"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Add Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Game Modal ── */}
      {editingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingGame(null)} />
          <div className="relative bg-[#0a1628] border border-cyan-500/20 rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-white font-bold mb-5">Edit Game — {editingGame.gameName}</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "minTeamMembers", label: "Min Members" },
                  { key: "maxTeamMembers", label: "Max Members" },
                  { key: "maxTeams",       label: "Max Teams" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
                    <input
                      type="number"
                      min={1}
                      value={(editForm as Record<string, string | number>)[key] as number}
                      onChange={(e) => setEditForm((f) => ({ ...f, [key]: parseInt(e.target.value) || 1 }))}
                      className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Rules</label>
                <textarea
                  rows={3}
                  value={editForm.rules}
                  onChange={(e) => setEditForm((f) => ({ ...f, rules: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm resize-none focus:border-cyan-500/50 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditingGame(null)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold">
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold disabled:opacity-60"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Remove Confirm ── */}
      {confirmRemove && (
        <ConfirmModal
          title="Remove Game"
          message={`Remove "${confirmRemove.gameName}" from this tournament?`}
          confirmLabel="Remove"
          loading={removing}
          onConfirm={handleRemove}
          onCancel={() => setConfirmRemove(null)}
        />
      )}
    </div>
  );
}

// ═════════════════════════════════════════════
// TAB: Schedules
// ═════════════════════════════════════════════

function SchedulesTab({
  tournament,
  tournamentId,
  onRefresh,
}: {
  tournament: Tournament;
  tournamentId: string;
  onRefresh: () => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<TournamentSchedule | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<TournamentSchedule | null>(null);
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);

  const emptyForm = { title: "", description: "", startDate: "", endDate: "", order: 1 };
  const [addForm, setAddForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);

  const schedules = [...(tournament.schedules || [])].sort((a, b) => a.order - b.order);

  const handleAdd = async () => {
    if (!addForm.title || !addForm.startDate || !addForm.endDate) return;
    setSaving(true);
    try {
      const res = await addScheduleToTournament(tournamentId, {
        title: addForm.title,
        description: addForm.description,
        startDate: new Date(addForm.startDate).toISOString(),
        endDate: new Date(addForm.endDate).toISOString(),
        order: addForm.order,
      });
      if (res.success) {
        setShowAddModal(false);
        setAddForm(emptyForm);
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEditOpen = (s: TournamentSchedule) => {
    setEditingSchedule(s);
    setEditForm({
      title: s.title,
      description: s.description || "",
      startDate: toInputDate(s.startDate),
      endDate: toInputDate(s.endDate),
      order: s.order,
    });
  };

  const handleEditSave = async () => {
    if (!editingSchedule?._id) return;
    setSaving(true);
    try {
      const res = await updateTournamentSchedule(tournamentId, editingSchedule._id, {
        title: editForm.title,
        description: editForm.description,
        startDate: new Date(editForm.startDate).toISOString(),
        endDate: new Date(editForm.endDate).toISOString(),
        order: editForm.order,
      });
      if (res.success) {
        setEditingSchedule(null);
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    if (!confirmRemove?._id) return;
    setRemoving(true);
    try {
      const res = await removeTournamentSchedule(tournamentId, confirmRemove._id);
      if (res.success) {
        setConfirmRemove(null);
        onRefresh();
      }
    } finally {
      setRemoving(false);
    }
  };

  const ScheduleForm = ({
    form,
    onChange,
  }: {
    form: typeof emptyForm;
    onChange: (f: typeof emptyForm) => void;
  }) => (
    <div className="space-y-4">
      <div>
        <label className="text-gray-400 text-xs mb-1.5 block">Stage Title *</label>
        <input
          value={form.title}
          onChange={(e) => onChange({ ...form, title: e.target.value })}
          placeholder="e.g. Quarter Finals"
          className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
        />
      </div>
      <div>
        <label className="text-gray-400 text-xs mb-1.5 block">Description</label>
        <input
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          placeholder="e.g. Best of 3"
          className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-gray-400 text-xs mb-1.5 block">Start Date *</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => onChange({ ...form, startDate: e.target.value })}
            className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1.5 block">End Date *</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => onChange({ ...form, endDate: e.target.value })}
            className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-xs mb-1.5 block">Order</label>
        <input
          type="number"
          min={1}
          value={form.order}
          onChange={(e) => onChange({ ...form, order: parseInt(e.target.value) || 1 })}
          className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Tournament Schedule</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-all"
        >
          <Plus size={15} /> Add Stage
        </button>
      </div>

      {schedules.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4 bg-gradient-to-br from-[#0c3540]/30 to-[#0a2d36]/30 border border-cyan-500/10 rounded-2xl">
          <Calendar size={40} className="text-cyan-400/30" />
          <p className="text-gray-400">No schedule stages yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-all"
          >
            Add First Stage
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent" />

          <div className="space-y-4 ml-0">
            {schedules.map((s, idx) => (
              <div key={s._id} className="flex gap-4 items-start">
                {/* Dot */}
                <div className="flex-shrink-0 w-12 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#020818] shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10" />
                </div>

                <div className="flex-1 bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-cyan-400/60 text-xs font-mono">Stage {idx + 1}</span>
                        <ListOrdered size={12} className="text-gray-600" />
                        <span className="text-gray-600 text-xs">Order: {s.order}</span>
                      </div>
                      <h3 className="text-white font-bold">{s.title}</h3>
                      {s.description && <p className="text-gray-400 text-sm mt-0.5">{s.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditOpen(s)}
                        className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => setConfirmRemove(s)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs">
                    <Calendar size={12} />
                    <span>{formatDate(s.startDate)}</span>
                    <span className="text-gray-600">→</span>
                    <span>{formatDate(s.endDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#0a1628] border border-cyan-500/20 rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-white font-bold mb-5">Add Schedule Stage</h3>
            <ScheduleForm form={addForm} onChange={setAddForm} />
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold">Cancel</button>
              <button
                onClick={handleAdd}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold disabled:opacity-60"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Add Stage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingSchedule(null)} />
          <div className="relative bg-[#0a1628] border border-cyan-500/20 rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-white font-bold mb-5">Edit Stage — {editingSchedule.title}</h3>
            <ScheduleForm form={editForm} onChange={setEditForm} />
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditingSchedule(null)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold">Cancel</button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold disabled:opacity-60"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmRemove && (
        <ConfirmModal
          title="Remove Stage"
          message={`Remove schedule stage "${confirmRemove.title}"?`}
          confirmLabel="Remove"
          loading={removing}
          onConfirm={handleRemove}
          onCancel={() => setConfirmRemove(null)}
        />
      )}
    </div>
  );
}

// ═════════════════════════════════════════════
// TAB: Registrations
// ═════════════════════════════════════════════

function RegistrationsTab({ tournamentId }: { tournamentId: string }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RegistrationStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<Registration | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTournamentRegistrations(tournamentId);
      if (res.success) {
        setRegistrations(res.data || []);
      } else {
        setError(res.message || "Failed to load registrations.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [tournamentId]);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  const handleStatusUpdate = async (regId: string, status: RegistrationStatus, rejectionReason?: string) => {
    setUpdatingId(regId);
    try {
      const res = await updateRegistrationStatus(regId, { status, rejectionReason });
      if (res.success) {
        setRegistrations((prev) =>
          prev.map((r) => (r._id === regId ? { ...r, status, rejectionReason } : r))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectModal) return;
    await handleStatusUpdate(rejectModal._id, "rejected", rejectReason);
    setRejectModal(null);
    setRejectReason("");
  };

  const filtered = filter === "all" ? registrations : registrations.filter((r) => r.status === filter);

  const counts = {
    all:       registrations.length,
    pending:   registrations.filter((r) => r.status === "pending").length,
    confirmed: registrations.filter((r) => r.status === "confirmed").length,
    rejected:  registrations.filter((r) => r.status === "rejected").length,
    waitlisted:registrations.filter((r) => r.status === "waitlisted").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-white">Registrations</h2>
        <button
          onClick={fetchRegistrations}
          className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "confirmed", "rejected", "waitlisted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              filter === f
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 opacity-60">({counts[f as keyof typeof counts] ?? 0})</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="text-cyan-400 animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center py-16 gap-3">
          <AlertCircle size={28} className="text-red-400" />
          <p className="text-gray-400 text-sm">{error}</p>
          <button onClick={fetchRegistrations} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm">Retry</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center py-20 gap-3 bg-gradient-to-br from-[#0c3540]/30 to-[#0a2d36]/30 border border-cyan-500/10 rounded-2xl">
          <Users size={36} className="text-cyan-400/30" />
          <p className="text-gray-400">No {filter === "all" ? "" : filter} registrations</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div
              key={r._id}
              className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-white font-semibold">{r.teamName}</p>
                  <RegStatusBadge status={r.status} />
                </div>
                <div className="flex items-center gap-3 mt-1 text-gray-400 text-xs flex-wrap">
                  <span className="flex items-center gap-1"><Gamepad2 size={11} />{r.gameName}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(r.registeredAt)}</span>
                </div>
                {r.rejectionReason && (
                  <p className="text-red-400 text-xs mt-1">Reason: {r.rejectionReason}</p>
                )}
              </div>

              {/* Action buttons — only show relevant ones */}
              <div className="flex gap-2 flex-shrink-0">
                {r.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(r._id, "confirmed")}
                      disabled={updatingId === r._id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl text-xs font-semibold border border-green-500/20 transition-all disabled:opacity-60"
                    >
                      {updatingId === r._id ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectModal(r)}
                      disabled={updatingId === r._id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-xs font-semibold border border-red-500/20 transition-all disabled:opacity-60"
                    >
                      <X size={11} /> Reject
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(r._id, "waitlisted")}
                      disabled={updatingId === r._id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl text-xs font-semibold border border-purple-500/20 transition-all disabled:opacity-60"
                    >
                      <Clock size={11} /> Waitlist
                    </button>
                  </>
                )}
                {r.status === "waitlisted" && (
                  <button
                    onClick={() => handleStatusUpdate(r._id, "confirmed")}
                    disabled={updatingId === r._id}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl text-xs font-semibold border border-green-500/20 transition-all disabled:opacity-60"
                  >
                    {updatingId === r._id ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                    Approve
                  </button>
                )}
                {r.status === "confirmed" && (
                  <button
                    onClick={() => setRejectModal(r)}
                    disabled={updatingId === r._id}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-xs font-semibold border border-red-500/20 transition-all disabled:opacity-60"
                  >
                    <X size={11} /> Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setRejectModal(null)} />
          <div className="relative bg-[#0a1628] border border-red-500/20 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white font-bold mb-2">Reject Registration</h3>
            <p className="text-gray-400 text-sm mb-4">Rejecting <strong className="text-white">{rejectModal.teamName}</strong></p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection (optional)…"
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm resize-none focus:border-red-500/50 outline-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setRejectModal(null)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold">Cancel</button>
              <button
                onClick={handleRejectConfirm}
                disabled={updatingId === rejectModal._id}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-60"
              >
                {updatingId === rejectModal._id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════
// TAB: Analytics
// ═════════════════════════════════════════════

function AnalyticsTab({ tournament }: { tournament: Tournament }) {
  const games = tournament.games || [];
  const totalSlots = games.reduce((acc, g) => acc + g.maxTeams, 0);
  const filledSlots = games.reduce((acc, g) => acc + (g.currentTeams || 0), 0);
  const fillRate = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;

  const mostPopular = [...games].sort((a, b) => (b.currentTeams || 0) - (a.currentTeams || 0))[0];

  const statCards = [
    { label: "Total Views",        value: tournament.views ?? 0,            icon: <Eye size={20} />,      color: "text-blue-400",   bg: "from-blue-500/10" },
    { label: "Teams Registered",   value: tournament.totalTeams ?? 0,       icon: <Users size={20} />,    color: "text-cyan-400",   bg: "from-cyan-500/10" },
    { label: "Total Slots",        value: totalSlots,                        icon: <Shield size={20} />,   color: "text-purple-400", bg: "from-purple-500/10" },
    { label: "Slot Fill Rate",     value: `${fillRate}%`,                    icon: <BarChart3 size={20} />,color: "text-green-400",  bg: "from-green-500/10" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Analytics</h2>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon, color, bg }) => (
          <div key={label} className={`bg-gradient-to-br ${bg} to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-5`}>
            <div className={`mb-3 ${color}`}>{icon}</div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Per-game breakdown */}
      {games.length > 0 && (
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-5">Game Slot Utilization</h3>
          <div className="space-y-4">
            {games.map((g) => {
              const pct = g.maxTeams > 0 ? Math.round(((g.currentTeams || 0) / g.maxTeams) * 100) : 0;
              return (
                <div key={g._id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white font-medium">{g.gameName}</span>
                    <span className="text-gray-400">{g.currentTeams || 0} / {g.maxTeams} teams ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-400" : pct >= 60 ? "bg-yellow-400" : "bg-cyan-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Most popular game */}
      {mostPopular && (
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Most Popular Game</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Gamepad2 size={22} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">{mostPopular.gameName}</p>
              <p className="text-gray-400 text-sm">{mostPopular.currentTeams || 0} teams registered</p>
            </div>
          </div>
        </div>
      )}

      {/* Prize pool summary */}
      {tournament.prizePool && (
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-green-400" /> Total Prize Pool
          </h3>
          <p className="text-4xl font-bold text-green-400">
            ${((tournament.prizePool.first || 0) + (tournament.prizePool.second || 0) + (tournament.prizePool.third || 0)).toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm mt-1">Across all placements</p>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════
// TAB: Settings
// ═════════════════════════════════════════════

function SettingsTab({
  tournament,
  tournamentId,
  onRefresh,
  router,
}: {
  tournament: Tournament;
  tournamentId: string;
  onRefresh: () => void;
  router: ReturnType<typeof useRouter>;
}) {
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ msg: string; ok: boolean } | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [confirmDanger, setConfirmDanger] = useState<"delete" | "cancel" | null>(null);
  const [dangerLoading, setDangerLoading] = useState(false);

  const [form, setForm] = useState<UpdateTournamentPayload>({
    title:                tournament.title,
    description:          tournament.description || "",
    coverImage:           tournament.coverImage || "",
    startDate:            toInputDate(tournament.startDate),
    endDate:              toInputDate(tournament.endDate),
    registrationOpenDate: toInputDate(tournament.registrationOpenDate),
    registrationCloseDate:toInputDate(tournament.registrationCloseDate),
    prizePool: {
      first:  tournament.prizePool?.first  ?? 0,
      second: tournament.prizePool?.second ?? 0,
      third:  tournament.prizePool?.third  ?? 0,
    },
    maxTeamsPerGame: tournament.maxTeamsPerGame ?? 16,
    hasWaitlist:     tournament.hasWaitlist ?? false,
  });

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const payload: UpdateTournamentPayload = {
        ...form,
        startDate:            form.startDate ? new Date(form.startDate as string).toISOString() : undefined,
        endDate:              form.endDate   ? new Date(form.endDate as string).toISOString()   : undefined,
        registrationOpenDate: form.registrationOpenDate  ? new Date(form.registrationOpenDate as string).toISOString()  : undefined,
        registrationCloseDate:form.registrationCloseDate ? new Date(form.registrationCloseDate as string).toISOString() : undefined,
      };
      const res = await updateTournament(tournamentId, payload);
      setSaveMsg({ msg: res.success ? "Changes saved!" : res.message || "Failed to save.", ok: res.success });
      if (res.success) onRefresh();
    } catch {
      setSaveMsg({ msg: "Network error.", ok: false });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 3000);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await publishTournament(tournamentId);
      if (res.success) onRefresh();
    } finally {
      setPublishing(false);
    }
  };

  const handleDanger = async () => {
    setDangerLoading(true);
    try {
      if (confirmDanger === "delete") {
        const res = await deleteTournament(tournamentId);
        if (res.success) router.push("/creator/host");
      } else if (confirmDanger === "cancel") {
        const res = await updateTournament(tournamentId, { status: "cancelled" } as UpdateTournamentPayload);
        if (res.success) { setConfirmDanger(null); onRefresh(); }
      }
    } finally {
      setDangerLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500/50 outline-none transition-colors";
  const labelCls = "text-gray-400 text-xs mb-1.5 block";

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white">Tournament Settings</h2>

      {/* Basic Info */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2"><Trophy size={15} className="text-cyan-400" />Basic Info</h3>
        <div>
          <label className={labelCls}>Tournament Title</label>
          <input value={form.title as string} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea rows={3} value={form.description as string} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none`} />
        </div>
        <div>
          <label className={labelCls}>Cover Image URL</label>
          <div className="flex gap-2">
            <input value={form.coverImage as string} onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))} placeholder="https://…" className={`${inputCls} flex-1`} />
            {form.coverImage && (
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img src={form.coverImage as string} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2"><Calendar size={15} className="text-cyan-400" />Dates</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "startDate",            label: "Tournament Start" },
            { key: "endDate",              label: "Tournament End" },
            { key: "registrationOpenDate", label: "Registration Opens" },
            { key: "registrationCloseDate",label: "Registration Closes" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className={labelCls}>{label}</label>
              <input
                type="date"
                value={(form as Record<string, unknown>)[key] as string}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prize Pool */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2"><DollarSign size={15} className="text-green-400" />Prize Pool</h3>
        <div className="grid grid-cols-3 gap-3">
          {([["first","1st Place"],["second","2nd Place"],["third","3rd Place"]] as const).map(([k, label]) => (
            <div key={k}>
              <label className={labelCls}>{label}</label>
              <input
                type="number"
                min={0}
                value={form.prizePool?.[k] ?? 0}
                onChange={(e) => setForm((f) => ({ ...f, prizePool: { ...f.prizePool, [k]: parseInt(e.target.value) || 0 } }))}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tournament Config */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-cyan-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2"><Settings size={15} className="text-cyan-400" />Configuration</h3>
        <div>
          <label className={labelCls}>Max Teams Per Game</label>
          <input
            type="number"
            min={1}
            value={form.maxTeamsPerGame as number}
            onChange={(e) => setForm((f) => ({ ...f, maxTeamsPerGame: parseInt(e.target.value) || 1 }))}
            className={`${inputCls} max-w-[160px]`}
          />
        </div>
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
          <div>
            <p className="text-white text-sm font-medium">Enable Waitlist</p>
            <p className="text-gray-400 text-xs mt-0.5">Allow teams to join a waitlist when slots are full</p>
          </div>
          <button
            onClick={() => setForm((f) => ({ ...f, hasWaitlist: !f.hasWaitlist }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${form.hasWaitlist ? "bg-cyan-500" : "bg-white/10"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.hasWaitlist ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Save Changes
        </button>
        {saveMsg && (
          <p className={`text-sm font-medium ${saveMsg.ok ? "text-green-400" : "text-red-400"}`}>
            {saveMsg.msg}
          </p>
        )}
      </div>

      {/* Publish (if draft) */}
      {tournament.status === "draft" && (
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 border border-green-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold flex items-center gap-2 mb-2"><Globe size={15} className="text-green-400" />Publish Tournament</h3>
          <p className="text-gray-400 text-sm mb-4">Make this tournament visible to the public.</p>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
          >
            {publishing ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
            Publish Now
          </button>
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-gradient-to-br from-red-500/5 to-[#0a2d36]/60 border border-red-500/20 rounded-2xl p-6 space-y-4">
        <h3 className="text-red-400 font-semibold flex items-center gap-2"><AlertCircle size={15} />Danger Zone</h3>

        {tournament.status !== "cancelled" && (
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">Cancel Tournament</p>
              <p className="text-gray-400 text-xs mt-0.5">This will mark the tournament as cancelled. Cannot be undone.</p>
            </div>
            <button
              onClick={() => setConfirmDanger("cancel")}
              className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/20 rounded-xl text-xs font-semibold transition-all"
            >
              Cancel Tournament
            </button>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
          <div>
            <p className="text-white text-sm font-medium">Delete Tournament</p>
            <p className="text-gray-400 text-xs mt-0.5">Permanently delete this tournament and all its data.</p>
          </div>
          <button
            onClick={() => setConfirmDanger("delete")}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold transition-all"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Danger confirm modals */}
      {confirmDanger === "delete" && (
        <ConfirmModal
          title="Delete Tournament"
          message={`Permanently delete "${tournament.title}"? This cannot be undone.`}
          confirmLabel="Delete Forever"
          loading={dangerLoading}
          onConfirm={handleDanger}
          onCancel={() => setConfirmDanger(null)}
        />
      )}
      {confirmDanger === "cancel" && (
        <ConfirmModal
          title="Cancel Tournament"
          message={`Cancel "${tournament.title}"? This will be visible to all registered teams.`}
          confirmLabel="Cancel Tournament"
          variant="warning"
          loading={dangerLoading}
          onConfirm={handleDanger}
          onCancel={() => setConfirmDanger(null)}
        />
      )}
    </div>
  );
}

export default TournamentManagersPage;