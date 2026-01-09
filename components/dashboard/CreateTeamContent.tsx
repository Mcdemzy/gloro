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
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateTeamContent = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1 or 2
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState<string | null>(null);
  const [accessPassword, setAccessPassword] = useState("");
  const [rewritePassword, setRewritePassword] = useState("");
  const [members, setMembers] = useState<{ id: number; gloroId: string }[]>([]);
  const [memberInput, setMemberInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (teamName && accessPassword && rewritePassword) {
      if (accessPassword === rewritePassword) {
        setCurrentStep(2);
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please fill all fields!");
    }
  };

  const addMember = () => {
    if (memberInput.trim()) {
      setMembers([...members, { id: Date.now(), gloroId: memberInput.trim() }]);
      setMemberInput("");
    }
  };

  const removeMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleSkip = () => {
    setShowSuccessModal(true);
  };

  const handleCreateTeam = () => {
    setShowSuccessModal(true);
  };

  const handleViewTeam = () => {
    // In a real app, you would navigate to the newly created team
    // For now, navigate back to teams list
    router.push("/dashboard/teams");
    // Reset form
    setCurrentStep(1);
    setTeamName("");
    setTeamImage(null);
    setAccessPassword("");
    setRewritePassword("");
    setMembers([]);
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    setCurrentStep(1);
    setTeamName("");
    setTeamImage(null);
    setAccessPassword("");
    setRewritePassword("");
    setMembers([]);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      router.push("/dashboard/teams");
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Back to Teams
      </button>

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

      {/* Step 1: Create New Team */}
      {currentStep === 1 && (
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Create New Team</h2>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
              1/2
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            Create a new team in two steps right now
          </p>

          {/* Team Name */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/5 border border-cyan-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <Users
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block cursor-pointer">
              <div className="w-full h-48 bg-white/5 border-2 border-dashed border-cyan-400/30 rounded-xl flex flex-col items-center justify-center hover:bg-white/10 transition-all">
                {teamImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={teamImage}
                      alt="Team"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setTeamImage(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-600 rounded-full"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={32} className="text-cyan-400 mb-2" />
                    <span className="text-gray-400 text-sm">Add picture</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Access Password */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="password"
                placeholder="Access password"
                value={accessPassword}
                onChange={(e) => setAccessPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/5 border border-cyan-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
              />
            </div>
          </div>

          {/* Rewrite Password */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="password"
                placeholder="Rewrite password"
                value={rewritePassword}
                onChange={(e) => setRewritePassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/5 border border-cyan-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Add Team Members */}
      {currentStep === 2 && (
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users size={24} />
              Add team members
            </h2>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
              2/2
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            Add team members using GloroID only
          </p>

          {/* Add Member Input */}
          <div className="mb-6">
            <div className="relative flex gap-2">
              <input
                type="text"
                placeholder="Add member by GloroID"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addMember()}
                className="flex-1 px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={addMember}
                className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white transition-all"
              >
                <UserPlus size={20} />
              </button>
            </div>
          </div>

          {/* Members List */}
          {members.length > 0 && (
            <div className="mb-8 space-y-3">
              <h3 className="text-white font-semibold mb-2">
                Team Members ({members.length})
              </h3>
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {member.gloroId.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">
                      {member.gloroId}
                    </span>
                  </div>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
            >
              Skip
            </button>
            <button
              onClick={handleCreateTeam}
              className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Create Team
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0d2137] border-2 border-cyan-400/30 rounded-3xl p-12 max-w-lg w-full shadow-2xl shadow-cyan-500/20">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Check size={40} className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-3">
                Team Created
                <br />
                Successfully!
              </h2>

              {/* Subtitle */}
              <p className="text-gray-400 mb-2">
                Your team "{teamName}" has been created
              </p>
              {members.length > 0 && (
                <p className="text-gray-400 mb-8 text-sm">
                  with {members.length} member{members.length !== 1 ? "s" : ""}
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleViewTeam}
                  className="w-full px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  View Team
                </button>
                <button
                  onClick={handleCreateAnother}
                  className="w-full px-8 py-3 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all duration-300"
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
};

export default CreateTeamContent;
