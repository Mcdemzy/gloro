"use client";
import React, { useState } from "react";
import {
  Upload,
  Lock,
  UserPlus,
  X,
  Users,
  Check,
  ArrowLeft,
  Loader2,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createTeam,
  addMembers,
  uploadTeamLogo,
  uploadTeamCover,
} from "@/lib/api/teams";
import ProfileWarning from "@/components/dashboard/ProfileWarning";

export default function CreateTeamContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // Step 1 fields
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [accessPassword, setAccessPassword] = useState("");
  const [rewritePassword, setRewritePassword] = useState("");
  const [maxMembers, setMaxMembers] = useState(20);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [step1Loading, setStep1Loading] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Saved from step 1 API response
  const [createdTeamId, setCreatedTeamId] = useState<string | null>(null);
  const [createdTeamName, setCreatedTeamName] = useState("");

  // Step 2 fields
  const [memberInput, setMemberInput] = useState("");
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [step2Loading, setStep2Loading] = useState(false);
  const [step2Error, setStep2Error] = useState<string | null>(null);

  // Success
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ─── Step 1 ───────────────────────────────────────────────
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleContinue = async () => {
    setStep1Error(null);
    if (!teamName.trim()) return setStep1Error("Team name is required.");
    if (isPrivate) {
      if (!accessPassword)
        return setStep1Error("Access password is required for private teams.");
      if (accessPassword !== rewritePassword)
        return setStep1Error("Passwords do not match.");
      if (accessPassword.length < 4)
        return setStep1Error("Password must be at least 4 characters.");
    }
    if (teamName.length < 3 || teamName.length > 50)
      return setStep1Error("Team name must be 3–50 characters.");

    setStep1Loading(true);
    try {
      const payload: Record<string, unknown> = {
        name: teamName.trim(),
        description: description.trim(),
        isPrivate,
        maxMembers,
      };
      if (isPrivate && accessPassword) payload.accessPassword = accessPassword;

      const res = await createTeam(payload as unknown as Parameters<typeof createTeam>[0]);
      if (!res.success) {
        setStep1Error(res.message || "Failed to create team.");
        return;
      }

      const team = res.data;
      setCreatedTeamId(team._id);
      setCreatedTeamName(team.name);

      // Upload logo if provided
      if (logoFile && team._id) {
        await uploadTeamLogo(team._id, logoFile);
      }

      setCurrentStep(2);
    } catch {
      setStep1Error("Network error. Please try again.");
    } finally {
      setStep1Loading(false);
    }
  };

  // ─── Step 2 ───────────────────────────────────────────────
  const addMemberId = () => {
    const trimmed = memberInput.trim();
    if (!trimmed) return;
    if (memberIds.includes(trimmed)) {
      setStep2Error("This GloroID is already in the list.");
      return;
    }
    setMemberIds((prev) => [...prev, trimmed]);
    setMemberInput("");
    setStep2Error(null);
  };

  const removeMemberId = (id: string) => {
    setMemberIds((prev) => prev.filter((m) => m !== id));
  };

  const handleSkip = () => {
    setShowSuccessModal(true);
  };

  const handleCreateTeam = async () => {
    if (!createdTeamId) return;
    if (memberIds.length === 0) {
      setShowSuccessModal(true);
      return;
    }

    setStep2Loading(true);
    setStep2Error(null);
    try {
      const res = await addMembers(createdTeamId, memberIds);
      if (!res.success) {
        setStep2Error(res.message || "Some members could not be added.");
      }
      setShowSuccessModal(true);
    } catch {
      setStep2Error("Network error adding members.");
    } finally {
      setStep2Loading(false);
    }
  };

  // ─── Success actions ──────────────────────────────────────
  const handleViewTeam = () => {
    if (createdTeamId) router.push(`/dashboard/teams/${createdTeamId}`);
    else router.push("/dashboard/teams");
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    setCurrentStep(1);
    setTeamName("");
    setDescription("");
    setIsPrivate(true);
    setAccessPassword("");
    setRewritePassword("");
    setMaxMembers(20);
    setLogoFile(null);
    setLogoPreview(null);
    setMemberIds([]);
    setCreatedTeamId(null);
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() =>
          currentStep === 2
            ? setCurrentStep(1)
            : router.push("/dashboard/teams")
        }
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
      >
        <ArrowLeft size={18} />
        {currentStep === 2 ? "Back to Step 1" : "Back to Teams"}
      </button>

      <ProfileWarning progress={33} />

      {/* ── Step 1 ── */}
      {currentStep === 1 && (
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold text-white">Create New Team</h2>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
              1 / 2
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            Fill in your team details to get started
          </p>

          {step1Error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {step1Error}
            </div>
          )}

          {/* Team Name */}
          <div className="mb-5">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Team Name *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Night Owls"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                maxLength={50}
                className="w-full px-4 py-3 pl-11 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
              <Users
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Description
            </label>
            <textarea
              placeholder="Team slogan or bio..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Logo Upload */}
          <div className="mb-5">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Team Logo
            </label>
            <label className="block cursor-pointer">
              <div className="w-full h-36 bg-white/5 border-2 border-dashed border-[#455872] hover:border-cyan-400/50 rounded-xl flex flex-col items-center justify-center transition-all overflow-hidden">
                {logoPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setLogoFile(null);
                        setLogoPreview(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={28} className="text-cyan-400 mb-2" />
                    <span className="text-gray-400 text-sm">
                      Click to upload logo
                    </span>
                    <span className="text-gray-600 text-xs mt-1">
                      PNG, JPG, WEBP
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Max Members */}
          <div className="mb-5">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Max Members (1–50)
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={maxMembers}
              onChange={(e) =>
                setMaxMembers(Math.min(50, Math.max(1, Number(e.target.value))))
              }
              className="w-full px-4 py-3 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="mb-5">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Privacy
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all text-sm font-semibold ${
                  isPrivate
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                    : "bg-white/5 border-[#455872] text-gray-400 hover:border-cyan-400/40"
                }`}
              >
                <ShieldCheck size={16} /> Private
              </button>
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all text-sm font-semibold ${
                  !isPrivate
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                    : "bg-white/5 border-[#455872] text-gray-400 hover:border-cyan-400/40"
                }`}
              >
                <Globe size={16} /> Public
              </button>
            </div>
          </div>

          {/* Password fields (private only) */}
          {isPrivate && (
            <>
              <div className="mb-4">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Access Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Min 4 characters"
                    value={accessPassword}
                    onChange={(e) => setAccessPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={rewritePassword}
                    onChange={(e) => setRewritePassword(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                  />
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleContinue}
            disabled={step1Loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white rounded-xl font-semibold transition-all"
          >
            {step1Loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Creating...
              </>
            ) : (
              "Continue →"
            )}
          </button>
        </div>
      )}

      {/* ── Step 2 ── */}
      {currentStep === 2 && (
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users size={22} /> Add Team Members
            </h2>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
              2 / 2
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            Add members using their GloroID (e.g. GLR-123456). You can skip this
            step and add members later.
          </p>

          {step2Error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {step2Error}
            </div>
          )}

          {/* Input */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="GLR-123456"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMemberId()}
                className="flex-1 px-4 py-3 bg-white/5 border border-[#455872] focus:border-cyan-400 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
              <button
                onClick={addMemberId}
                className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white transition-all shrink-0"
              >
                <UserPlus size={18} />
              </button>
            </div>
          </div>

          {/* Members list */}
          {memberIds.length > 0 && (
            <div className="mb-8 space-y-2">
              <p className="text-white text-sm font-semibold mb-3">
                Members to add ({memberIds.length})
              </p>
              {memberIds.map((id) => (
                <div
                  key={id}
                  className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      {id.charAt(4) || "G"}
                    </div>
                    <span className="text-white text-sm font-medium">{id}</span>
                  </div>
                  <button
                    onClick={() => removeMemberId(id)}
                    className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all text-sm"
            >
              Skip for now
            </button>
            <button
              onClick={handleCreateTeam}
              disabled={step2Loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white rounded-xl font-semibold transition-all text-sm"
            >
              {step2Loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Adding...
                </>
              ) : (
                "Create Team"
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Success Modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative bg-linear-to-br from-[#0a1628] to-[#0d2137] border-2 border-cyan-400/30 rounded-3xl p-12 max-w-md w-full shadow-2xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Check size={36} className="text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Team Created!
              </h2>
              <p className="text-gray-400 mb-1 text-sm">
                &ldquo;{createdTeamName}&rdquo; is ready to go
              </p>
              {memberIds.length > 0 && (
                <p className="text-gray-500 text-xs mb-8">
                  with {memberIds.length} member
                  {memberIds.length !== 1 ? "s" : ""} added
                </p>
              )}
              {memberIds.length === 0 && <div className="mb-8" />}
              <div className="space-y-3">
                <button
                  onClick={handleViewTeam}
                  className="w-full px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all"
                >
                  View Team
                </button>
                <button
                  onClick={handleCreateAnother}
                  className="w-full px-8 py-3 bg-transparent border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all"
                >
                  Create Another Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
