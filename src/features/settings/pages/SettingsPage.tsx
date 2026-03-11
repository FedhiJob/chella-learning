import { useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { User, Bell, Lock, Eye, EyeOff, Save, Mail, Phone } from "lucide-react";

export default function SettingsPage() {
  const { profile } = useAppSelector((state) => state.profile);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
    twoFactorAuth: false,
    language: "en",
    currency: "USD",
    theme: "dark",
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and settings</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <User className="text-yellow-500" size={20} />
          Profile Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            <input
              type="text"
              defaultValue={profile?.fullname || ""}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Username</label>
            <input
              type="text"
              defaultValue={profile?.username || ""}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Phone</label>
            <input
              type="tel"
              placeholder="+1 234 567 8900"
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <Lock className="text-yellow-500" size={20} />
          Security
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Current Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <Bell className="text-yellow-500" size={20} />
          Notifications
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
            </div>
            <button onClick={() => handleToggle("emailNotifications")} className="w-10 h-6 bg-yellow-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
            </div>
            <button onClick={() => handleToggle("pushNotifications")} className="w-10 h-6 bg-yellow-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          <Save size={20} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-red-500/30">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Delete Account</p>
            <p className="text-gray-400 text-sm">Permanently delete your account</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

