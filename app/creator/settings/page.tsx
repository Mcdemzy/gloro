"use client";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Mail,
  Globe,
  Lock,
  User,
  Shield,
} from "lucide-react";

export default function CreatorSettingsPage() {
  const [hostName, setHostName] = useState(
    "Ultimate Competition Royale Centre",
  );
  const [email, setEmail] = useState("creator@gloro.com");
  const [notifications, setNotifications] = useState({
    newRegistrations: true,
    tournamentUpdates: true,
    communityMessages: false,
    ticketAlerts: true,
  });

  const handleSave = () => {
    console.log("Saving settings:", { hostName, email, notifications });
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Creator's Settings</h1>
        <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50">
          Switch to User's Dashboard
        </button>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <User size={20} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Profile Information
            </h2>
          </div>

          <div className="space-y-6">
            {/* Tournament Host Name */}
            <div>
              <label className="text-white font-semibold mb-3 block">
                Tournament Host Name
              </label>
              <input
                type="text"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <p className="text-gray-400 text-sm mt-2">
                This name will be displayed as the tournament organizer
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="text-white font-semibold mb-3 block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Used for tournament notifications and communications
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Bell size={20} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-4">
            {/* New Registrations */}
            <div className="flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">
                  New Team Registrations
                </h3>
                <p className="text-gray-400 text-sm">
                  Get notified when teams register for your tournaments
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    newRegistrations: !notifications.newRegistrations,
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.newRegistrations ? "bg-cyan-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.newRegistrations
                      ? "translate-x-7"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>

            {/* Tournament Updates */}
            <div className="flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">
                  Tournament Updates
                </h3>
                <p className="text-gray-400 text-sm">
                  Receive updates about ongoing tournaments
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    tournamentUpdates: !notifications.tournamentUpdates,
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.tournamentUpdates
                    ? "bg-cyan-500"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.tournamentUpdates
                      ? "translate-x-7"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>

            {/* Community Messages */}
            <div className="flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">
                  Community Messages
                </h3>
                <p className="text-gray-400 text-sm">
                  Get alerts for new community channel messages
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    communityMessages: !notifications.communityMessages,
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.communityMessages
                    ? "bg-cyan-500"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.communityMessages
                      ? "translate-x-7"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>

            {/* Ticket Alerts */}
            <div className="flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">
                  Support Ticket Alerts
                </h3>
                <p className="text-gray-400 text-sm">
                  Receive notifications for new support tickets
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    ticketAlerts: !notifications.ticketAlerts,
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.ticketAlerts ? "bg-cyan-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.ticketAlerts
                      ? "translate-x-7"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Shield size={20} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            {/* Change Password */}
            <button className="w-full flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg hover:bg-[#0a2d36] transition-all group">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-cyan-400" />
                <div className="text-left">
                  <h3 className="text-white font-medium mb-1">
                    Change Password
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Update your account password
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-cyan-400 transition-colors"
              />
            </button>

            {/* Two-Factor Authentication */}
            <button className="w-full flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg hover:bg-[#0a2d36] transition-all group">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-cyan-400" />
                <div className="text-left">
                  <h3 className="text-white font-medium mb-1">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-cyan-400 transition-colors"
              />
            </button>

            {/* Privacy Settings */}
            <button className="w-full flex items-center justify-between p-4 bg-[#0a2d36]/60 rounded-lg hover:bg-[#0a2d36] transition-all group">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-cyan-400" />
                <div className="text-left">
                  <h3 className="text-white font-medium mb-1">
                    Privacy Settings
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Manage your data and visibility
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-cyan-400 transition-colors"
              />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
