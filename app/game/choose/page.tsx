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
  "PUBG",
  "Minecraft",
  "LPG fighter",
  "PUBG",
  "WHOT",
  "PUBG",
  "Scrobble",
  "Builder",
];

const ChooseGamesPage = () => {
  const [selectedGames, setSelectedGames] = useState([]);

  const toggleGame = (game) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter((g) => g !== game));
    } else {
      if (selectedGames.length < 3) {
        setSelectedGames([...selectedGames, game]);
      }
    }
  };

  const isSelected = (game) => selectedGames.includes(game);
  const canSelect = selectedGames.length < 3;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      {/* Content Container with BG Image */}
      <div
        className="relative w-full max-w-5xl rounded-3xl p-16 overflow-hidden"
        style={{
          background: "rgba(20, 20, 40, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Background Image - use your SVG import */}
        <div
          className="absolute inset-0 opacity-40"
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
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-3">
              Choose your 3 Games
            </h1>
            <p className="text-gray-400 text-base">
              Select up 3 games to personalise your dashboard
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {games.map((game, index) => (
              <button
                key={index}
                onClick={() => toggleGame(game)}
                disabled={!canSelect && !isSelected(game)}
                className={`
                  relative px-5 py-3.5 rounded-xl font-medium text-sm transition-all
                  ${
                    isSelected(game)
                      ? "bg-gradient-to-r from-[#4E07E0] to-[#8D2DE2] text-white border border-purple-400/50"
                      : "bg-[#1a1a2e]/60 text-white border border-white/10 hover:border-white/20"
                  }
                  ${
                    !canSelect && !isSelected(game)
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                {game}
                {isSelected(game) && (
                  <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            disabled={selectedGames.length !== 3}
            className={`
              w-full py-4 rounded-xl text-white font-semibold text-base transition-all
              ${
                selectedGames.length === 3
                  ? "opacity-100 hover:opacity-90 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }
            `}
            style={{
              background: "linear-gradient(90deg, #4E07E0 0%, #8D2DE2 99.99%)",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseGamesPage;
