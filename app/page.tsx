// import HeroSection from "@/components/landing/HeroSection";
// import LatestCompetitions from "@/components/landing/LatestCompetitions";
// import Trending from "@/components/landing/Trending";
// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Navbar";
// import BG from "@/assets/images/loginBG.png";

// export default function LandingPage() {
//   return (
//     <>
//       <main
//         className="w-full min-h-screen px-26 py-8 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url(${BG.src})`,
//         }}
//       >
//         {" "}
//         <Navbar />
//         <HeroSection />
//         <Trending />
//         <LatestCompetitions />
//         <Footer />
//       </main>
//     </>
//   );
// }

import React from "react";

const page = () => {
  return <div className="bg-cyan-600 flex justify-center items-center h-screen text-7xl text-center font-bold uppercase text-white orbitron">Gloro Landing Page</div>;
};

export default page;
