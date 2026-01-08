"use client";
import React, { useState } from "react";
import { Share2 } from "lucide-react";

const TeamsContent = () => {
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
        // ... other members
      ],
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
      memberCount: 12,
    },
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
        // ... other members
      ],
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
      memberCount: 12,
    },
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
        // ... other members
      ],
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
      memberCount: 12,
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
        <h2 className="text-2xl font-bold text-white">Your Teams</h2>
        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
          Create new team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all cursor-pointer group"
          >
            <div
              className="relative h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${team.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareModal(true);
                  }}
                  className="p-2 bg-white/10 backdrop-blur-sm hover:bg-cyan-500/20 rounded-lg transition-all"
                >
                  <Share2 size={18} className="text-gray-600" />
                </button>
                {/* <button className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all">
                  <span className="text-white text-sm font-bold">🗑️</span>
                </button> */}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  Currently in {team.currentTournaments} Tournaments
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6">{team.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">
                  Members({team.members.length})
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                    <span>✏️</span> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowShareModal(true);
                    }}
                    className="px-4 py-2 bg-white/5 text-white hover:bg-white/10 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Members Detail Section */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Members(12)</h3>
        <div className="space-y-3">
          {teams[0].members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.avatar})` }}
                ></div>
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  {member.role && (
                    <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-semibold mt-1">
                      {member.role}
                    </span>
                  )}
                  {member.tags &&
                    member.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-white/10 text-gray-400 rounded text-xs font-medium ml-2 mt-1"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 flex items-center justify-center text-cyan-400 transition-all">
                  <Share2 size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all">
                  <span className="text-lg">−</span>
                </button>
              </div>
            </div>
          ))}
        </div>
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

export default TeamsContent;
