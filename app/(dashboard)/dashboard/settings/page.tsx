"use client";
import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileSchema } from "@/lib/api/validation/schemas";
import { useProfile } from "@/lib/hooks/auth/useAuth";
import ProfileWarning from "@/components/dashboard/ProfileWarning";

const ProfileSettingsPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [changePasswordExpanded, setChangePasswordExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // ── Auth store ────────────────────────────────────────────────────────────
  const user = useAuthStore((s) => s.user);
  const { fetchProfile, onUpdate, isLoading, isFetching } = useProfile();

  // ── Fetch profile on mount if user data isn't already hydrated ────────────
  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, []);

  // ── React Hook Form ───────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      phoneNumber: "",
      avatar: "",
      socialLinks: {
        twitter: "",
        discord: "",
        linkedin: "",
        telegram: "",
      },
    },
  });

  // Sync form values when user data loads / changes
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        bio: user.bio ?? "",
        phoneNumber: user.phoneNumber ?? "",
        avatar: user.avatar ?? "",
        socialLinks: {
          twitter: user.socialLinks?.twitter ?? "",
          discord: user.socialLinks?.discord ?? "",
          linkedin: user.socialLinks?.linkedin ?? "",
          telegram: user.socialLinks?.telegram ?? "",
        },
      });
    }
  }, [user, reset]);

  // ── Avatar preview (local file before upload) ─────────────────────────────
  const avatarValue = watch("avatar");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      // NOTE: Your backend likely expects a URL string (after uploading to S3/Cloudinary etc.)
      // For now we preview locally and store as base64. Replace with your upload logic.
      setValue("avatar", reader.result as string, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  // ── Copy Gloro ID ─────────────────────────────────────────────────────────
  const copyGloroId = () => {
    if (!user?.gloroId) return;
    navigator.clipboard.writeText(user.gloroId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data: ProfileFormValues) => {
    await onUpdate(data);
    setShowEditModal(false);
  };

  // ── Derived display values (fall back to skeleton while loading) ──────────
  const displayName = user
    ? `${user.firstName} ${user.lastName}`
    : "Loading...";
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isFetching && !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-cyan-400" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold text-white">My Profile Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold relative group">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 orbitron">
                {displayName}
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gray-400">
                  Gloro ID: {user?.gloroId ?? "—"}
                </span>
                <button
                  onClick={copyGloroId}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  title="Copy Gloro ID"
                >
                  <Copy size={16} />
                </button>
                {copied && (
                  <span className="text-xs text-green-400">Copied!</span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">
                  Username: {user?.username ?? "—"}
                </p>
                <p className="text-gray-400 text-sm">
                  Email address: {user?.email ?? "—"}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mt-3">
                {user?.socialLinks?.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                  >
                    <span className="text-sm">𝕏</span>
                  </a>
                )}
                {user?.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                  >
                    <span className="text-sm">in</span>
                  </a>
                )}
                {user?.socialLinks?.telegram && (
                  <a
                    href={user.socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                  >
                    <span className="text-sm">📱</span>
                  </a>
                )}
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

        {/* About + Warning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0d1f35] border border-[#455872] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {user?.bio || "No bio yet."}
            </p>
            <p className="text-gray-500 text-xs">• Joined since {joinedDate}</p>
          </div>

          {/* Profile completion warning */}
          <ProfileWarning progress={67} />
        </div>
      </div>

      {/* Settings Options */}
      {/* <div className="space-y-4">
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
      </div> */}

      {/* ── Edit Profile Modal ─────────────────────────────────────────────── */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          />

          <div className="relative bg-[#0a1628] border border-[#455872] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
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

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <label className="relative cursor-pointer group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                    {avatarValue ? (
                      <img
                        src={avatarValue}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
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
                      {...register("firstName")}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
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
                      {...register("lastName")}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Username — read-only, not part of UpdateProfilePayload */}
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
                    value={user?.username ?? ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Email — read-only */}
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
                    value={user?.email ?? ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Gloro ID — read-only */}
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
                    value={user?.gloroId ?? ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  {...register("phoneNumber")}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Twitter */}
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
                    placeholder="https://x.com/yourhandle"
                    {...register("socialLinks.twitter")}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                {errors.socialLinks?.twitter && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.socialLinks.twitter.message}
                  </p>
                )}
              </div>

              {/* Discord */}
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
                    placeholder="Discord username or invite link"
                    {...register("socialLinks.discord")}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* LinkedIn */}
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
                    placeholder="https://linkedin.com/in/yourhandle"
                    {...register("socialLinks.linkedin")}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                {errors.socialLinks?.linkedin && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.socialLinks.linkedin.message}
                  </p>
                )}
              </div>

              {/* Telegram */}
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
                    placeholder="@yourusername"
                    {...register("socialLinks.telegram")}
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
                  {...register("bio")}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
                {errors.bio && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
