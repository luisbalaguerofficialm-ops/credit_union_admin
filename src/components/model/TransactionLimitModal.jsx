import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const TransactionLimitModal = ({ onClose, userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: "",
    daily: "",
    monthly: "",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState(null);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch current limits on mount
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/accounts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.account);
        // Pre-fill with existing limits if available
        if (data.account.dailyLimit || data.account.monthlyLimit) {
          setFormData({
            type: "transfer",
            daily: data.account.dailyLimit?.toString() || "",
            monthly: data.account.monthlyLimit?.toString() || "",
            reason: "",
          });
        }
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Validation
    if (!formData.type) {
      toast.error("Please select transaction type");
      return;
    }
    if (!formData.daily || parseInt(formData.daily) <= 0) {
      toast.error("Please enter a valid daily limit");
      return;
    }
    if (!formData.monthly || parseInt(formData.monthly) <= 0) {
      toast.error("Please enter a valid monthly limit");
      return;
    }
    if (!formData.reason) {
      toast.error("Please select a reason");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(
        `${API_URL}/admin/accounts/${userId}/transaction-limits`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: formData.type,
            dailyLimit: parseInt(formData.daily),
            monthlyLimit: parseInt(formData.monthly),
            reason: formData.reason,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Transaction limits updated successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to save transaction limits");
      }
    } catch (err) {
      console.error("Save transaction limits error:", err);
      toast.error("Error connecting to server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[17px] font-medium">
            Set Transaction Limits - {userData?.name || "User"}
          </h2>
          <button onClick={onClose} disabled={saving}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* TRANSACTION TYPE */}
        <div className="mb-4">
          <label className="text-[13px] font-medium block mb-1">
            Transaction Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={saving}
            className="w-full border rounded-md px-3 py-2 text-[13px] disabled:opacity-50"
          >
            <option value="">Select transaction type</option>
            <option value="transfer">Transfer</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="deposit">Deposit</option>
          </select>
        </div>

        {/* DAILY LIMIT */}
        <div className="mb-4">
          <label className="text-[13px] font-medium block mb-1">
            Daily Limit ($)
          </label>
          <input
            type="number"
            name="daily"
            placeholder="Enter daily limit"
            value={formData.daily}
            onChange={handleChange}
            disabled={saving}
            min="0"
            step="0.01"
            className="w-full border rounded-md px-3 py-2 text-[13px] disabled:opacity-50"
          />
        </div>

        {/* MONTHLY LIMIT */}
        <div className="mb-4">
          <label className="text-[13px] font-medium block mb-1">
            Monthly Limit ($)
          </label>
          <input
            type="number"
            name="monthly"
            placeholder="Enter monthly limit"
            value={formData.monthly}
            onChange={handleChange}
            disabled={saving}
            min="0"
            step="0.01"
            className="w-full border rounded-md px-3 py-2 text-[13px] disabled:opacity-50"
          />
        </div>

        {/* REASON */}
        <div className="mb-6">
          <label className="text-[13px] font-medium block mb-1">Reason</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={saving}
            className="w-full border rounded-md px-3 py-2 text-[13px] disabled:opacity-50"
          >
            <option value="">Select reason</option>
            <option value="fraud_prevention">Fraud Prevention</option>
            <option value="policy_requirement">Policy Requirement</option>
            <option value="manual_adjustment">Manual Adjustments</option>
            <option value="risk_management">Risk Management</option>
          </select>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="w-[45%] bg-gray-200 text-gray-700 py-2 rounded-md text-[13px] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-[45%] bg-blue-700 text-white py-2 rounded-md text-[13px] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionLimitModal;
