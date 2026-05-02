import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020818]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
