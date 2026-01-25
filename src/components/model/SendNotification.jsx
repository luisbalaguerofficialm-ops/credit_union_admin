import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CreateNewTemplate from "../model/CreateNewTemlate.jsx";

const SendNotification = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [channels, setChannels] = useState({
    inApp: false,
    sms: false,
    email: false,
  });
  const [audience, setAudience] = useState("all");
  const [userId, setUserId] = useState("");
  const [schedule, setSchedule] = useState("now");
  const [scheduledTime, setScheduledTime] = useState("");

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch templates and history on mount
  useEffect(() => {
    fetchTemplates();
    if (activeTab === "history") {
      fetchNotificationHistory();
    }
  }, [activeTab]);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/templates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates || []);
      }
    } catch (err) {
      console.error("Fetch templates error:", err);
    }
  };

  const fetchNotificationHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/notifications/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setHistory(data.notifications || []);
      } else {
        toast.error(data.message || "Failed to fetch history");
      }
    } catch (err) {
      console.error("Fetch history error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    if (!channels.inApp && !channels.sms && !channels.email) {
      toast.error("Please select at least one channel");
      return;
    }
    if (audience === "specific" && !userId.trim()) {
      toast.error("Please enter a user ID");
      return;
    }

    try {
      setSending(true);
      const payload = {
        title,
        message,
        templateId: templateId || null,
        channels: Object.keys(channels).filter((k) => channels[k]),
        audience,
        userId: audience === "specific" ? userId : null,
        schedule: schedule === "now" ? "immediate" : "scheduled",
        scheduledTime: schedule === "later" ? scheduledTime : null,
      };

      const res = await fetch(`${API_URL}/admin/notifications/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Notification sent successfully");
        setTitle("");
        setMessage("");
        setTemplateId("");
        setChannels({ inApp: false, sms: false, email: false });
        setAudience("all");
        setUserId("");
        setSchedule("now");
      } else {
        toast.error(data.message || "Failed to send notification");
      }
    } catch (err) {
      console.error("Send notification error:", err);
      toast.error("Error connecting to server");
    } finally {
      setSending(false);
    }
  };

  const handleCreateTemplate = (newTemplate) => {
    setTemplates((prev) => [...prev, newTemplate]);
    setShowTemplateModal(false);
    toast.success("Template created successfully");
  };

  return (
    <div className="w-full min-h-screen flex mt-15 flex-col text-left items-center bg-gray-50 p-6">
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("send")}
          className={`px-5 py-2 rounded-md ${
            activeTab === "send"
              ? "bg-[#0A7EA4] text-white"
              : "border text-gray-600"
          }`}
        >
          Send Notification
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2 rounded-md ${
            activeTab === "history"
              ? "bg-[#0A7EA4] text-white"
              : "border text-gray-600"
          }`}
        >
          Notification History
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={`px-5 py-2 rounded-md ${
            activeTab === "templates"
              ? "bg-[#0A7EA4] text-white"
              : "border text-gray-600"
          }`}
        >
          Templates
        </button>
      </div>

      {/* ===================================================== */}
      {/*                   SEND NOTIFICATION FORM             */}
      {/* ===================================================== */}
      {activeTab === "send" && (
        <div className="w-full max-w-3xl bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Send Notifications</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={sending}
              className="w-full border rounded-md px-3 py-2 disabled:opacity-50"
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="3"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
              className="w-full border rounded-md px-3 py-2 disabled:opacity-50"
            ></textarea>
          </div>

          {/* Template */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Template (optional)
            </label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              disabled={sending}
              className="w-full border rounded-md px-3 py-2 disabled:opacity-50"
            >
              <option value="">Select a template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Channels */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Channels</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={channels.inApp}
                  onChange={(e) =>
                    setChannels({ ...channels, inApp: e.target.checked })
                  }
                  disabled={sending}
                />
                In-App
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={channels.sms}
                  onChange={(e) =>
                    setChannels({ ...channels, sms: e.target.checked })
                  }
                  disabled={sending}
                />
                SMS
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={channels.email}
                  onChange={(e) =>
                    setChannels({ ...channels, email: e.target.checked })
                  }
                  disabled={sending}
                />
                Email
              </label>
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Target Audience
            </label>

            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === "all"}
                    onChange={() => setAudience("all")}
                    disabled={sending}
                  />
                  All Users
                </div>
                <span className="text-gray-500">14,000 users</span>
              </label>

              <label className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === "verified"}
                    onChange={() => setAudience("verified")}
                    disabled={sending}
                  />
                  Verified Users
                </div>
                <span className="text-gray-500">12,000 users</span>
              </label>

              <label className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === "kyc_pending"}
                    onChange={() => setAudience("kyc_pending")}
                    disabled={sending}
                  />
                  KYC Pending Users
                </div>
                <span className="text-gray-500">2,000 users</span>
              </label>

              <label className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === "inactive"}
                    onChange={() => setAudience("inactive")}
                    disabled={sending}
                  />
                  Inactive Users
                </div>
                <span className="text-gray-500">2,000 users</span>
              </label>

              <label className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === "specific"}
                    onChange={() => setAudience("specific")}
                    disabled={sending}
                  />
                  Specific User
                </div>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={sending}
                  className="border rounded-md px-3 py-1 w-40 disabled:opacity-50"
                />
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Schedule</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="schedule"
                  checked={schedule === "now"}
                  onChange={() => setSchedule("now")}
                  disabled={sending}
                />
                Send Now
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="schedule"
                  checked={schedule === "later"}
                  onChange={() => setSchedule("later")}
                  disabled={sending}
                />
                Schedule Later
                {schedule === "later" && (
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    disabled={sending}
                    className="border rounded-md px-3 py-1 disabled:opacity-50"
                  />
                )}
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              className="px-6 py-2 border rounded-md disabled:opacity-50"
              disabled={sending}
            >
              Preview
            </button>

            <button
              onClick={handleSendNotification}
              disabled={sending}
              className="px-6 py-2 bg-[#0A7EA4] text-white rounded-md disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/*                 NOTIFICATION HISTORY                 */}
      {activeTab === "history" && (
        <div className="w-full max-w-6xl bg-white p-4 sm:p-6 rounded-xl shadow overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Notification History
          </h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading history...</p>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm sm:text-base min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-100 text-gray-500 text-left">
                      <th className="p-2 sm:p-3">Title</th>
                      <th className="p-2 sm:p-3">Channel</th>
                      <th className="p-2 sm:p-3">Target</th>
                      <th className="p-2 sm:p-3">Sent To</th>
                      <th className="p-2 sm:p-3">Delivery Time</th>
                      <th className="p-2 sm:p-3">Created By</th>
                      <th className="p-2 sm:p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-3 text-center text-gray-600"
                        >
                          No notifications sent yet
                        </td>
                      </tr>
                    ) : (
                      history.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 sm:p-3">{item.title}</td>
                          <td className="p-2 sm:p-3">
                            <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm">
                              {item.channel}
                            </span>
                          </td>
                          <td className="p-2 sm:p-3">{item.audience}</td>
                          <td className="p-2 sm:p-3">{item.sentCount}</td>
                          <td className="p-2 sm:p-3">
                            {new Date(item.createdAt).toLocaleString()}
                          </td>
                          <td className="p-2 sm:p-3">{item.createdBy}</td>
                          <td className="p-2 sm:p-3">
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                                item.status === "Delivered"
                                  ? "bg-green-100 text-green-600"
                                  : item.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-red-100 text-red-600"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* ===================================================== */}
      {/*                      TEMPLATES UI                    */}
      {/* ===================================================== */}
      {activeTab === "templates" && (
        <div className="w-full max-w-6xl bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Notification Templates</h2>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="flex items-center gap-2 bg-[#0A7EA4] text-white px-4 py-2 rounded-md"
            >
              + Create Template
            </button>
          </div>

          {templates.length === 0 ? (
            <p className="text-center text-gray-600">No templates yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{template.name}</h3>
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 rounded-full">
                        ✏️
                      </button>
                      <button className="p-2 bg-gray-100 rounded-full">
                        🗑️
                      </button>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      template.type === "Email"
                        ? "bg-blue-100 text-blue-700"
                        : template.type === "SMS"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {template.type}
                  </span>

                  <p className="mt-3 text-sm text-gray-700">
                    {template.subject || template.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {template.content?.substring(0, 100)}...
                  </p>

                  <div className="mt-4 flex justify-between text-xs text-gray-500">
                    <span>
                      Modified{" "}
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </span>
                    <span>{template.variableCount || 0} Variables</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showTemplateModal && (
        <CreateNewTemplate
          onClose={() => setShowTemplateModal(false)}
          onSuccess={fetchTemplates}
        />
      )}
    </div>
  );
};

export default SendNotification;
