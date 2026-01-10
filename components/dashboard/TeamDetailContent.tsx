"use client";
import React, { useState } from "react";
import {
  Share2,
  Edit,
  Trash2,
  ChevronLeft,
  Users,
  Circle,
  Minus,
  Plus,
  X,
  Check,
  Tag,
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  role?: string;
  tags?: string[];
  avatar: string;
}

const TeamDetailContent = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [newTag, setNewTag] = useState("");
  const [shareUrl] = useState("https://www.figma.com/design/muJXMFOHkSbpo60dbc");

  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "John Abagnale",
      // role: "Team Lead",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Amir Ahmad",
      // role: "Team Lead Assistant",
      // tags: ["Sniper"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Michael Klirk",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Khalifa Suzaine",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "James Lukas",
      // tags: ["Looter", "Logic"],
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
  ]);

  const availableRoles = [
    "Team leader",
    "Assistant Team Leader",
    "Sniper",
    "Frontman",
    "Tactician",
    "Substitute",
  ];

  const teamData = {
    name: "Top Gunner Ash",
    description: "We strike from the shadows, leave no second chance precision, power, and fire in every shot",
    currentTournaments: 2,
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const openTagModal = (memberId: number) => {
    setSelectedMemberId(memberId);
    setShowTagModal(true);
    setNewTag("");
  };

  const addTagToMember = (roleToAdd: string) => {
    if (selectedMemberId === null) return;
    
    setMembers(members.map(member => {
      if (member.id === selectedMemberId) {
        const currentTags = member.tags || [];
        if (!currentTags.includes(roleToAdd)) {
          return { ...member, tags: [...currentTags, roleToAdd] };
        }
      }
      return member;
    }));
  };

  const addCustomTag = () => {
    if (selectedMemberId === null || !newTag.trim()) return;
    
    setMembers(members.map(member => {
      if (member.id === selectedMemberId) {
        const currentTags = member.tags || [];
        if (!currentTags.includes(newTag.trim())) {
          return { ...member, tags: [...currentTags, newTag.trim()] };
        }
      }
      return member;
    }));
    setNewTag("");
  };

  const removeTagFromMember = (memberId: number, tagToRemove: string) => {
    setMembers(members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          tags: (member.tags || []).filter(tag => tag !== tagToRemove)
        };
      }
      return member;
    }));
  };

  const selectedMember = members.find(m => m.id === selectedMemberId);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
        <ChevronLeft size={20} />
        Back to Teams
      </button>

      {/* Team Header Card */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div
            className="w-full md:w-80 h-80 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${teamData.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1628]"></div>
          </div>

          <div className="flex-1 p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl font-bold text-white mb-3">{teamData.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Circle size={10} className="fill-cyan-400" />
                    Currently in {teamData.currentTournaments} Tournaments
                  </span>
                </div>
                <p className="text-gray-400 text-lg max-w-2xl">{teamData.description}</p>
              </div>

              <div className="flex gap-3 flex-wrap">
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
                <button className="px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-semibold transition-all flex items-center gap-2">
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users size={24} />
            Members ({members.length})
          </h2>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
            <Users size={16} />
            Invite Members
          </button>
        </div>

        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${member.avatar})` }}
                ></div>

                <div className="flex items-center gap-2 flex-wrap flex-1">
                  <p className="text-white font-medium">{member.name}</p>
                  {member.role && (
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
                      {member.role}
                    </span>
                  )}
                  {member.tags && member.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 text-gray-400 rounded-full text-xs font-medium flex items-center gap-1.5 group/tag"
                    >
                      {tag}
                      <button
                        onClick={() => removeTagFromMember(member.id, tag)}
                        className="hover:text-red-400 transition-colors opacity-0 group-hover/tag:opacity-100"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openTagModal(member.id)}
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 flex items-center justify-center text-cyan-400 transition-all text-sm font-medium"
                >
                  {/* <Plus size={16} className="mr-1" /> */}
                  {/* Add Tag / Role  */}
                  <Tag />
                </button>
                {/* <button
                  onClick={() => setShowShareModal(true)}
                  className="w-10 h-10 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 flex items-center justify-center text-cyan-400 transition-all"
                >
                  <Share2 size={18} />
                </button> */}
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-white transition-all">
                  <Minus size={18} />
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

      {/* Tag Management Modal */}
      {showTagModal && selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTagModal(false)}
          ></div>

          <div className="relative bg-[#0a1628] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add Tag / Role</h3>
              <button
                onClick={() => setShowTagModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Note: You can't add more than two tags for <span className="text-cyan-400">{selectedMember.name}</span>
            </p>

            {/* Available Roles */}
            <div className="space-y-3 mb-6">
              {availableRoles.map((role) => {
                const isSelected = selectedMember.tags?.includes(role);
                return (
                  <button
                    key={role}
                    onClick={() => addTagToMember(role)}
                    disabled={isSelected || (selectedMember.tags?.length || 0) >= 2}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      isSelected
                        ? "bg-cyan-500/30 text-cyan-400 cursor-not-allowed"
                        : (selectedMember.tags?.length || 0) >= 2
                        ? "bg-white/5 text-gray-600 cursor-not-allowed"
                        : "bg-[#0d1f35] hover:bg-[#1a2f45] text-white"
                    }`}
                  >
                    <span className="font-medium">{role}</span>
                    {isSelected ? (
                      <Check size={20} className="text-cyan-400" />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag Input */}
            {(selectedMember.tags?.length || 0) < 2 && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
                    placeholder="Add custom tag..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    onClick={addCustomTag}
                    disabled={!newTag.trim()}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            
            // Edit Modal View
            {
              <section>

              </section>
            }

            {/* Current Tags */}
            {selectedMember.tags && selectedMember.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Current tags:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => removeTagFromMember(selectedMember.id, tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailContent;