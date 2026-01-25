import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, ArrowUpRight } from "lucide-react";

const TransactionMonitor = ({ onClose, transactionId, onSuccess }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch transaction details on mount
  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetails();
    }
  }, [transactionId]);

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/admin/transactions/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setTransaction(data.transaction);
      } else {
        toast.error(data.message || "Failed to fetch transaction details");
      }
    } catch (err) {
      console.error("Fetch transaction error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionAction = async (action) => {
    if (!window.confirm(`Are you sure you want to ${action} this transaction?`))
      return;

    try {
      setActionLoading(action);
      const res = await fetch(
        `${API_URL}/admin/transactions/${transactionId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success(`Transaction ${action} successfully`);
        fetchTransactionDetails();
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.message || `Failed to ${action} transaction`);
      }
    } catch (err) {
      console.error(`${action} transaction error:`, err);
      toast.error("Error connecting to server");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed text-left inset-0 bg-gray-200 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">
            Loading transaction details...
          </p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="fixed text-left inset-0 bg-gray-200 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">Transaction not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed text-left inset-0 bg-gray-200 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold mb-6">
          Transaction Details - {transaction.id}
        </h2>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Transaction Information */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Transaction Information
            </h3>

            <p>
              <strong>Transaction ID:</strong> {transaction.id}
            </p>
            <p className="flex items-center gap-2 mt-1">
              <strong>Type:</strong>
              <span className="flex items-center gap-1 rounded-full text-blue-600">
                <ArrowUpRight
                  size={16}
                  className="bg-blue-200 w-8 h-5 rounded-full"
                />{" "}
                {transaction.type}
              </span>
            </p>

            <p className="mt-1">
              <strong>Status:</strong>
              <span
                className={`px-3 py-1 rounded-full ml-2 text-xs ${
                  transaction.status === "Completed"
                    ? "text-green-600 bg-green-100"
                    : transaction.status === "Pending"
                      ? "text-yellow-600 bg-yellow-100"
                      : transaction.status === "Failed"
                        ? "text-red-600 bg-red-100"
                        : "text-gray-600 bg-gray-100"
                }`}
              >
                {transaction.status}
              </span>
            </p>
          </div>

          {/* Amount Details */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Amount Details</h3>

            <p>
              <strong>Amount:</strong> $
              {transaction.amount?.toLocaleString() || "0"}
            </p>
            <p>
              <strong>Fee:</strong> ${transaction.fee?.toLocaleString() || "0"}
            </p>
            <p>
              <strong>Total:</strong> $
              {(transaction.amount + transaction.fee)?.toLocaleString() || "0"}
            </p>
          </div>

          {/* User Information */}
          <div>
            <h3 className="font-semibold text-[23px] text-gray-800 mb-3">
              User Information
            </h3>

            <p>
              <strong>User:</strong> {transaction.userName}
            </p>
            <p>
              <strong>User ID:</strong> {transaction.userId}
            </p>
            <p>
              <strong>Device:</strong> {transaction.device || "N/A"}
            </p>
          </div>

          {/* Recipient Information */}
          <div>
            <h3 className="font-semibold text-[23px] text-gray-800 mb-3">
              Recipient Information
            </h3>

            <p>
              <strong>Recipient:</strong> {transaction.recipientName || "N/A"}
            </p>
            <p>
              <strong>Account Number:</strong>{" "}
              {transaction.recipientAccount || "N/A"}
            </p>
            <p>
              <strong>Bank:</strong> {transaction.recipientBank || "N/A"}
            </p>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-3">
            Transaction Timeline
          </h3>

          <p>
            <strong>Transaction Initiated:</strong>{" "}
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Transaction Completed:</strong>{" "}
            {transaction.completedAt
              ? new Date(transaction.completedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col justify-center gap-4 mt-10 border-gray-200 border-t pt-6">
          <h6 className="text-left text-medium">Admin Actions</h6>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => handleTransactionAction("flag")}
              disabled={actionLoading !== null}
              className="bg-orange-500 w-[130px] text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {actionLoading === "flag" ? "Flagging..." : "Flag"}
            </button>
            <button
              onClick={() => handleTransactionAction("reverse")}
              disabled={actionLoading !== null}
              className="bg-red-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {actionLoading === "reverse"
                ? "Reversing..."
                : "Reverse Transaction"}
            </button>
            <button
              onClick={() => {
                toast.success("Receipt downloaded successfully");
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMonitor;
