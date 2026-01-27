import React from "react";
import "@/components/css/Test.css";
import {
  Trophy,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-black flex items-center ">
      <div className="nav-rail relative flex flex-col items-center gap-8 py-10">
        <div className="icon"><Trophy /></div>
        <div className="icon"><Users /></div>
        <div className="icon"><User /></div>
        <div className="icon"><Settings /></div>

        <div className="mt-auto icon text-cyan-400">
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Page;
