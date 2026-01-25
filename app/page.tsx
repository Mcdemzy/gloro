// import Navbar from "@/components/shared/Navbar";
// import React from "react";

// const page = () => {
//   return (
//     <>
//       <main className="bg-cyan-900 min-h-screen w-full">
//         <Navbar />
//         <div className="flex justify-center items-center h-screen text-7xl text-center font-bold uppercase text-white orbitron">
//           Gloro Landing Page
//         </div>
//       </main>
//     </>
//   );
// };

// export default page;

import HeroBG from "@/assets/images/HeroBG.png";
import HeroSection from "@/components/landing/HeroSection";
import LatestCompetitions from "@/components/landing/LatestCompetitions";
import Trending from "@/components/landing/Trending";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const page = () => {
  return (
    <>
      <main
        className="w-full min-h-screen text-white bg-[#020818] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroBG.src})`,
        }}
      >
        <Navbar/>
        <HeroSection />
        <Trending/>
        <LatestCompetitions/>
        <Footer/>
      </main>
    </>
  );
};

export default page;
