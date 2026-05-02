"use client";

import React from "react";
import { Check } from "lucide-react";
import chooseGamesBG from "@/assets/images/chooseGamesBG.svg";

import { useSelectGames } from "@/lib/hooks/auth/useAuth";
import PageLoader from "@/components/ui/PageLoader";

const games = [
  "Valorant",
  "League of Legends",
  "Fortnite",
  "EA FC 24",
  "COD: Warzone",
  "Apex Legends",
  "PES 2025",
  "PUBG",
  "Asphalt 10",
  "Mortal Kombat",
  "Modern Combat",
  "Gundown",
  "Top Gun",
  "AeroSpace",
  "Killerbean",
  "Sniper Pro",
  "Minecraft",
  "LPG Fighter",
  "WHOT",
  "Scrobble",
  "Builder",
];

const ChooseGamesPage = () => {
  const { onSubmit, isLoading } = useSelectGames();
  // Keys are "GameName-index" to safely handle any duplicate names
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const toggleGame = (game: string, index: number) => {
    const key = `${game}-${index}`;
    if (selectedKeys.includes(key)) {
      setSelectedKeys((prev) => prev.filter((k) => k !== key));
    } else if (selectedKeys.length < 3) {
      setSelectedKeys((prev) => [...prev, key]);
    }
  };

  const isSelected = (game: string, index: number) =>
    selectedKeys.includes(`${game}-${index}`);

  const handleContinue = async () => {
    // Strip "-index" suffix to get plain game names for the API
    const gameNames = selectedKeys.map((key) => key.replace(/-\d+$/, ""));
    await onSubmit(gameNames);
  };

  if (isLoading) {
    return <PageLoader message="Saving your games…" />;
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1a0a3e 0%, #0a0a1a 60%)",
      }}
    >
      {/* Background image */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: chooseGamesBG ? `url(${chooseGamesBG.src})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.55,
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[720px] rounded-2xl px-5 py-8 sm:px-8 sm:py-10"
        style={{
          background: "rgba(14, 12, 30, 0.72)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Choose your 3 Games
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Select up to 3 games to personalise your dashboard
          </p>

          {/* Selection counter dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    i < selectedKeys.length
                      ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                      : "rgba(255,255,255,0.15)",
                  transform:
                    i < selectedKeys.length ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
            <span className="text-white/40 text-xs ml-1">
              {selectedKeys.length}/3 selected
            </span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {games.map((game, index) => {
            const selected = isSelected(game, index);
            const disabled = selectedKeys.length >= 3 && !selected;

            return (
              <button
                key={`${game}-${index}`}
                onClick={() => toggleGame(game, index)}
                disabled={disabled}
                className={`
                  relative px-3 py-3 rounded-xl font-medium text-sm text-white
                  transition-all duration-200 text-center leading-snug
                  ${
                    selected
                      ? "border-2 border-[#9333ea] shadow-[0_0_12px_rgba(147,51,234,0.4)]"
                      : "border border-white/15 hover:border-white/30"
                  }
                  ${disabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}
                `}
                style={{
                  background: selected
                    ? "rgba(30, 10, 60, 0.7)"
                    : "rgba(20, 18, 40, 0.55)",
                }}
              >
                {game}
                {selected && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow">
                    <Check
                      className="w-3 h-3 text-purple-600"
                      strokeWidth={3}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedKeys.length === 0}
          className={`
            w-full py-3.5 rounded-xl text-white font-semibold text-base
            transition-all duration-200
            ${
              selectedKeys.length > 0
                ? "opacity-100 hover:opacity-90 cursor-pointer hover:shadow-[0_0_24px_rgba(138,43,226,0.5)]"
                : "opacity-40 cursor-not-allowed"
            }
          `}
          style={{
            background: "linear-gradient(90deg, #5b0fe0 0%, #9333ea 100%)",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ChooseGamesPage;
