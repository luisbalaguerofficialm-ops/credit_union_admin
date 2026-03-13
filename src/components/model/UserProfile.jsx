import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, User, Wallet } from "lucide-react";

const UserProfile = ({ userId, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://admin-admin-credit.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch user profile and wallet data on mount
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
        setWalletData(data.wallet);
        setTransactions(data.recentTransactions || []);
      } else {
        toast.error(data.message || "Failed to fetch user profile");
      }
    } catch (err) {
      console.error("Fetch user data error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ PROFILE TAB ------------------
  const ProfileTab = () => (
    <div className="mt-10">
      <div className="flex items-start text-left justify-between gap-20">
        {/* Personal Information */}
        <div>
          <h6 className="font-semibold text-[18px]">Personal Information</h6>
          <div className="flex flex-col gap-2 mt-2">
            <label>Full Name</label>
            <p>{userData?.name || "N/A"}</p>

            <label>User ID</label>
            <p>{userData?.id || "N/A"}</p>

            <label>Email</label>
            <p>{userData?.email || "N/A"}</p>

            <label>Phone</label>
            <p>{userData?.phone || "N/A"}</p>
          </div>
        </div>

        {/* Account Details */}
        <div>
          <h6 className="font-semibold text-[18px]">Account Details</h6>
          <div className="flex flex-col gap-2 mt-2">
            <label>Date Joined</label>
            <p>
              {userData?.createdAt
                ? new Date(userData.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

            <label>Last Active</label>
            <p>
              {userData?.lastActive
                ? new Date(userData.lastActive).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Compliance & Security */}
        <div>
          <h6 className="font-semibold text-[18px]">Compliance & Security</h6>
          <div className="flex flex-col gap-3 mt-2 items-start">
            <label>Status</label>
            <div
              className={`rounded-full px-4 py-1 ${
                userData?.status === "Active"
                  ? "text-[#01A986] bg-[#E3FDF7]"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {userData?.status || "N/A"}
            </div>

            <label>KYC Status</label>
            <div
              className={`rounded-full px-4 py-1 ${
                userData?.kycStatus === "Approved"
                  ? "text-[#01A986] bg-[#E3FDF7]"
                  : userData?.kycStatus === "Pending"
                    ? "text-yellow-600 bg-yellow-100"
                    : "text-red-600 bg-red-100"
              }`}
            >
              {userData?.kycStatus || "N/A"}
            </div>

            <label>Risk Level</label>
            <div
              className={`rounded-full px-4 py-1 ${
                userData?.riskLevel === "Low"
                  ? "text-[#01A986] bg-[#E3FDF7]"
                  : userData?.riskLevel === "Medium"
                    ? "text-yellow-600 bg-yellow-100"
                    : "text-red-600 bg-red-100"
              }`}
            >
              {userData?.riskLevel || "N/A"}
            </div>

            <label>Flagged</label>
            <div
              className={`rounded-full px-4 py-1 ${
                userData?.isFlagged
                  ? "text-red-600 bg-red-100"
                  : "text-[#707070] bg-[#F4F4F4]"
              }`}
            >
              {userData?.isFlagged ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ------------------ WALLET TAB ------------------
  const WalletTab = () => (
    <div className="mt-10 text-left">
      <h3 className="font-semibold mb-5">Wallet Overview</h3>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-blue-50 p-5 rounded-lg">
          <p className="text-gray-500 text-sm">Total Balance</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ${walletData?.totalBalance?.toLocaleString() || "0"}
          </h2>
        </div>

        <div className="bg-green-50 p-5 rounded-lg">
          <p className="text-gray-500 text-sm">Available Balance</p>
          <h2 className="text-2xl font-bold text-green-600">
            ${walletData?.availableBalance?.toLocaleString() || "0"}
          </h2>
        </div>

        <div className="bg-red-50 p-5 rounded-lg">
          <p className="text-gray-500 text-sm">Frozen Balance</p>
          <h2 className="text-2xl font-bold text-red-600">
            ${walletData?.frozenBalance?.toLocaleString() || "0"}
          </h2>
        </div>
      </div>

      <div className="flex mt-7 justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-600 mt-5">No recent transactions</p>
      ) : (
        transactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-white rounded-lg p-4 shadow mb-3 flex justify-between"
          >
            <div>
              <p className="font-medium">{txn.type}</p>
              <p className="text-gray-500 text-sm">
                {txn.id} • {new Date(txn.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p
              className={`font-medium ${
                txn.type === "Deposit" || txn.type === "Transfer In"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {txn.type === "Deposit" || txn.type === "Transfer In" ? "+" : "-"}
              ${Math.abs(txn.amount).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-200 bg-opacity-50 w-full fixed inset-0 flex justify-center items-center px-4 z-50">
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-6xl shadow">
          <p className="text-center text-blue-600">Loading please wait...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-gray-200 bg-opacity-50 w-full fixed inset-0 flex justify-center items-center px-4 z-50">
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-6xl shadow">
          <p className="text-center text-gray-600">User not found</p>
        </div>
      </div>
    );
  }

  // ------------------ MAIN MODAL ------------------
  return (
    <div className="bg-gray-200 bg-opacity-50 w-full fixed inset-0 flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-6xl shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="font-semibold text-lg">
              User Profile - {userData?.name}
            </h4>
            <span className="text-gray-500">User ID: {userData?.id}</span>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex text-[#605E5E] text-3xl justify-center font-semibold shadow h-12 items-center gap-8 border-b pb-2 border-gray-200">
          {[
            ["profile", <User size={18} />, "Profile"],
            ["wallet", <Wallet size={18} />, "Wallet"],
          ].map(([key, icon, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-2 hover:text-[#006A91] ${
                activeTab === key ? "underline text-[#006A91]" : ""
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Active Tab */}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "wallet" && <WalletTab />}
      </div>
    </div>
  );
};

export default UserProfile;
