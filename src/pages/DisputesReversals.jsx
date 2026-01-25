import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  ChevronDown,
  FileDown,
  FileText,
  Loader2,
} from "lucide-react";
import DisputeModel from "../components/model/DisputeModel";
import Papa from "papaparse";
import jsPDF from "jspdf";

const API_URL = "https://admin-credit-union.onrender.com/api";

const DisputesReversals = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const token = localStorage.getItem("adminToken");

  // Fetch disputes from API
  const fetchDisputes = async () => {
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/disputes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setDisputes(data.disputes || []);
      } else {
        throw new Error(data.message || "Failed to fetch disputes");
      }
    } catch (err) {
      console.error("Failed to fetch disputes:", err);
      toast.error(err.message || "Error loading disputes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, [token]);

  // CSV Export
  const exportCSV = () => {
    if (filteredDisputes.length === 0) {
      toast.warning("No disputes to export");
      return;
    }

    setExporting(true);
    try {
      const csv = Papa.unparse(
        filteredDisputes.map((d) => ({
          "Dispute ID": d._id || d.id,
          User: d.user?.name || d.user || "N/A",
          "User ID": d.userId || "N/A",
          Type: d.type || "N/A",
          Amount: `$${d.amount?.toLocaleString() || "0"}`,
          Status: d.status || "N/A",
          Priority: d.priority || "N/A",
          Created: d.createdAt
            ? new Date(d.createdAt).toLocaleDateString()
            : "N/A",
        })),
      );
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `disputes-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV exported successfully");
    } catch (err) {
      toast.error("Failed to export CSV");
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  // PDF Export
  const exportPDF = () => {
    if (filteredDisputes.length === 0) {
      toast.warning("No disputes to export");
      return;
    }

    setExporting(true);
    try {
      const doc = new jsPDF();
      doc.text("Disputes & Reversals Report", 10, 10);
      doc.setFontSize(10);

      let y = 20;
      filteredDisputes.forEach((d) => {
        const text = `${d._id || d.id} | ${d.user?.name || d.user} | $${d.amount?.toLocaleString() || "0"} | ${d.status} | ${d.priority}`;
        doc.text(text, 10, y);
        y += 8;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });

      doc.save(`disputes-${Date.now()}.pdf`);
      toast.success("PDF exported successfully");
    } catch (err) {
      toast.error("Failed to export PDF");
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const filteredDisputes = disputes.filter((d) => {
    const matchesSearch =
      (d.user?.name || d.user || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (d._id || d.id || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
    const matchesType = typeFilter === "All" || d.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Summary counts
  const total = disputes.length;
  const pending = disputes.filter((d) => d.status === "Pending").length;
  const resolved = disputes.filter((d) => d.status === "Resolved").length;
  const urgent = disputes.filter((d) => d.priority === "High").length;

  return (
    <div className="p-4 sm:p-6 w-full mt-12 bg-gray-50 text-left min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Disputes & Reversals
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Handle transaction disputes and reversals
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            disabled={loading || exporting}
            onClick={exportCSV}
            className="flex items-center gap-1 sm:gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white text-xs sm:text-sm hover:bg-gray-50 transition disabled:opacity-50"
          >
            {exporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FileText size={16} />
            )}
            Export CSV
          </button>

          <button
            disabled={loading || exporting}
            onClick={exportPDF}
            className="flex items-center gap-1 sm:gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white text-xs sm:text-sm hover:bg-gray-50 transition disabled:opacity-50"
          >
            {exporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FileDown size={16} />
            )}
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-xl flex items-center justify-between border-l-4 border-blue-500">
          <div>
            <p className="text-gray-500 text-sm">Total Disputes</p>
            <h3 className="text-lg sm:text-xl font-semibold mt-1">{total}</h3>
          </div>
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
        </div>

        <div className="bg-white shadow p-4 rounded-xl flex items-center justify-between border-l-4 border-yellow-500">
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h3 className="text-lg sm:text-xl font-semibold mt-1">{pending}</h3>
          </div>
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
        </div>

        <div className="bg-white shadow p-4 rounded-xl flex items-center justify-between border-l-4 border-green-500">
          <div>
            <p className="text-gray-500 text-sm">Resolved</p>
            <h3 className="text-lg sm:text-xl font-semibold mt-1">
              {resolved}
            </h3>
          </div>
          <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
        </div>

        <div className="bg-white shadow p-4 rounded-xl flex items-center justify-between border-l-4 border-red-500">
          <div>
            <p className="text-gray-500 text-sm">Urgent</p>
            <h3 className="text-lg sm:text-xl font-semibold mt-1">{urgent}</h3>
          </div>
          <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow mb-6 flex flex-wrap gap-3 items-center justify-center">
        <div className="flex items-center w-full sm:w-[300px] md:w-[450px] gap-2 border border-gray-200 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by username, dispute ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
            className="w-full outline-none text-sm sm:text-base disabled:bg-gray-100"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          disabled={loading}
          className="border border-gray-200 px-3 py-2 rounded-lg text-sm sm:text-base disabled:bg-gray-100"
        >
          <option value="All">All Types</option>
          <option value="Transfer">Transfer</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          disabled={loading}
          className="border border-gray-200 px-3 py-2 rounded-lg text-sm sm:text-base disabled:bg-gray-100"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
          <p className="text-gray-600 font-medium">Loading disputes...</p>
        </div>
      ) : filteredDisputes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow">
          <AlertTriangle className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">
            {search || typeFilter !== "All" || statusFilter !== "All"
              ? "No disputes match your filters"
              : "No disputes found"}
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Active Disputes ({filteredDisputes.length})
          </h3>
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-gray-100 text-gray-600 border-b">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Dispute ID</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">User</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Type</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Amount</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Priority</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Created</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisputes.map((d) => (
                  <tr
                    key={d._id || d.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-mono text-xs sm:text-sm">
                      {d._id || d.id}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="font-medium">
                        {d.user?.name || d.user || "N/A"}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">
                        {d.userId || "N/A"}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      {d.type || "N/A"}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">
                      ${d.amount?.toLocaleString() || "0"}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          d.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : d.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {d.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          d.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : d.priority === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        {d.priority || "N/A"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {d.createdAt
                        ? new Date(d.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <button
                        onClick={() => {
                          setSelectedDispute(d);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm font-medium transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {openModal && (
        <DisputeModel
          dispute={selectedDispute}
          onClose={() => {
            setOpenModal(false);
            setSelectedDispute(null);
          }}
          onRefresh={fetchDisputes}
        />
      )}
    </div>
  );
};

export default DisputesReversals;
