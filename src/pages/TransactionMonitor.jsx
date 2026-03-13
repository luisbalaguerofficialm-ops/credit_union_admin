import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import TransactionDetailsModal from "../components/model/TransactionMonitor";
import { Search, Calendar, Download } from "lucide-react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = "http://localhost:5000/api";
const SOCKET_URL = "http://localhost:5000";

const TransactionMonitor = () => {
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState("All Types");
  const [transactionStatus, setTransactionStatus] = useState("All Status");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const token = localStorage.getItem("adminToken");

  // Fetch transactions from API
  const fetchTransactions = async () => {
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setTransactions(data.data || []);
        toast.success("Transactions loaded successfully");
      } else {
        setError("Failed to load transactions");
        toast.error("Failed to load transactions");
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to load transactions:", err);
      setError("Failed to load transactions. Please try again.");
      toast.error("Failed to load transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // Setup Socket.io for live updates
    if (token) {
      const socket = io(SOCKET_URL, {
        transports: ["websocket"],
        auth: { token },
      });

      // Listen for new transactions
      socket.on("transaction:update", (newTx) => {
        setTransactions((prev) => [newTx, ...prev]);
        toast.info("New transaction received");
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [token]);

  // CSV Export
  const exportCSV = () => {
    try {
      const csv = Papa.unparse(
        transactions.map((tx) => ({
          TransactionID: tx.id || "N/A",
          User: tx.user || "N/A",
          UserID: tx.userId || "N/A",
          Type: tx.type || "N/A",
          Amount: tx.amount || 0,
          Fee: tx.fee || 0,
          Status: tx.status || "N/A",
          Timestamp: tx.timestamp || new Date().toISOString(),
        })),
      );
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `transactions-${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV exported successfully");
    } catch (err) {
      console.error("Failed to export CSV:", err);
      toast.error("Failed to export CSV");
    }
  };

  // PDF Export
  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Transactions Report", 14, 15);

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22);

      const tableData = transactions.map((tx) => [
        tx.id || "N/A",
        tx.user || "N/A",
        tx.userId || "N/A",
        tx.type || "N/A",
        `$${(tx.amount || 0).toLocaleString()}`,
        `$${(tx.fee || 0).toLocaleString()}`,
        tx.status || "N/A",
        tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : "N/A",
      ]);

      autoTable(doc, {
        head: [
          ["ID", "User", "UserID", "Type", "Amount", "Fee", "Status", "Date"],
        ],
        body: tableData,
        startY: 30,
        margin: { left: 14, right: 14 },
      });

      doc.save(`transactions-${new Date().getTime()}.pdf`);
      toast.success("PDF exported successfully");
    } catch (err) {
      console.error("Failed to export PDF:", err);
      toast.error("Failed to export PDF");
    }
  };

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.user?.toLowerCase().includes(search.toLowerCase()) ||
      tx.id?.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      transactionType === "All Types" || tx.type === transactionType;
    const matchesStatus =
      transactionStatus === "All Status" || tx.status === transactionStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Stats calculations
  const totalCount = transactions.length;
  const completedCount = transactions.filter(
    (tx) => tx.status === "Completed",
  ).length;
  const pendingCount = transactions.filter(
    (tx) => tx.status === "Pending",
  ).length;
  const failedCount = transactions.filter(
    (tx) => tx.status === "Failed",
  ).length;

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full min-h-screen text-left bg-gray-50 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Transaction Monitor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage all platform transactions in real-time
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            disabled={loading || error}
            className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Calendar size={16} /> Today
          </button>

          <button
            onClick={exportCSV}
            disabled={loading || error || transactions.length === 0}
            className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>

          <button
            onClick={exportPDF}
            disabled={loading || error || transactions.length === 0}
            className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Error Loading Transactions
            </h3>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <button
              onClick={fetchTransactions}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* LIVE STATS CARDS */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 text-sm font-medium">
              Total Transactions
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              {transactions.length}
            </h2>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 text-sm font-medium">Completed</span>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {transactions.filter((tx) => tx.status === "Completed").length}
            </h2>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 text-sm font-medium">Pending</span>
            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {transactions.filter((tx) => tx.status === "Pending").length}
            </h2>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 text-sm font-medium">Failed</span>
            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {transactions.filter((tx) => tx.status === "Failed").length}
            </h2>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center w-full md:w-[350px] gap-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by username, transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-full md:w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option>All Types</option>
          <option>Transfer</option>
          <option>Deposit</option>
          <option>Withdrawal</option>
        </select>

        <select
          value={transactionStatus}
          onChange={(e) => setTransactionStatus(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-full md:w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Flagged</option>
          <option>Failed</option>
        </select>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Transactions
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto" />
              <p className="text-gray-600 text-sm">Loading transactions...</p>
            </div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 font-medium">No transactions found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-700 border-b border-gray-200 text-left font-semibold">
                <th className="py-4 px-2">TransactionID</th>
                <th className="py-4 px-2">User</th>
                <th className="py-4 px-2">Type</th>
                <th className="py-4 px-2">Amount</th>
                <th className="py-4 px-2">Fee</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2">Timestamp</th>
                <th className="py-4 px-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id + tx.timestamp}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-2 font-medium text-gray-900">
                    {tx.id || "N/A"}
                  </td>
                  <td className="py-4 px-2">
                    <p className="font-medium text-gray-900">
                      {tx.user || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tx.userId || "N/A"}
                    </p>
                  </td>
                  <td className="py-4 px-2 flex items-center gap-2">
                    {tx.type === "Transfer" ? (
                      <ArrowUpCircle size={18} className="text-blue-500" />
                    ) : (
                      <ArrowDownCircle size={18} className="text-green-500" />
                    )}{" "}
                    <span className="font-medium">{tx.type || "N/A"}</span>
                  </td>
                  <td className="py-4 px-2 font-medium text-gray-900">
                    ${(tx.amount || 0).toLocaleString()}
                  </td>
                  <td className="py-4 px-2 text-gray-700">
                    ${(tx.fee || 0).toLocaleString()}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : tx.status === "Flagged"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600">
                    {tx.timestamp
                      ? new Date(tx.timestamp).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => {
                        setSelectedTransaction(tx);
                        setOpenModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {openModal && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default TransactionMonitor;
