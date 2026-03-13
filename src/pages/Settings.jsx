import React, { useEffect, useRef, useState } from "react";
import { Loader2, AlertTriangle, Upload, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import ApiKeyManagement from "../components/ApiKeyManagement";
import PreferencesModal from "../components/model/PreferencesModal";
import SessionSecurity from "../components/SessionSecurity";

const API_URL = "http://localhost:5000/api";

/* TOGGLE */
const Toggle = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    onClick={onChange}
    disabled={disabled}
    className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
      checked ? "bg-teal-600" : "bg-gray-300"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
        checked ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("adminToken");

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Authentication required. Please login again.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.success) {
          setProfile(data.data);
          toast.success("Profile loaded successfully");
        } else {
          setError("Failed to load profile");
          toast.error("Failed to load profile");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile. Please try again.");
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  /* ================= AVATAR UPLOAD ================= */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${API_URL}/admin/me/avatar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile((p) => ({ ...p, avatar: data.data?.avatar }));
        toast.success("Avatar updated successfully");
      } else {
        toast.error("Failed to update avatar");
      }
    } catch (err) {
      console.error("Failed to upload avatar:", err);
      toast.error("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  const triggerFilePicker = () => fileInputRef.current?.click();

  /* ================= SAVE PROFILE ================= */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/admin/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          department: profile.department,
          notifications: profile.notifications,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        toast.success("Profile updated successfully");
        setEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleNotification = (key) => {
    setProfile((p) => ({
      ...p,
      notifications: {
        ...p.notifications,
        [key]: !p.notifications[key],
      },
    }));
  };

  const getNotificationDescription = (key) =>
    ({
      system: "System status alerts",
      login: "Login alerts",
      fraud: "Suspicious activity",
      updates: "Platform updates",
      failedActions: "Failed actions",
      criticalErrors: "Critical errors",
    })[key];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 pt-20 md:px-9 px-5">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600 mx-auto" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="max-w-6xl mx-auto p-7 sm:p-2 md:p-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Error Loading Settings
            </h3>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto p-7 sm:p-2 md:p-10 text-left">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account, security and preferences
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <nav className="sticky top-0 z-20 bg-white border-b">
          <div className="flex flex-wrap sm:flex-nowrap justify-start sm:justify-center gap-2 px-2 py-2">
            {[
              "Profile",
              "Security",
              "Preferences",
              "API Keys",
              "Sessions & Devices",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "Preferences") setShowPreferences(true);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-7 sm:p-4 md:p-8">
          {activeTab === "Profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT */}
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden shadow-lg border-4 border-white">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        className="w-full h-full object-cover"
                        alt="Profile avatar"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-sm text-gray-400">
                        No photo
                      </div>
                    )}
                  </div>

                  <button
                    onClick={triggerFilePicker}
                    disabled={uploading}
                    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full p-3 shadow-lg transition-colors"
                    title="Upload avatar"
                  >
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-blue-900 mb-2">Role</p>
                  <div className="bg-white px-3 py-2 rounded-md text-sm font-medium text-gray-700 border border-blue-100">
                    {profile.role || "N/A"}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSave} className="space-y-6">
                  <section className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                    <h2 className="font-semibold text-gray-800 mb-4">
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        ["Name", "name"],
                        ["Email", "email"],
                        ["Phone", "phone"],
                        ["Department", "department"],
                      ].map(([label, key]) => (
                        <label key={key} className="text-sm">
                          <span className="block text-xs font-medium text-gray-700 mb-1">
                            {label}
                          </span>
                          <input
                            value={profile[key] || ""}
                            disabled={!editing || key === "email"}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                [key]: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors text-gray-700"
                          />
                        </label>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditing((v) => !v)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        {editing ? "Cancel" : "Edit"}
                      </button>

                      <button
                        type="submit"
                        disabled={!editing || saving}
                        className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save changes"
                        )}
                      </button>
                    </div>
                  </section>

                  <section className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Notification Settings
                    </h3>

                    <div className="flex flex-col gap-4">
                      {Object.entries(profile.notifications || {}).map(
                        ([key, val]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="capitalize text-sm font-medium text-gray-800">
                                {key}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {getNotificationDescription(key)}
                              </p>
                            </div>

                            <Toggle
                              checked={val}
                              disabled={!editing}
                              onChange={() => handleToggleNotification(key)}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                </form>
              </div>
            </div>
          )}

          {activeTab === "Security" && <SessionSecurity />}
          {activeTab === "API Keys" && <ApiKeyManagement />}
        </div>
      </div>

      {showPreferences && (
        <PreferencesModal onClose={() => setShowPreferences(false)} />
      )}
    </div>
  );
};

export default Settings;
