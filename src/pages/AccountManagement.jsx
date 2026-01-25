import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Search,
  Calendar,
  Wallet,
  CheckCircle2,
  Snowflake,
  XCircle,
} from "lucide-react";
import MAccountModel from "../components/model/MAccountModel";

const AccountManagement = () => {
  const [query, setQuery] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const API_URL = "https://admin-credit-union.onrender.com";
  const token = localStorage.getItem("token");

  // ================= FETCH ACCOUNTS =================
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/accounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setAccounts(data.accounts || []);
      } catch (err) {
        console.error("Fetch accounts error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // ================= EXPORT HANDLER =================
  const handleExport = async (type) => {
    try {
      const res = await fetch(`${API_URL}/api/accounts/export?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = type === "csv" ? "accounts.csv" : "accounts.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to export file");
    }
  };

  const filteredAccounts = accounts.filter(
    (a) =>
      a.name?.toLowerCase().includes(query.toLowerCase()) ||
      a.userId?.toLowerCase().includes(query.toLowerCase()),
  );

  const StatCard = ({ icon: Icon, label, value, bg, iconBg }) => (
    <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <div className={`p-3 rounded-lg ${iconBg}`}>
        <Icon className={`w-5 h-5 ${bg}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-7 bg-gray-50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Account Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage user wallets and balances
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-100 bg-white rounded-lg text-sm">
            Today <Calendar className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleExport("csv")}
            className="px-3 py-2 border border-gray-100 bg-white rounded-lg text-sm"
          >
            Export CSV
          </button>

          <button
            onClick={() => handleExport("pdf")}
            className="px-3 py-2 border border-gray-100 bg-white rounded-lg text-sm"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Wallet}
          label="Total System Balance"
          value={`$${accounts.reduce(
            (sum, a) => sum + Number(a.totalBalance || 0),
            0,
          )}`}
          bg="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          icon={CheckCircle2}
          label="Active Wallets"
          value={accounts.filter((a) => a.status === "Active").length}
          bg="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          icon={Snowflake}
          label="Frozen Wallets"
          value={accounts.filter((a) => a.status === "Frozen").length}
          bg="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          icon={XCircle}
          label="Suspended Wallets"
          value={accounts.filter((a) => a.status === "Suspended").length}
          bg="text-red-600"
          iconBg="bg-red-50"
        />
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-xl mt-7 shadow-sm p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username or ID"
            className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white mt-7 rounded-lg p-4 shadow-sm overflow-x-auto">
        <h3 className="font-semibold mb-4">Wallet Overview</h3>

        {loading ? (
          <p>Loading accounts...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th>User</th>
                <th>Total</th>
                <th>Available</th>
                <th>Frozen</th>
                <th>Status</th>
                <th>Last Transaction</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAccounts.map((a) => (
                <tr key={a._id}>
                  <td>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.userId}</div>
                  </td>
                  <td>${a.totalBalance}</td>
                  <td>${a.availableBalance}</td>
                  <td className="text-red-500">${a.frozen}</td>
                  <td>{a.status}</td>
                  <td className="text-xs text-gray-500">
                    {a.lastTransaction || "—"}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedAccount(a);
                        setShowModal(true);
                      }}
                      className="text-blue-600 text-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedAccount && (
        <MAccountModel
          account={selectedAccount}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AccountManagement;
