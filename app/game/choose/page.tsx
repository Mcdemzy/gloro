"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import chooseGamesBG from "@/assets/images/chooseGamesBG.svg";

const games = [
  "Valorant",
  "League of Legends",
  "Fortnite",
  "EA FC 24",
  "COD: Warzone",
  "Apex legend",
  "PES2025",
  "PUBG",
  "Asphalt 10",
  "Mortal Kombat",
  "Modern Kombat",
  "Gundown",
  "Top Gun",
  "AeroSpace",
  "Killerbean",
  "Sniper pro",
  "Minecraft",
  "LPG fighter",
  "WHOT",
  "Scrobble",
  "Builder",
];

// Remove duplicates
const uniqueGames = [...new Set(games)];

const ChooseGamesPage = () => {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const toggleGame = (game: string) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter((g) => g !== game));
    } else {
      if (selectedGames.length < 3) {
        setSelectedGames([...selectedGames, game]);
      }
    }
  };

  const isSelected = (game: string) => selectedGames.includes(game);
  const canSelect = selectedGames.length < 3;

  return (
    <div className="min-h-screen w-full flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      {/* Content Container with BG Image */}
      <div
        className="relative w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 overflow-hidden my-4 sm:my-0"
        style={{
          background: "rgba(20, 20, 40, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-20 sm:opacity-30 md:opacity-40"
          style={{
            backgroundImage: chooseGamesBG ? `url(${chooseGamesBG.src})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              Choose your 3 Games
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              Select up to 3 games to personalise your dashboard
            </p>
            {/* Selected counter - Mobile */}
            <div className="mt-3 sm:hidden">
              <span className="text-cyan-400 font-semibold text-sm">
                {selectedGames.length}/3 selected
              </span>
            </div>
          </div>

          {/* Games Grid - Responsive columns */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto custom-scrollbar px-1">
            {uniqueGames.map((game, index) => (
              <button
                key={`${game}-${index}`}
                onClick={() => toggleGame(game)}
                disabled={!canSelect && !isSelected(game)}
                className={`
                  relative px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all
                  ${
                    isSelected(game)
                      ? "bg-gradient-to-r from-[#4E07E0] to-[#8D2DE2] text-white border border-purple-400/50 shadow-lg shadow-purple-600/30"
                      : "bg-[#1a1a2e]/60 text-white/90 border border-white/10 hover:border-white/30 hover:bg-[#1a1a2e]/80"
                  }
                  ${
                    !canSelect && !isSelected(game)
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer transform hover:scale-105 active:scale-95"
                  }
                `}
              >
                <span className="line-clamp-1">{game}</span>
                {isSelected(game) && (
                  <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-lg">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-purple-600" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Games Preview - Mobile */}
          <div className="sm:hidden mb-4">
            {selectedGames.length > 0 ? (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-400 text-xs">Selected:</span>
                {selectedGames.map((game) => (
                  <span
                    key={game}
                    className="bg-purple-600/30 text-white text-xs px-3 py-1.5 rounded-full border border-purple-400/50 flex items-center gap-1"
                  >
                    {game}
                    <button
                      onClick={() => toggleGame(game)}
                      className="ml-1 text-white/70 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs text-center">
                No games selected yet
              </p>
            )}
          </div>

          {/* Desktop Selected Counter */}
          <div className="hidden sm:flex justify-between items-center mb-4 md:mb-6">
            <span className="text-gray-400 text-sm md:text-base">
              {selectedGames.length}/3 games selected
            </span>
            {selectedGames.length > 0 && (
              <button
                onClick={() => setSelectedGames([])}
                className="text-cyan-400 hover:text-cyan-300 text-xs md:text-sm transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Continue Button */}
          <button
            disabled={selectedGames.length !== 3}
            className={`
              w-full py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl md:rounded-xl text-white font-semibold text-sm sm:text-base md:text-base transition-all
              ${
                selectedGames.length === 3
                  ? "opacity-100 hover:opacity-90 cursor-pointer hover:shadow-lg hover:shadow-purple-600/40 transform hover:scale-[1.02] active:scale-[0.98]"
                  : "opacity-50 cursor-not-allowed"
              }
            `}
            style={{
              background: "linear-gradient(90deg, #4E07E0 0%, #8D2DE2 99.99%)",
            }}
          >
            Continue {selectedGames.length === 3 && "→"}
          </button>

          {/* Help text */}
          <p className="text-center text-gray-500 text-xs mt-4 sm:mt-6">
            {selectedGames.length === 3 
              ? "Great choices! Click continue to proceed" 
              : `Select ${3 - selectedGames.length} more game${3 - selectedGames.length !== 1 ? 's' : ''} to continue`}
          </p>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
        @media (max-width: 640px) {
          .custom-scrollbar {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};

export default ChooseGamesPage;