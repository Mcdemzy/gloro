import {
  AlertTriangle,
  ArrowLeft,
  Trophy,
  ArrowRight,
  Settings,
} from "lucide-react";

export default function TournamentComplete() {
  return (
    <div className="space-y-6 ">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white">Create New Tournament</h1>

      {/* Warning Alert */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={24} className="text-red-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-red-400 font-semibold mb-1">
            NOTE: If one of the team members is yet to set config for a
            particular game they are applying to, the team wont be allowed to
            register for the game.
          </h3>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold">
            1
          </div>
          <div className="h-1 w-20 bg-cyan-500"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold">
            2
          </div>
          <div className="h-1 w-20 bg-cyan-500"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold">
            3
          </div>
          <div className="h-1 w-20 bg-cyan-500"></div>
        </div>
        <div className="w-16 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold text-sm px-3">
          Done
        </div>
      </div>

      {/* Success Card */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-12">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-purple-600 to-cyan-500 opacity-30 blur-3xl"></div>

            {/* Trophy */}
            <div className="relative">
              <Trophy
                size={120}
                className="text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                strokeWidth={1.5}
              />

              {/* Trophy base glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-t from-purple-500/50 to-transparent blur-xl rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          You have successfully created a tournament
        </h2>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center max-w-2xl mx-auto">
          <button className="flex-1 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2">
            View my Tournaments
            <ArrowRight size={20} />
          </button>
          <button className="flex-1 px-8 py-4 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <Settings size={20} />
            Manage Tournament
          </button>
        </div>
      </div>
    </div>
  );
}
