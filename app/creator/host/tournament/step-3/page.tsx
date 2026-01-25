"use client";
import React, { useState } from "react";
import { Upload, X, FileText, Bold, Italic, Underline } from "lucide-react";
import { useRouter } from "next/navigation";
import TournamentFormLayout from "@/components/creator/host/TournamentFormLayout";

interface UploadedRule {
  game: string;
  fileName: string;
  size: string;
}

export default function HostTournamentStep3() {
  const router = useRouter();
  const [uploadedRules, setUploadedRules] = useState<UploadedRule[]>([]);
  const [description, setDescription] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");

  const games = [
    "PUBG Mobile",
    "COD Mobile",
    "Mortal Kombat",
    "Free Fire",
    "Apex Mobile",
  ];

  const handleFileSelect = (gameName: string) => {
    // Simulate file upload
    const mockFile: UploadedRule = {
      game: gameName,
      fileName: `${gameName}_rules.pdf`,
      size: "2.5 MB",
    };

    if (!uploadedRules.find((r) => r.game === gameName)) {
      setUploadedRules([...uploadedRules, mockFile]);
    }
    setShowUploadModal(false);
  };

  const handleRemoveRule = (gameName: string) => {
    setUploadedRules(uploadedRules.filter((r) => r.game !== gameName));
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { uploadedRules, description });
    alert("Tournament rules saved as draft!");
  };

  const handleProceed = () => {
    if (uploadedRules.length === 0) {
      alert("Please upload rules for at least one game");
      return;
    }

    // Navigate to complete page
    router.push("/creator/host/tournament/complete");
  };

  const applyFormatting = (format: string) => {
    // In a real implementation, you'd use a rich text editor library
    console.log("Applying format:", format);
  };

  return (
    <TournamentFormLayout
      currentStep={3}
      onSaveDraft={handleSaveDraft}
      onProceed={handleProceed}
    >
      {/* Game Rules Upload */}
      <div>
        <label className="text-white font-semibold mb-3 block text-lg">
          GAME RULES <span className="text-red-400">*</span>
        </label>
        <p className="text-cyan-400 text-sm mb-4">
          Upload the rules for each game below
        </p>

        {/* Upload Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6 px-4 py-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20"
        >
          <Upload size={18} />
          Click to upload rules
        </button>

        {/* Uploaded Rules List */}
        <div className="space-y-3">
          {games.map((game) => {
            const uploaded = uploadedRules.find((r) => r.game === game);

            return (
              <div
                key={game}
                className="flex items-center justify-between p-4 bg-[#0a2d36] border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-cyan-400" />
                  <span className="text-white font-medium">{game}</span>
                </div>

                {uploaded ? (
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                      {uploaded.fileName}
                    </span>
                    <button
                      onClick={() => handleRemoveRule(game)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedGame(game);
                      setShowUploadModal(true);
                    }}
                    className="px-4 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-white font-semibold text-lg">
            Description <span className="text-red-400">*</span>
          </label>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyFormatting("h2")}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-all"
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => applyFormatting("h3")}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-all"
              title="Heading 3"
            >
              H3
            </button>
            <button
              onClick={() => applyFormatting("underline")}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-all"
              title="Underline"
            >
              <Underline size={16} />
            </button>
            <button
              onClick={() => applyFormatting("bold")}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-all"
              title="Bold"
            >
              <Bold size={16} />
            </button>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your descriptions..."
          rows={12}
          className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
        />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
          ></div>

          <div className="relative bg-gradient-to-br from-[#0c3540] to-[#0a2d36] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Upload Rules
            </h3>

            {selectedGame && (
              <p className="text-cyan-400 text-center mb-6">
                Upload rules for{" "}
                <span className="font-bold">{selectedGame}</span>
              </p>
            )}

            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-cyan-500/30 rounded-xl p-12 text-center hover:border-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer group"
              onClick={() => {
                // Simulate file selection
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".pdf,.doc,.docx";
                input.onchange = () => {
                  if (selectedGame) {
                    handleFileSelect(selectedGame);
                  }
                };
                input.click();
              }}
            >
              <Upload
                size={48}
                className="text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <p className="text-white font-medium mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-400 text-sm">
                PDF, DOC, DOCX (MAX. 10MB)
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </TournamentFormLayout>
  );
}
