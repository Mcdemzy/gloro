"use client";
import React, { useState } from "react";
import { ChevronLeft, X, Send, UserX } from "lucide-react";

const TournamentManagersPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [managerToRemove, setManagerToRemove] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailList, setEmailList] = useState([]);

  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Ahmad Amir",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Jim Lukas",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Sue Robinson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Mathew Parker",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Kim Lee Jung",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      name: "James Burrow",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    {
      id: 7,
      name: "Stone Michael",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    },
    {
      id: 8,
      name: "Peter Obi",
      avatar:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
    },
    {
      id: 9,
      name: "Whitney Jennifer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ]);

  const handleAddEmail = () => {
    if (emailInput.trim()) {
      const emails = emailInput
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e);
      setEmailList([...emailList, ...emails]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (index) => {
    setEmailList(emailList.filter((_, i) => i !== index));
  };

  const handleSendInvites = () => {
    if (emailList.length > 0) {
      console.log("Sending invites to:", emailList);
      alert(`Invitation emails sent to ${emailList.length} manager(s)!`);
      setEmailList([]);
      setShowAddModal(false);
    }
  };

  const openRemoveModal = (manager) => {
    setManagerToRemove(manager);
    setShowRemoveModal(true);
  };

  const confirmRemoveManager = () => {
    if (managerToRemove) {
      setManagers(managers.filter((m) => m.id !== managerToRemove.id));
      setShowRemoveModal(false);
      setManagerToRemove(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-4 tracking-wide">
            FIFA GLOBAL CUP COLOSSAL GAMES
          </h1>
          <p className="text-gray-400 text-sm">
            2nd December, 2025 - 28 December, 2025
          </p>
        </div>

        {/* Managers Section */}
        <div className="bg-[#0a1628]/50 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-white">Managers</h2>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all"
            >
              Add Manager
            </button>
          </div>

          {/* Managers List */}
          <div className="space-y-3">
            {managers.map((manager) => (
              <div
                key={manager.id}
                className="flex items-center justify-between p-4 bg-[#0c3540]/40 border border-cyan-500/10 rounded-lg hover:border-cyan-400/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${manager.avatar})` }}
                  ></div>
                  <span className="text-white font-medium">{manager.name}</span>
                </div>

                <button
                  onClick={() => openRemoveModal(manager)}
                  className="text-cyan-400 hover:text-red-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Manager Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            ></div>

            <div className="relative bg-gradient-to-br from-[#0c3540] to-[#0a2d36] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                Add Manager
              </h3>
              <p className="text-gray-400 text-sm text-center mb-6">
                The user will receive an invitation email
              </p>

              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddEmail()}
                      placeholder="Add comma separated emails to invite"
                      className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Email Tags */}
                {emailList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {emailList.map((email, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {email}
                        <button
                          onClick={() => handleRemoveEmail(index)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Invite Button */}
                <button
                  onClick={handleSendInvites}
                  // disabled={emailList.length === 0}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Invite
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove Manager Confirmation Modal */}
        {showRemoveModal && managerToRemove && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowRemoveModal(false)}
            ></div>

            <div className="relative bg-gradient-to-br from-[#0c3540] to-[#0a2d36] border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserX size={32} className="text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Remove Manager?
                </h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to remove{" "}
                  <span className="text-white font-semibold">
                    {managerToRemove.name}
                  </span>{" "}
                  as a manager for this tournament?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRemoveModal(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRemoveManager}
                    className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentManagersPage;
