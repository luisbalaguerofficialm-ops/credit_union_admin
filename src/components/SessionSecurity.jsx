import React, { useEffect, useState } from "react";
import axios from "axios";

/* API URL pattern */
const API_URL = "https://admin-credit-union.onrender.com/api";

const SessionSecurity = () => {
  const token = localStorage.getItem("token");

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [autoLogout, setAutoLogout] = useState(false);
  const [timeout, setTimeoutValue] = useState("10 minutes");
  const [blockMultiple, setBlockMultiple] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  /* ================================
     Fetch Active Sessions
  ================================= */
  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data.sessions || []);
    } catch (err) {
      console.error("Failed to load sessions", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     Fetch Security Settings
  ================================= */
  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/session-settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAutoLogout(res.data.autoLogout);
      setTimeoutValue(res.data.timeout);
      setBlockMultiple(res.data.blockMultiple);
      setLoginAlerts(res.data.loginAlerts);
    } catch (err) {
      console.error("Failed to load settings", err);
    }
  };

  /* ================================
     Save Security Settings
  ================================= */
  const saveSettings = async (updated) => {
    try {
      await axios.put(`${API_URL}/admin/session-settings`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Failed to save settings", err);
    }
  };

  /* ================================
     Revoke Session
  ================================= */
  const revokeSession = async (id) => {
    try {
      await axios.post(
        `${API_URL}/admin/sessions/revoke/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchSessions();
    } catch (err) {
      console.error("Failed to revoke session", err);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchSettings();
  }, []);

  return (
    <div className="max-w-xl space-y-6">
      {/* ================= Active Sessions ================= */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Active Sessions
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-gray-500">No active sessions</p>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              className="mb-3 flex items-center justify-between rounded-md border border-gray-100 p-4"
            >
              <div>
                <p className="font-medium text-gray-900">{session.device}</p>
                <p className="text-sm text-gray-500">
                  {session.location} · {session.ip} ·{" "}
                  {session.isCurrent ? "Active now" : session.lastActive}
                </p>
              </div>

              {session.isCurrent ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Current
                </span>
              ) : (
                <button
                  onClick={() => revokeSession(session._id)}
                  className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  Revoke
                </button>
              )}
            </div>
          ))
        )}
      </section>

      {/* ================= Session Security ================= */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Session Security
        </h2>

        {/* Auto Logout Timeout */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Auto-logout Timeout
          </label>
          <select
            value={timeout}
            onChange={(e) => {
              setTimeoutValue(e.target.value);
              saveSettings({
                autoLogout,
                timeout: e.target.value,
                blockMultiple,
                loginAlerts,
              });
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option>5 minutes</option>
            <option>10 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
          </select>
        </div>

        {/* Auto Logout */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoLogout}
            onChange={() => {
              setAutoLogout(!autoLogout);
              saveSettings({
                autoLogout: !autoLogout,
                timeout,
                blockMultiple,
                loginAlerts,
              });
            }}
            className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
          />
          <label className="text-sm text-gray-600">
            Automatically log out after inactivity
          </label>
        </div>

        <ToggleRow
          title="Block Multiple Concurrent Logins"
          description="Only allow one active session"
          enabled={blockMultiple}
          onToggle={(val) => {
            setBlockMultiple(val);
            saveSettings({
              autoLogout,
              timeout,
              blockMultiple: val,
              loginAlerts,
            });
          }}
        />

        <ToggleRow
          title="Login Notification Emails"
          description="Receive alerts on new logins"
          enabled={loginAlerts}
          onToggle={(val) => {
            setLoginAlerts(val);
            saveSettings({
              autoLogout,
              timeout,
              blockMultiple,
              loginAlerts: val,
            });
          }}
        />
      </section>
    </div>
  );
};

/* ================= Toggle Row ================= */
function ToggleRow({ title, description, enabled, onToggle }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onToggle(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default SessionSecurity;
