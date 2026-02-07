import LPNavbar from "@/components/new/LPNavbar";
import React from "react";

const page = () => {
  return (
    <>
      <main
        className="min-h-screen w-full pt-5"
        style={{
          background: "rgba(2, 8, 24, 1)",
        }}
      >
        <LPNavbar />
      </main>
    </>
  );
};

export default page;
