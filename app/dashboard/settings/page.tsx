"use client";
import React, { useState } from "react";
import {
  Copy,
  ChevronRight,
  ChevronDown,
  Globe,
  Lock,
  User,
  Mail,
  Camera,
  X,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

const ProfileSettingsPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [changePasswordExpanded, setChangePasswordExpanded] = useState(false);

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: "Raymond",
    lastName: "Thomas",
    username: "player_raytop635",
    email: "example0088@gmail.com",
    gloroId: "GLR-001234",
    twitterLink: "",
    discordLink: "",
    linkedinLink: "",
    telegramLink: "",
    bio: "I play to win, not just to play. From casual matches to ranked wars I bring chaos, fire, and a bit of chaos. Tactical mind Steely aim 🎮",
    avatar: null as string | null,
    joinedDate: "November 2025",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({ ...profileData });

  const copyGloroId = () => {
    navigator.clipboard.writeText(profileData.gloroId);
  };

  const handleEditChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    setProfileData({ ...editForm });
    setShowEditModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Profile Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold relative group">
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                "R"
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                <Camera size={32} className="text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 orbitron">
                Raymond Thomas
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gray-400">
                  Gloro ID: {profileData.gloroId}
                </span>
                <button
                  onClick={copyGloroId}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">
                  Username: {profileData.username}
                </p>
                <p className="text-gray-400 text-sm">
                  Email address: {profileData.email}
                </p>
              </div>
              {/* Social Links */}
              <div className="flex gap-2 mt-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                >
                  <span className="text-sm">𝕏</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                >
                  <span className="text-sm">in</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                >
                  <span className="text-sm">📱</span>
                </a>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setShowEditModal(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
          >
            Edit Profile
          </button>
        </div>

        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0d1f35] border border-[#455872] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {profileData.bio}
            </p>
            <p className="text-gray-500 text-xs">
              • Joined since {profileData.joinedDate}
            </p>
          </div>

          {/* Profile Warning */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h3 className="text-red-400 font-semibold mb-1">
                  Profile update required
                </h3>
                <p className="text-gray-300 text-sm">
                  Profile update completion is compulsory before being able to
                  apply for Tournaments.
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm">
                  Progress
                </span>
                <span className="text-cyan-400 text-sm">67%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {/* Configure Games ID */}
        <Link
          href="/dashboard/games"
          className="w-full bg-[#0a1628] border border-[#455872] rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <User size={20} className="text-cyan-400" />
            <span className="text-white font-medium">Configure Games ID</span>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-400 group-hover:text-cyan-400 transition-colors"
          />
        </Link>

        {/* Change Password */}
        <div className="bg-[#0a1628] border border-[#455872] rounded-xl overflow-hidden">
          <button
            onClick={() => setChangePasswordExpanded(!changePasswordExpanded)}
            className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-cyan-400" />
              <span className="text-white font-medium">Change Password</span>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform ${changePasswordExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {changePasswordExpanded && (
            <div className="px-5 pb-5 space-y-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <button className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all">
                Update Password
              </button>
            </div>
          )}
        </div>

        {/* Account Security */}
        <button className="w-full bg-[#0a1628] border border-[#455872] rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all group">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-cyan-400" />
            <span className="text-white font-medium">Account Security</span>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-400 group-hover:text-cyan-400 transition-colors"
          />
        </button>

        {/* Notifications */}
        <button className="w-full bg-[#0a1628] border border-[#455872] rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all group">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-cyan-400" />
            <span className="text-white font-medium">Notifications</span>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-400 group-hover:text-cyan-400 transition-colors"
          />
        </button>

        {/* Billing & Payments */}
        <button className="w-full bg-[#0a1628] border border-[#455872] rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all group">
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-cyan-400" />
            <span className="text-white font-medium">Billing & Payments</span>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-400 group-hover:text-cyan-400 transition-colors"
          />
        </button>

        {/* Preferred Languages */}
        <button className="w-full bg-[#0a1628] border border-[#455872] rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all group">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-cyan-400" />
            <span className="text-white font-medium">Preferred languages</span>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-400 group-hover:text-cyan-400 transition-colors"
          />
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-[#0a1628] border border-[#455872] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0a1628] border-b border-[#455872] p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Edit profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <label className="relative cursor-pointer group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                    {editForm.avatar ? (
                      <img
                        src={editForm.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "R"
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-black text-sm font-bold">Edit</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    First name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) =>
                        handleEditChange("firstName", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Last name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) =>
                        handleEditChange("lastName", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      handleEditChange("username", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Gloro ID (Read-only) */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  GloroQ's ID
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={editForm.gloroId}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-gray-500 placeholder-gray-500 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Twitter Link */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Twitter link
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    𝕏
                  </span>
                  <input
                    type="text"
                    placeholder="Type or paste your link..."
                    value={editForm.twitterLink}
                    onChange={(e) =>
                      handleEditChange("twitterLink", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Discord Link */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Discord link
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">D</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type or paste your link..."
                    value={editForm.discordLink}
                    onChange={(e) =>
                      handleEditChange("discordLink", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* LinkedIn Link */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  LinkedIn link
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type or paste your link..."
                    value={editForm.linkedinLink}
                    onChange={(e) =>
                      handleEditChange("linkedinLink", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Telegram Link */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Telegram link
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type or paste your link..."
                    value={editForm.telegramLink}
                    onChange={(e) =>
                      handleEditChange("telegramLink", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Bio
                </label>
                <textarea
                  placeholder="Write about you..."
                  value={editForm.bio}
                  onChange={(e) => handleEditChange("bio", e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Update Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
