"use client";
import React from "react";
import {
  ArrowLeft,
  Users,
  Calendar,
  Trophy,
  Settings,
  Eye,
  Edit,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const TournamentOverviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  const tournament = {
    id: parseInt(tournamentId),
    title: "FIFA Global Cup Colossal Games",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
    teamsRegistered: 18,
    communities: 4,
    startDate: "2nd December, 2025",
    endDate: "28 December, 2025",
    status: "Active",
  };

  const handleSectionClick = (section: string) => {
    router.push(`/creator/tournaments/${tournamentId}/${section}`);
  };

  return (
    <div className="min-h-screen bg-[#0a1f2e] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/creator/tournaments")}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
            {tournament.title}
          </h1>
        </div>

        {/* Date & Edit Button */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400">
            {tournament.startDate} - {tournament.endDate}
          </p>
          <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-semibold transition-all">
            Edit Tournament
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0c3540]/40 border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-cyan-400" size={28} />
              <h3 className="text-gray-400">Teams Registered</h3>
            </div>
            <p className="text-4xl font-bold text-white">
              {tournament.teamsRegistered}
            </p>
          </div>

          <div className="bg-[#0c3540]/40 border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-cyan-400" size={28} />
              <h3 className="text-gray-400">Tournament Communities</h3>
            </div>
            <p className="text-4xl font-bold text-white">
              {tournament.communities}
            </p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teams Section */}
          <div
            onClick={() => handleSectionClick("teams")}
            className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="text-purple-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                Teams
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Manage registered teams, approve applications, and monitor team
              rosters.
            </p>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">&raquo;</span>
              <span className="text-cyan-400 font-semibold">View & Manage</span>
            </div>
          </div>

          {/* Communities Section */}
          <div
            onClick={() => handleSectionClick("communities")}
            className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Users className="text-cyan-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Communities
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Manage tournament communities, moderators, and community settings.
            </p>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">&raquo;</span>
              <span className="text-cyan-400 font-semibold">View & Manage</span>
            </div>
          </div>

          {/* Managers Section */}
          <div
            onClick={() => handleSectionClick("managers")}
            className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Settings className="text-blue-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                Managers
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Add or remove tournament managers and configure their permissions.
            </p>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">&raquo;</span>
              <span className="text-cyan-400 font-semibold">View & Manage</span>
            </div>
          </div>

          {/* Preview Section */}
          <div
            onClick={() => handleSectionClick("preview")}
            className="bg-gradient-to-br from-teal-900/40 to-teal-950/40 backdrop-blur-md border border-teal-500/30 rounded-2xl p-8 hover:border-teal-400/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Eye className="text-teal-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors">
                Preview
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              View the public-facing tournament page as participants will see
              it.
            </p>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">&raquo;</span>
              <span className="text-cyan-400 font-semibold">View Preview</span>
            </div>
          </div>

          {/* Scheduling Section */}
          <div
            onClick={() => handleSectionClick("scheduling")}
            className="w-1/2 bg-gradient-to-br from-orange-900/40 to-orange-950/40 backdrop-blur-md border border-orange-500/30 rounded-2xl p-8 hover:border-orange-400/50 transition-all cursor-pointer group md:col-span-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Calendar className="text-orange-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                Scheduling
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Manage tournament schedule, playoffs, quarter finals, semi finals,
              and final matches.
            </p>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">&raquo;</span>
              <span className="text-cyan-400 font-semibold">
                Manage Schedule
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentOverviewPage;
