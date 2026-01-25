import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const PreferencesModal = ({ onClose, onSuccess }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("DD/MM/YY");
  const [timezone, setTimezone] = useState("Africa/Lagos (WAT, UTC +1)");
  const [autoDetect, setAutoDetect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch admin preferences on mount
  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/preferences`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.preferences) {
        const prefs = data.preferences;
        setDarkMode(prefs.darkMode !== false);
        setLanguage(prefs.language || "English");
        setDateFormat(prefs.dateFormat || "DD/MM/YY");
        setTimezone(prefs.timezone || "Africa/Lagos (WAT, UTC +1)");
        setAutoDetect(prefs.autoDetect || false);
      }
    } catch (err) {
      console.error("Fetch preferences error:", err);
      toast.error("Failed to load preferences");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/admin/preferences`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          darkMode,
          language,
          dateFormat,
          timezone,
          autoDetect,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Preferences updated successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to save preferences");
      }
    } catch (err) {
      console.error("Save preferences error:", err);
      toast.error("Error connecting to server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-2xl rounded-xl p-6">
          <p className="text-center text-gray-600">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl max-h-screen overflow-y-auto p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display Preferences */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Display Preferences
          </h3>

          {/* Appearance */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-800">Appearance</p>
              <p className="text-sm text-gray-500">Light or Dark Mode</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              disabled={saving}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                darkMode ? "bg-green-500" : "bg-gray-200"
              } disabled:opacity-50`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Language Preference
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={saving}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
            >
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              disabled={saving}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
            >
              <option>DD/MM/YY</option>
              <option>MM/DD/YY</option>
              <option>YYYY-MM-DD</option>
              <option>DD/MM/YYYY</option>
            </select>
          </div>
        </section>

        {/* Time Zone Settings */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Time Zone Settings
          </h3>

          {/* Timezone */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Admin Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              disabled={saving}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
            >
              <option>Africa/Lagos (WAT, UTC +1)</option>
              <option>Europe/London (GMT)</option>
              <option>America/New_York (UTC -5)</option>
              <option>Asia/Tokyo (JST, UTC +9)</option>
              <option>Australia/Sydney (AEDT, UTC +11)</option>
            </select>
          </div>

          {/* Auto-detect */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoDetect}
              onChange={() => setAutoDetect(!autoDetect)}
              disabled={saving}
              className="h-4 w-4 rounded border-gray-200 text-green-500 focus:ring-green-500 disabled:opacity-50"
            />
            <label className="text-sm text-gray-700">
              Auto-detect timezone from browser
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePreferences}
            disabled={saving}
            className="px-4 py-2 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
