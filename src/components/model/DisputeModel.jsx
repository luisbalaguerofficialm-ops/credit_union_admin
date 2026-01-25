import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, AlertTriangle } from "lucide-react";

const DisputeModel = ({ onClose, disputeId, onSuccess }) => {
  const [dispute, setDispute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch dispute details
  useEffect(() => {
    if (disputeId) {
      fetchDisputeDetails();
    }
  }, [disputeId]);

  const fetchDisputeDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/disputes/${disputeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDispute(data.dispute);
      } else {
        toast.error(data.message || "Failed to fetch dispute details");
      }
    } catch (err) {
      console.error("Fetch dispute error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleDisputeAction = async (action) => {
    if (!window.confirm(`Are you sure you want to ${action} this dispute?`))
      return;

    try {
      setProcessing(action);
      const res = await fetch(
        `${API_URL}/admin/disputes/${disputeId}/${action}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success(`Dispute ${action} successfully`);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || `Failed to ${action} dispute`);
      }
    } catch (err) {
      console.error(`${action} dispute error:`, err);
      toast.error("Error connecting to server");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white w-full max-w-lg sm:max-w-md rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">
            Loading dispute details...
          </p>
        </div>
      </div>
    );
  }

  if (!dispute) {
    return (
      <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white w-full max-w-lg sm:max-w-md rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">No dispute found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-lg sm:max-w-md rounded-xl shadow-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold mb-1">
          Dispute Details
        </h2>
        <p className="text-gray-500 mb-4 sm:mb-6 text-xs sm:text-sm">
          Review and resolve this transaction dispute
        </p>

        {/* Transaction Info */}
        <div className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
            Transaction Details
          </h3>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span>{dispute.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold">
                ₦{dispute.amount?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span>{new Date(dispute.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="text-orange-500">{dispute.status}</span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
            User Information
          </h3>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span>{dispute.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">User ID</span>
              <span>{dispute.userId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account Type</span>
              <span>{dispute.accountType || "Personal"}</span>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
            Actions
          </h3>

          <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex gap-2 items-start">
            <AlertTriangle size={16} className="text-orange-500 mt-0.5" />
            <p>
              Carefully verify all information before marking this dispute as
              resolved or rejected.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={() => handleDisputeAction("reject")}
              disabled={processing !== null}
              className="w-full sm:w-[190px] px-4 h-10 sm:h-12 rounded-lg border bg-gray-200 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
            >
              {processing === "reject" ? "Rejecting..." : "Reject Dispute"}
            </button>

            <button
              onClick={() => handleDisputeAction("approve")}
              disabled={processing !== null}
              className="w-full sm:w-[190px] px-4 h-10 sm:h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm disabled:opacity-50"
            >
              {processing === "approve" ? "Approving..." : "Approve Dispute"}
            </button>

            <button
              onClick={() => handleDisputeAction("reverse")}
              disabled={processing !== null}
              className="w-full sm:w-[120px] px-4 h-10 sm:h-12 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm disabled:opacity-50"
            >
              {processing === "reverse" ? "Reversing..." : "Initiate Reversal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeModel;
