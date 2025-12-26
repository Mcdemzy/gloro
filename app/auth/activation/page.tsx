import React from "react";
import BG from "@/assets/images/loginBG.png";
import DiceImage from "@/assets/images/dice.png";

const ActivationLinkPage = () => {
  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${BG.src})`,
      }}
    >
      {/* Gloro Logo - Top Left */}
      <div className="pt-12 pl-12 md:pl-16 lg:pl-20">
        <h1
          className="orbitron text-[48px] font-bold leading-[100%]"
          style={{
            background: "#00AAE7",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Gloro
        </h1>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Dice Image */}
        <div className="w-full max-w-[360px] mb-16">
          <img
            src={DiceImage.src}
            alt="Dice"
            className="w-full h-auto object-contain mx-auto"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6))",
            }}
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="orbitron text-3xl md:text-4xl font-semibold text-white">
            Thank you for registering
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Kindly check your email for an activation link
          </p>
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap");
        
        .orbitron {
          font-family: "Orbitron", sans-serif;
        }
      `}</style>
    </main>
  );
};

export default ActivationLinkPage;
