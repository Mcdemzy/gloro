"use client";
import React, { useState } from "react";
import { Share2, Edit, Trash2, Users } from "lucide-react";
import Link from "next/link";

const TeamsListContent = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl] = useState(
    "https://www.figma.com/design/muJXMFOHkSbpo60dbc"
  );

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const teams = [
    {
      id: "top-gunner",
      name: "Top Gunner Ash",
      description:
        "We strike from the shadows, leave no second chance precision, power, and fire in every shot",
      currentTournaments: 2,
      members: [
        {
          id: 1,
          name: "John Abagnale",
          role: "Team Lead",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
        {
          id: 2,
          name: "Amir Ahmad",
          role: "Team Lead Assistant",
          tags: ["Sniper"],
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
          id: 3,
          name: "Michael Klirk",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
          id: 4,
          name: "Khalifa Suzaine",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
      memberCount: 12,
    },
    {
      id: "night-owls",
      name: "Night Owls",
      description:
        "We dominate the night with stealth and strategy, leaving opponents in the dark",
      currentTournaments: 1,
      members: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Team Lead",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop",
      memberCount: 6,
    },
    {
      id: "dreamer-leagues",
      name: "Dreamer Leagues",
      description: "Aspiring champions with big dreams and even bigger skills",
      currentTournaments: 3,
      members: [
        {
          id: 1,
          name: "Mike Davis",
          role: "Captain",
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
      memberCount: 9,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Warning */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
        <div className="flex-1">
          <h3 className="text-red-400 font-semibold mb-1">
            ⚠️ Profile update required
          </h3>
          <p className="text-gray-300 text-sm">
            Profile update completion is compulsory before being able to apply
            for Tournaments.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="text-right mb-2">
            <span className="text-white font-semibold text-sm">Progress</span>
          </div>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Your Teams Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white orbitron">Your Teams</h2>
        <Link
          href="/dashboard/teams/create"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
        >
          Create new team
        </Link>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/dashboard/teams/${team.id}`}
            className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all cursor-pointer group"
          >
            <div
              className="relative h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${team.image})` }}
            >
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowShareModal(true);
                  }}
                  className="p-2 bg-white/10 backdrop-blur-sm hover:bg-cyan-500/20 rounded-lg transition-all"
                >
                  <Share2 size={18} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Handle delete
                  }}
                  className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
              </div> */}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
              {/* <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  Currently in {team.currentTournaments} Tournaments
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {team.description}
              </p> */}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={16} />
                  <span className="text-sm">{team.memberCount} members</span>
                </div>
                <div className="flex gap-2">
                  {/* <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle edit
                    }}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowShareModal(true);
                    }}
                    className="px-4 py-2 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <Share2 size={16} />
                    {/* Share */}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          ></div>
          <div className="relative bg-[#0a1628] border border-cyan-400/30 rounded-2xl p-8 max-w-lg w-full">
            <div className="mb-6">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
            <button
              onClick={copyShareUrl}
              className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              Copy this link →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsListContent;
