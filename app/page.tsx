import Image from "next/image";
import HeroBG1 from "@/assets/images/HeroBG.png";
import HeroBG2 from "@/assets/images/HeroBG3.png";
import HeroSection from "@/components/landing/HeroSection";
import LatestCompetitions from "@/components/landing/LatestCompetitions";
import Trending from "@/components/landing/Trending";
import LPNavbar from "@/components/new/LPNavbar";
import Footer from "@/components/shared/Footer";

const page = () => {
  return (
    <>
      <main className="w-full min-h-screen relative overflow-hidden bg-[#020818]">
        {/* Base background image */}
        <Image 
          src={HeroBG1} 
          alt="" 
          fill
          className="object-cover"
          priority
        />
        
        {/* Hex mesh overlay */}
        <Image 
          src={HeroBG2} 
          alt="" 
          fill
          className="object-cover"
          priority
        />
        
        {/* Content layer */}
        <div className="relative z-10 text-white">
          <LPNavbar/>
          <HeroSection />
          <Trending/>
          <LatestCompetitions/>
          <Footer/>
        </div>
      </main>
    </>
  );
};

export default page;