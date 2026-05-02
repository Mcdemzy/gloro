"use client";
import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Copy,
  Share2,
  Users,
  Loader2,
  Trophy,
  ArrowLeftRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { getMyTeams, getInviteLink, Team } from "@/lib/api/teams";
import ShareModal from "@/components/dashboard/ShareModal";
import { useAuthStore } from "@/lib/store/auth/authStore";
import ProfileWarning from "@/components/dashboard/ProfileWarning";

const OverviewContent = () => {
  const user = useAuthStore((s) => s.user);

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loadingInvite, setLoadingInvite] = useState<string | null>(null);
  const [gloroCopied, setGloroCopied] = useState(false);

  // Tournaments placeholder (static until tournament API exists)
  const joinedTournaments: { id: number; image: string; title: string }[] = [];

  const hostedCompetitions = [
    { id: 1, name: "Ikorodu Gamers Hangout" },
    { id: 2, name: "John Cent's Gaming Competition" },
    { id: 3, name: "Enugu Esport Cup" },
  ];

  useEffect(() => {
    (async () => {
      setTeamsLoading(true);
      try {
        const res = await getMyTeams();
        if (res.success) setTeams(res.data || []);
      } catch {
        // silently fail on overview
      } finally {
        setTeamsLoading(false);
      }
    })();
  }, []);

  const handleShare = async (teamId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingInvite(teamId);
    try {
      const res = await getInviteLink(teamId);
      const team = teams.find((t) => t._id === teamId);
      setShareUrl(
        res.success
          ? res.data.inviteLink
          : `${window.location.origin}/team/${team?.slug}`,
      );
    } catch {
      const team = teams.find((t) => t._id === teamId);
      setShareUrl(`${window.location.origin}/team/${team?.slug}`);
    } finally {
      setLoadingInvite(null);
      setShowShareModal(true);
    }
  };

  const copyGloroId = () => {
    if (!user?.gloroId) return;
    navigator.clipboard.writeText(user.gloroId);
    setGloroCopied(true);
    setTimeout(() => setGloroCopied(false), 2000);
  };

  // Derive display name
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.username || "—";

  const username = user?.username ? `· ${user.username}` : "";
  const gloroId = user?.gloroId ?? "—";

  return (
    <>
      {/* Profile header card — full width above the grid */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl md:p-8 p-4 md:my-10 my-5">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl font-bold text-white">{displayName}</h1>
              {username && (
                <span className="text-gray-500 text-sm">{username}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Gloro ID: {gloroId}</span>
              <button
                onClick={copyGloroId}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                title="Copy GloroID"
              >
                {gloroCopied ? (
                  <Check size={15} className="text-green-400" />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all text-sm flex items-center gap-2">
            <ArrowLeftRight size={15} />
            Switch to Creator&apos;s Dashboard
          </button>
        </div>

        {/* Profile Warning */}
        <ProfileWarning progress={45} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Joined Tournaments */}
          <div className="bg-[#0a1628] border border-[#455872] rounded-2xl md:p-8 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Joined Tournaments
              </h2>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                See all
              </button>
            </div>
            {joinedTournaments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <Trophy size={40} className="text-gray-600" />
                <p className="text-gray-400">
                  You have not joined any Tournament
                </p>
                <Link
                  href="/dashboard/tournaments"
                  className="px-5 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-xl text-sm font-semibold transition-all"
                >
                  Explore Tournaments
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {joinedTournaments.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white/5 border border-[#455872] rounded-xl p-4 cursor-pointer hover:border-cyan-400/30 transition-all"
                  >
                    <div
                      className="w-full h-40 rounded-lg bg-cover bg-center mb-3"
                      style={{ backgroundImage: `url(${t.image})` }}
                    />
                    <p className="text-white text-sm font-medium line-clamp-2 mb-3">
                      {t.title}
                    </p>
                    <button className="w-full px-3 py-1.5 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 rounded-lg text-xs font-semibold transition-all">
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-1 space-y-6">
          {/* My Teams */}
          <div className="bg-[#0d0f20] border border-[#5D5264] rounded-2xl md:p-6 p-3">
            <Link
              href="/dashboard/teams/create"
              className="block w-full mb-5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all text-sm text-center"
            >
              Create new team
            </Link>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">My teams</h2>
              <Link
                href="/dashboard/teams"
                className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold transition-colors"
              >
                See all
              </Link>
            </div>

            {teamsLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 size={20} className="text-cyan-400 animate-spin" />
              </div>
            ) : teams.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                No teams yet
              </p>
            ) : (
              <div className="space-y-1">
                {teams.slice(0, 4).map((team) => (
                  <Link
                    key={team._id}
                    href={`/dashboard/teams/${team._id}`}
                    className="flex items-center justify-between py-3 border-b border-[#3a3a3a] last:border-0 hover:bg-white/5 rounded-lg px-2 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                          <span className="text-white text-sm font-bold">
                            {team.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">
                          {team.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {team.members.length} members
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleShare(team._id, e)}
                      className="text-gray-500 hover:text-cyan-400 transition-colors p-1"
                    >
                      {loadingInvite === team._id ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Share2 size={15} />
                      )}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hosted Competitions */}
          {/* <div className="bg-[#0d0f20] border border-[#455872] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                Hosted Competitions
              </h2>
              <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold transition-colors">
                See all
              </button>
            </div>
            <div className="space-y-1">
              {hostedCompetitions.map((comp) => (
                <div
                  key={comp.id}
                  className="flex items-center gap-3 py-3 border-b border-[#3a3a3a] last:border-0 hover:bg-white/5 rounded-lg px-2 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500/20 to-cyan-500/20 shrink-0 border border-white/10" />
                  <p className="text-white text-sm font-medium">{comp.name}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </>
  );
};

export default OverviewContent;
