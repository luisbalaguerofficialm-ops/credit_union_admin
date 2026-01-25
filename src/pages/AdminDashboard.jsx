import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Users,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  AlertCircle,
  Flag,
  Headphones,
  FileWarning,
  ChevronDown,
  ShieldPlus,
  UserCheck,
  Loader2,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const API_URL = "https://admin-credit-union.onrender.com/api";

const Stat = ({ icon: Icon, label, value, badge, color }) => (
  <div className="bg-white border rounded-xl p-4 flex items-start justify-between shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value || "0"}</p>
      </div>
    </div>
    {badge && (
      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    stats: {},
    recentActivities: [],
    recentTransactions: [],
  });
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const headers = { Authorization: `Bearer ${token}` };

        const response = await fetch(`${API_URL}/admin/dashboard-summary`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setData({
            stats: result.stats || {},
            recentActivities: result.activities || [],
            recentTransactions: result.transactions || [],
          });
          toast.success("Dashboard data loaded successfully");
        } else {
          throw new Error(result.message || "Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError(error.message);
        toast.error(error.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Fetching real-time data...</p>
        <p className="text-gray-400 text-sm mt-1">
          This may take a few seconds
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-700 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-left bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Live overview of the credit union system
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
            Live
          </span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          icon={Users}
          label="Total Users"
          value={data.stats.totalUsers?.toLocaleString()}
          color="bg-blue-600"
          className="border border-gray-200"
        />
        <Stat
          icon={Wallet}
          label="Total System Balance"
          value={`$${data.stats.totalBalance?.toLocaleString()}`}
          color="bg-green-600"
          className="border border-gray-200"
        />
        <Stat
          icon={ArrowLeftRight}
          label="Total Transfers"
          value={data.stats.totalTransfers?.toLocaleString()}
          color="bg-purple-600"
          className="border border-gray-200"
        />
        <Stat
          icon={PiggyBank}
          label="Total Deposits"
          value={data.stats.totalDeposits?.toLocaleString()}
          color="bg-orange-500"
          className="border border-gray-200"
        />
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          icon={AlertCircle}
          label="Pending KYC"
          value={data.stats.pendingKyc}
          color="bg-orange-500"
        />
        <Stat
          icon={Flag}
          label="Flagged Items"
          value={data.stats.flaggedCount}
          color="bg-red-600"
        />
        <Stat
          icon={Headphones}
          label="Support Tickets"
          value={data.stats.openTickets}
          color="bg-blue-500"
        />
        <Stat
          icon={FileWarning}
          label="Pending Disputes"
          value={data.stats.pendingDisputes}
          color="bg-orange-400"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 size={18} /> Volume Analytics
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Activity metrics across the network
              </p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
              Real-time
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-blue-600">
                  Total Transfers
                </p>
                <TrendingUp size={16} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {data.stats.totalTransfers?.toLocaleString() || "0"}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Volume: ${data.stats.transferVolume?.toLocaleString() || "0"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-green-600">
                  Total Deposits
                </p>
                <TrendingUp size={16} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-900">
                {data.stats.totalDeposits?.toLocaleString() || "0"}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Volume: ${data.stats.depositVolume?.toLocaleString() || "0"}
              </p>
            </div>
          </div>

          <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm font-medium">
                Chart visualization
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Connected to Render API for live metrics
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-gray-700">Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></span>
              <span className="text-gray-700">Deposit</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activities</h3>
          </div>
          <ul className="space-y-4 text-sm">
            {data.recentActivities.length > 0 ? (
              data.recentActivities.map((act, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-gray-200 pb-2 last:border-0"
                >
                  <span className="text-gray-700">{act.message}</span>
                  <span className="text-gray-400 text-xs">{act.timeAgo}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400 italic">No recent activity</p>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-500 bg-gray-50">
                <tr className="text-left">
                  <th className="py-2 px-2">Ref ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.recentTransactions &&
                data.recentTransactions.length > 0 ? (
                  data.recentTransactions.map((txn, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-2 font-mono text-xs text-gray-600">
                        {txn.reference || "N/A"}
                      </td>
                      <td className="capitalize text-gray-700 font-medium">
                        {txn.type || "Unknown"}
                      </td>
                      <td className="font-semibold text-gray-900">
                        ${txn.amount?.toLocaleString() || "0"}
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            txn.status === "completed"
                              ? "text-green-700 bg-green-100"
                              : txn.status === "pending"
                                ? "text-yellow-700 bg-yellow-100"
                                : "text-red-700 bg-red-100"
                          }`}
                        >
                          {txn.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 text-center text-gray-500 text-sm"
                    >
                      No recent transactions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3 text-sm font-medium">
            <button
              onClick={() =>
                toast.info("Create Admin Role feature coming soon")
              }
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              <ShieldPlus className="w-4 h-4" /> Create Admin Role
            </button>
            <button
              onClick={() => toast.info("Redirecting to KYC management...")}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-green-600" /> Approve Pending
              KYC
            </button>
            <button
              onClick={() =>
                toast.info("Redirecting to transaction monitor...")
              }
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Flag className="w-4 h-4 text-red-600" /> Flagged Transactions
            </button>
            <button
              onClick={() => toast.info("Redirecting to support tickets...")}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              Support Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
