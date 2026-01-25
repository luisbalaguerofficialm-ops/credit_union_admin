import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import BalanceAdjustmentModal from "./BalanceAdjustmentModal";
import TransactionLimitModal from "./TransactionLimitModal";

const MAccountModel = ({ onClose, userId, onSuccess }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch account details
  useEffect(() => {
    if (userId) {
      fetchAccountDetails();
    }
  }, [userId]);

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/accounts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAccount(data.account);
      } else {
        toast.error(data.message || "Failed to fetch account details");
      }
    } catch (err) {
      console.error("Fetch account error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleAccountAction = async (action) => {
    if (!window.confirm(`Are you sure you want to ${action} this account?`))
      return;

    try {
      setActionLoading(action);
      const res = await fetch(`${API_URL}/admin/accounts/${userId}/${action}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Account ${action} successfully`);
        fetchAccountDetails();
      } else {
        toast.error(data.message || `Failed to ${action} account`);
      }
    } catch (err) {
      console.error(`${action} account error:`, err);
      toast.error("Error connecting to server");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex text-left items-center justify-center z-50">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">
            Loading account details...
          </p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="fixed inset-0 bg-black/40 flex text-left items-center justify-center z-50">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">No account found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Account Management Modal */}
      <div className="fixed inset-0 bg-black/40 flex text-left items-center justify-center z-50">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="text-[15px] font-medium">
              Account Management - {account.name || "User"}
            </h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div>
              <h3 className="text-[13px] font-medium mb-3">
                Account Information
              </h3>

              <div className="space-y-2 text-[13px]">
                <p>
                  <span className="font-medium">Full Name</span>
                  <br />
                  {account.name}
                </p>
                <p>
                  <span className="font-medium">User ID</span>
                  <br />
                  {account.userId}
                </p>
                <p>
                  <span className="font-medium">Email</span>
                  <br />
                  {account.email}
                </p>
                <p>
                  <span className="font-medium">Last Transaction</span>
                  <br />
                  {account.lastTransaction
                    ? new Date(account.lastTransaction).toLocaleString()
                    : "No transactions"}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <h3 className="text-[13px] font-medium mb-3">
                Balance Information
              </h3>

              <div className="space-y-2 text-[13px]">
                <p>
                  <span className="font-medium">Total Balance</span>
                  <br />
                  <span className="font-semibold">
                    ${account.totalBalance?.toLocaleString() || "0"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Available Balance</span>
                  <br />
                  <span className="text-green-600 font-medium">
                    ${account.availableBalance?.toLocaleString() || "0"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Frozen Amount</span>
                  <br />
                  <span className="text-red-500 font-medium">
                    ${account.frozenAmount?.toLocaleString() || "0"}
                  </span>
                </p>

                <p className="font-medium">Wallet Status</p>
                <span
                  className={`inline-block px-3 py-[3px] text-[11px] rounded-full ${
                    account.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {account.status}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Limits */}
          <div className="mt-10">
            <h3 className="text-[13px] font-medium mb-3">Transaction Limits</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[13px]">
              <p>
                <span className="font-medium">Daily Limit</span>
                <br />${account.dailyLimit?.toLocaleString() || "0"}
              </p>
              <p>
                <span className="font-medium">Monthly Limit</span>
                <br />${account.monthlyLimit?.toLocaleString() || "0"}
              </p>
            </div>
          </div>

          {/* Account Controls */}
          <div className="mt-10">
            <h3 className="text-[13px] font-medium mb-3">Account Controls</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 flex justify-between items-center text-[13px]">
                <span>Transfers</span>
                <span
                  className={`font-medium ${
                    account.transferEnabled ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {account.transferEnabled ? "Unlocked" : "Locked"}
                </span>
              </div>

              <div className="border rounded-lg p-4 flex justify-between items-center text-[13px]">
                <span>Withdrawals</span>
                <span
                  className={`font-medium ${
                    account.withdrawalEnabled
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {account.withdrawalEnabled ? "Unlocked" : "Locked"}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="mt-12">
            <h3 className="text-[13px] font-medium mb-3">Admin Actions</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowAdjustment(true)}
                disabled={actionLoading !== null}
                className="bg-blue-500 text-white hover:underline hover:to-blue-700 py-2 rounded-md text-[13px] disabled:opacity-50"
              >
                Adjust Balance
              </button>

              <button
                onClick={() => handleAccountAction("freeze")}
                disabled={actionLoading !== null}
                className="bg-red-600 text-white py-2 rounded-md text-[13px] disabled:opacity-50"
              >
                {actionLoading === "freeze" ? "Processing..." : "Freeze Wallet"}
              </button>

              <button
                onClick={() => handleAccountAction("lockTransfer")}
                disabled={actionLoading !== null}
                className="bg-orange-600 text-white py-2 rounded-md text-[13px] disabled:opacity-50"
              >
                {actionLoading === "lockTransfer"
                  ? "Processing..."
                  : "Lock Transfer"}
              </button>

              <button
                onClick={() => handleAccountAction("lockWithdrawal")}
                disabled={actionLoading !== null}
                className="bg-yellow-600 text-white py-2 rounded-md text-[13px] disabled:opacity-50"
              >
                {actionLoading === "lockWithdrawal"
                  ? "Processing..."
                  : "Lock Withdrawals"}
              </button>

              {/* SET TRANSACTION LIMIT BUTTON */}
              <button
                onClick={() => setShowLimitModal(true)}
                disabled={actionLoading !== null}
                className="bg-purple-500 text-white hover:underline hover:bg-purple-700 py-2 rounded-md text-[13px] disabled:opacity-50"
              >
                Set Transaction Limit
              </button>

              <button className="bg-gray-300 text-gray-700 py-2 rounded-md text-[13px]">
                View Audit History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BALANCE ADJUSTMENT MODAL */}
      {showAdjustment && (
        <BalanceAdjustmentModal
          onClose={() => setShowAdjustment(false)}
          userId={userId}
          userName={account?.name}
          onSuccess={fetchAccountDetails}
        />
      )}

      {/* TRANSACTION LIMIT MODAL */}
      {showLimitModal && (
        <TransactionLimitModal
          onClose={() => setShowLimitModal(false)}
          userId={userId}
          onSuccess={fetchAccountDetails}
        />
      )}
    </>
  );
};

export default MAccountModel;
