"use client";
import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import TournamentFormLayout from "@/components/creator/host/TournamentFormLayout";

export default function HostTournamentStep3() {
  const router = useRouter();
  const [prizePool, setPrizePool] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [rulesFile, setRulesFile] = useState<File | null>(null);

  const handleSaveDraft = () => {
    console.log("Saving step 3 draft:", { prizePool, description, rules, rulesFile });
    alert("Tournament details saved as draft!");
  };

  const handleProceed = () => {
    if (!prizePool) {
      alert("Please enter prize pool");
      return;
    }
    
    if (!description) {
      alert("Please enter tournament description");
      return;
    }
    
    // Navigate to complete page
    router.push("/creator/host/tournament/complete");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRulesFile(file);
    }
  };

  return (
    <TournamentFormLayout
      currentStep={3}
      onSaveDraft={handleSaveDraft}
      onProceed={handleProceed}
    >
      {/* Prize Pool */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Prize Pool <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="text"
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
            placeholder="Enter prize amount (e.g., 50,000)"
            className="w-full pl-10 pr-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Tournament Description <span className="text-red-400">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your tournament rules, format, and details..."
          rows={5}
          className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
        />
      </div>

      {/* Rules */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Tournament Rules
        </label>
        <div className="space-y-3">
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Add detailed tournament rules..."
            rows={3}
            className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
          />
          
          <div>
            <label className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <Upload size={18} />
              <span>Or upload rules PDF</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            
            {rulesFile && (
              <div className="mt-2 flex items-center gap-2 text-green-400">
                <Check size={16} />
                <span>{rulesFile.name} uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </TournamentFormLayout>
  );
}