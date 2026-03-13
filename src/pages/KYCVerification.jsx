import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import {
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileDown,
  FileText,
  Loader2,
} from "lucide-react";
import KycReview from "../components/KycReview";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API_URL = "https://admin-admin-credit.onrender.com/api";
const SOCKET_URL = "https://admin-admin-credit.onrender.com";

let socket = null;

const SummaryCard = ({ title, value, icon, bg }) => (
  <div className="flex items-center justify-between rounded-xl border bg-white p-4">
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full ${bg}`}
    >
      {icon}
    </div>
  </div>
);

const KYCVerification = () => {
  const [kycData, setKycData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [showKycReview, setShowKycReview] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const token = localStorage.getItem("adminToken");

  // Initialize Socket.IO
  useEffect(() => {
    if (!token) return;

    if (!socket) {
      socket = io(SOCKET_URL, {
        auth: { token },
        reconnection: true,
      });

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("kyc-updated", (updatedKyc) => {
        setKycData((prev) =>
          prev.map((k) => (k._id === updatedKyc._id ? updatedKyc : k)),
        );
        toast.info("KYC data updated");
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      if (socket) {
        socket.off("kyc-updated");
      }
    };
  }, [token]);

  // Fetch KYC requests
  const fetchKycRequests = async () => {
    if (!token) {
      toast.error("Authentication token not found");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/kyc`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setKycData(Array.isArray(data.kycRequests) ? data.kycRequests : []);
        toast.success("KYC data loaded successfully");
      } else {
        throw new Error(data.message || "Failed to fetch KYC requests");
      }
    } catch (err) {
      console.error("Error fetching KYC:", err);
      toast.error(err.message || "Failed to load KYC requests");
      setKycData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycRequests();
  }, [token]);

  const handleReviewClick = (item) => {
    setSelectedUser(item);
    setShowKycReview(true);
  };

  const handleCloseModal = () => {
    setShowKycReview(false);
    setSelectedUser(null);
    // Refresh data after modal closes
    fetchKycRequests();
  };

  // CSV Export
  const exportCSV = () => {
    if (filteredData.length === 0) {
      toast.warning("No KYC records to export");
      return;
    }

    setExporting(true);
    try {
      const csv = Papa.unparse(
        filteredData.map((k) => ({
          Name: k.user?.fullName || "N/A",
          "User ID": k.user?.userId || "N/A",
          "ID Type": k.idType || "N/A",
          Status: k.status || "N/A",
          "Risk Level": k.risk || "N/A",
          "AML Flags": k.aml || "None",
          "Submission Date": k.createdAt
            ? new Date(k.createdAt).toLocaleDateString()
            : "N/A",
        })),
      );
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `kyc-report-${Date.now()}.csv`);
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
    if (filteredData.length === 0) {
      toast.warning("No KYC records to export");
      return;
    }

    setExporting(true);
    try {
      const doc = new jsPDF();
      doc.text("KYC Verification Report", 14, 15);
      doc.autoTable({
        startY: 25,
        head: [
          ["Name", "User ID", "Status", "Risk Level", "AML Flags", "Date"],
        ],
        body: filteredData.map((k) => [
          k.user?.fullName || "N/A",
          k.user?.userId || "N/A",
          k.status || "N/A",
          k.risk || "N/A",
          k.aml || "None",
          k.createdAt ? new Date(k.createdAt).toLocaleDateString() : "N/A",
        ]),
      });
      doc.save(`kyc-report-${Date.now()}.pdf`);
      toast.success("PDF exported successfully");
    } catch (err) {
      toast.error("Failed to export PDF");
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  // Filter KYC data
  const filteredData = kycData.filter(
    (k) =>
      (!statusFilter || k.status === statusFilter) &&
      (!riskFilter || k.risk === riskFilter),
  );

  return (
    <>
      <div className="space-y-8 pt-20 px-4 text-left sm:px-6 md:px-9">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              KYC Verifications
            </h2>
            <p className="text-gray-500 text-sm">
              Review and approve customer verification requests
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-2">
            <button
              disabled={loading || exporting}
              onClick={exportCSV}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              Export CSV
            </button>

            <button
              disabled={loading || exporting}
              onClick={exportPDF}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              Export PDF
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Pending"
            value={filteredData.filter((k) => k.status === "Pending").length}
            icon={<Clock className="h-5 w-5 text-orange-500" />}
            bg="bg-orange-50"
          />
          <SummaryCard
            title="Approved"
            value={filteredData.filter((k) => k.status === "Approved").length}
            icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
            bg="bg-emerald-50"
          />
          <SummaryCard
            title="Rejected"
            value={filteredData.filter((k) => k.status === "Rejected").length}
            icon={<XCircle className="h-5 w-5 text-red-500" />}
            bg="bg-red-50"
          />
          <SummaryCard
            title="AML Flags"
            value={filteredData.filter((k) => k.aml && k.aml !== "None").length}
            icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
            bg="bg-red-50"
          />
        </div>

        {/* FILTERS */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                disabled={loading}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Risk Level
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                disabled={loading}
              >
                <option value="">All Risk Level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
            <p className="text-gray-600 font-medium">Loading KYC requests...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow">
            <AlertTriangle className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">
              {statusFilter || riskFilter
                ? "No KYC records match your filters"
                : "No KYC records found"}
            </p>
          </div>
        ) : (
          /* TABLE WRAPPER */
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-[900px] w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    User Name / ID
                  </th>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    ID Type
                  </th>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    Submission Date
                  </th>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    Risk Level
                  </th>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    AML Flags
                  </th>
                  <th className="py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition text-sm"
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {item.user?.fullName || "N/A"}
                      <div className="text-xs text-gray-500">
                        {item.user?.userId || "N/A"}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-800">
                        {item.idType || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.idNumber || "N/A"}
                      </p>
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-700">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          item.status === "Pending"
                            ? "text-yellow-700 bg-yellow-100"
                            : item.status === "Approved"
                              ? "text-green-700 bg-green-100"
                              : "text-red-700 bg-red-100"
                        }`}
                      >
                        {item.status || "Unknown"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          item.risk === "High"
                            ? "text-red-700 bg-red-100"
                            : item.risk === "Medium"
                              ? "text-orange-700 bg-orange-100"
                              : "text-green-700 bg-green-100"
                        }`}
                      >
                        {item.risk || "Unknown"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          item.aml && item.aml !== "None"
                            ? "text-red-700 bg-red-100"
                            : "text-gray-600 bg-gray-100"
                        }`}
                      >
                        {item.aml || "None"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleReviewClick(item)}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showKycReview && selectedUser && (
        <KycReview
          user={selectedUser}
          onClose={handleCloseModal}
          onRefresh={fetchKycRequests}
        />
      )}
    </>
  );
};

export default KYCVerification;
