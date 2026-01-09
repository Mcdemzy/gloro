"use client";
import React, { useState } from "react";
import { Share2, Edit } from "lucide-react";

const ViewTeams = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl] = useState("https://www.figma.com/design/muJXMFOHkSbpo60dbc");

  const teamData = {
    name: "Top Gunner Ash",
    description: "We strike from the shadows, leave no second chance precision, power, and fire in every shot",
    currentTournaments: 2,
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
    members: [
      {
        id: 1,
        name: "John Abagnale",
        role: "Team Lead",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      },
      {
        id: 2,
        name: "Amir Ahmad",
        role: "Team Lead Assistant",
        tags: ["Sniper"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      {
        id: 3,
        name: "Michael Klirk",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      {
        id: 4,
        name: "Khalifa Suzaine",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      {
        id: 5,
        name: "James Lukas",
        tags: ["Looter", "Logic"],
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
      },
      {
        id: 6,
        name: "Manuel",
        tags: ["Looter"],
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop"
      },
      {
        id: 7,
        name: "NoName",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      {
        id: 8,
        name: "Christy Sue",
        role: "Team Lead",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
      },
      {
        id: 9,
        name: "John Meyer",
        role: "Team Lead",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop"
      },
      {
        id: 10,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
      },
      {
        id: 11,
        name: "Mike Davis",
        tags: ["Support"],
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop"
      },
      {
        id: 12,
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
      }
    ]
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Warning */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3 mb-8">
          <div className="flex-1">
            <h3 className="text-red-400 font-semibold mb-1">⚠️ Profile update required</h3>
            <p className="text-gray-300 text-sm">
              Profile update completion is compulsory before being able to apply for Tournaments.
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

        {/* Team Header Card */}
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Team Image */}
            <div
              className="w-full md:w-80 h-80 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${teamData.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1628]"></div>
            </div>

            {/* Team Info */}
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3">{teamData.name}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      Currently in {teamData.currentTournaments} Tournaments
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg max-w-2xl">{teamData.description}</p>
                </div>

                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-xl font-semibold transition-all flex items-center gap-2">
                    <Edit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="px-6 py-3 bg-white/5 text-white hover:bg-white/10 rounded-xl font-semibold transition-all flex items-center gap-2"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                  <button className="px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-semibold transition-all">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Members({teamData.members.length})</h2>

          <div className="space-y-3">
            {teamData.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${member.avatar})` }}
                  ></div>

                  {/* Name and Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium">{member.name}</p>
                    {member.role && (
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
                        {member.role}
                      </span>
                    )}
                    {member.tags &&
                      member.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 text-gray-400 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 flex items-center justify-center text-cyan-400 transition-all">
                    <Share2 size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all">
                    <span className="text-xl">−</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-[#0a1628] border border-cyan-400/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <div className="mb-6">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none"
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

export default ViewTeams;