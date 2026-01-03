const HeroSection = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="orbitron font-bold text-[72px] leading-[110px] tracking-[0.05em] text-center">
          THE ULTIMATE <br />
          <span className="font-extrabold text-[96px] leading-[110px] tracking-[0.05em] text-[#7C3AED]">
            GAMING
          </span>
          <span className="font-extrabold text-[96px] leading-[110px] tracking-[0.05em] ">{" "}
            PLATFORM
          </span>
        </h1>

        <p className="mt-8 max-w-[800px] text-xl font-light text-gray-300">
          All your gaming essentials in one place. Tournaments, news, streams
          and community—designed for players and creators.
        </p>

        <div className="my-12">
          {/* If you have any content for this div, add it here */}
        </div>

        <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-[0px_6px_22px_0px_#00000099] hover:shadow-[0px_6px_30px_0px_#000000cc] transition-all duration-300 hover:scale-105">
          See all Tournaments
        </button>
      </main>
    </>
  );
};

export default HeroSection;
