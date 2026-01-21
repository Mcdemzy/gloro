"use client";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CommunitiesPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  const handleBack = () => {
    router.push(`/creator/tournaments/${tournamentId}`);
  };

  return (
    <div className="min-h-screen bg-[#0a1f2e] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
            Communities Management
          </h1>
        </div>

        {/* Your communities content here */}
        <div className="text-white">Communities management content</div>
      </div>
    </div>
  );
}
