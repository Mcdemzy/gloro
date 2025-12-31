import Navbar from "@/components/shared/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <main className="bg-cyan-900 min-h-screen w-full">
        <Navbar />
        <div className="flex justify-center items-center h-screen text-7xl text-center font-bold uppercase text-white orbitron">
          Gloro Landing Page
        </div>
      </main>
    </>
  );
};

export default page;
