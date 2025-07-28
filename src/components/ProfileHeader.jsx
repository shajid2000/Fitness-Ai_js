"use client";

import { UserResource } from "@clerk/types";
import CornerElements from "./CornerElements";
import { Sparkles } from "lucide-react";

const ProfileHeader = ({ user }) => {
  if (!user) return null;

  return (
    <div className="relative mb-10 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 group">
      <CornerElements />

      {/* Floating animation gradient background */}
      <div className="absolute -inset-20 blur-3xl opacity-20 pointer-events-none animate-pulse bg-gradient-to-br from-purple-500 to-pink-500" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          {user.imageUrl ? (
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-inner border border-white/10">
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-white text-4xl font-black">
              {user.fullName?.charAt(0) || "U"}
            </div>
          )}
          {/* Status Dot */}
          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-slate-900 animate-pulse" />
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {user.fullName}
            </h1>

            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <p className="text-xs font-mono text-primary uppercase">User Active</p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 my-3" />

          <p className="text-gray-400 font-mono text-sm">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
