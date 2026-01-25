import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, ChevronDown } from "lucide-react";

const BalanceAdjustmentModal = ({ onClose, userId, userName, onSuccess }) => {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch available reasons
  useEffect(() => {
    fetchReasons();
  }, []);

  const fetchReasons = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/adjustment-reasons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setReasons(data.reasons || []);
      }
    } catch (err) {
      console.error("Fetch reasons error:", err);
    }
  };

  const handleConfirm = async () => {
    if (!amount || !reason) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/balance-adjustment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          type,
          amount: parseFloat(amount),
          reason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Balance adjusted successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to adjust balance");
      }
    } catch (err) {
      console.error("Balance adjustment error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-[15px] font-medium">
            Balance Adjustment - {userName || "User"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Adjustment Type */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Adjustment Type</p>

          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={type === "credit"}
                onChange={() => setType("credit")}
              />
              <span className="text-green-600">Credit (Add)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={type === "debit"}
                onChange={() => setType("debit")}
              />
              <span className="text-red-600">Debit (Subtract)</span>
            </label>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Amount</p>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Reason */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-2">Reason</p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowReasonDropdown(!showReasonDropdown)}
              className="border rounded-md px-3 py-2 flex justify-between items-center text-sm w-full bg-white"
            >
              <span>{reason || "Select reason"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showReasonDropdown && (
              <div className="absolute top-full left-0 right-0 border rounded-md bg-white shadow-lg z-10 mt-1">
                {reasons.length > 0 ? (
                  reasons.map((r) => (
                    <button
                      key={r._id}
                      type="button"
                      onClick={() => {
                        setReason(r.name);
                        setShowReasonDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                    >
                      {r.name}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No reasons available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-200 text-gray-600 px-5 py-2 rounded-md text-sm disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-blue-900 text-white px-5 py-2 rounded-md text-sm disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Adjustment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceAdjustmentModal;
