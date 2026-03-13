import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateNewTemplate = ({ onClose, onCreate, onSuccess }) => {
  const [templateName, setTemplateName] = useState("");
  const [templateType, setTemplateType] = useState("Email");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://admin-admin-credit.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  const variables = [
    "{{user_name}}",
    "{{amount}}",
    "{{balance}}",
    "{{platform_name}}",
    "{{date}}",
  ];

  const handleCreate = async () => {
    if (!templateName || !subject || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: templateName,
          type: templateType,
          subject,
          content,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Template created successfully");
        const newTemplate = {
          templateName,
          templateType,
          subject,
          content,
        };
        if (onCreate) onCreate(newTemplate);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to create template");
      }
    } catch (err) {
      console.error("Create template error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Template</h2>
          <button onClick={onClose} className="text-xl text-gray-500 font-bold">
            ×
          </button>
        </div>

        {/* Template Name + Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Template Name
            </label>
            <input
              type="text"
              placeholder="e.g password reset"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Template Type
            </label>
            <select
              value={templateType}
              onChange={(e) => setTemplateType(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option>Email</option>
              <option>SMS</option>
              <option>In-App</option>
            </select>
          </div>
        </div>

        {/* SUBJECT */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            placeholder="Template subject line"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            rows="4"
            placeholder="Message content with variables like {{user_name}}, {{balance}}"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          ></textarea>
        </div>

        {/* AVAILABLE VARIABLES */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Available Variables</p>

          <div className="flex flex-wrap gap-2">
            {variables.map((v) => (
              <span
                key={v}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs cursor-pointer hover:bg-blue-200"
                onClick={() => setContent((prev) => prev + " " + v)}
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 bg-gray-100 text-gray-600 rounded-md disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-5 py-2 bg-[#0A7EA4] text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Template"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTemplate;
