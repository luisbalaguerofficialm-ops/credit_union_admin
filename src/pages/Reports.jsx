import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Download, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = "http://localhost:5000/api";

const Reports = () => {
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [settlementData, setSettlementData] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("this-month");
  const [generating, setGenerating] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchReports = async () => {
      if (!token) {
        toast.error("Authentication required. Please login again.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [revenueRes, transactionRes, settlementRes, activityRes] =
          await Promise.all([
            fetch(`${API_URL}/reports/revenue?period=${period}`, {
              headers,
            }).then((r) => r.json()),
            fetch(`${API_URL}/reports/transactions?period=${period}`, {
              headers,
            }).then((r) => r.json()),
            fetch(`${API_URL}/reports/settlements?period=${period}`, {
              headers,
            }).then((r) => r.json()),
            fetch(`${API_URL}/reports/user-activity?period=${period}`, {
              headers,
            }).then((r) => r.json()),
          ]);

        if (revenueRes.success && revenueRes.data) {
          setLineData(revenueRes.data);
        }
        if (transactionRes.success && transactionRes.data) {
          setBarData(transactionRes.data);
        }
        if (settlementRes.success && settlementRes.data) {
          setSettlementData(settlementRes.data);
        }
        if (activityRes.success && activityRes.data) {
          setUserActivity(activityRes.data);
        }

        toast.success("Reports loaded successfully");
      } catch (err) {
        console.error("Failed to load reports:", err);
        setError("Failed to load reports. Please try again.");
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token, period]);

  const handleGenerateReport = async () => {
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    try {
      setGenerating(true);

      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      let yPosition = 10;

      // Title
      doc.setFontSize(18);
      doc.text("Comprehensive Reports", 15, yPosition);
      yPosition += 10;

      // Period info
      doc.setFontSize(10);
      doc.text(
        `Period: ${period} | Generated: ${new Date().toLocaleDateString()}`,
        15,
        yPosition,
      );
      yPosition += 10;

      // Revenue Data Table
      if (lineData.length > 0) {
        doc.setFontSize(14);
        doc.text("Revenue Report", 15, yPosition);
        yPosition += 7;

        const revenueTableData = lineData
          .slice(0, 10)
          .map((item) => [
            item.name || "N/A",
            `$${(item.revenue || 0).toLocaleString()}`,
          ]);

        autoTable(doc, {
          head: [["Date", "Revenue"]],
          body: revenueTableData,
          startY: yPosition,
          margin: { left: 15, right: 15 },
        });
        yPosition = doc.internal.pageSize.height - 20;
      }

      // Transaction Data Table
      if (doc.internal.getNumberOfPages() === 1 && yPosition > 200) {
        doc.addPage();
        yPosition = 10;
      }

      if (barData.length > 0) {
        doc.setFontSize(14);
        doc.text("Transaction Reports", 15, yPosition);
        yPosition += 7;

        const transactionTableData = barData
          .slice(0, 10)
          .map((item) => [
            item.name || "N/A",
            `$${(item.transfer || 0).toLocaleString()}`,
            `$${(item.deposit || 0).toLocaleString()}`,
            `$${(item.withdraw || 0).toLocaleString()}`,
          ]);

        autoTable(doc, {
          head: [["Date", "Transfers", "Deposits", "Withdrawals"]],
          body: transactionTableData,
          startY: yPosition,
          margin: { left: 15, right: 15 },
        });
      }

      // Save PDF
      doc.save(`reports-${period}-${new Date().getTime()}.pdf`);
      toast.success("Report generated and downloaded successfully");
    } catch (err) {
      console.error("Failed to generate report:", err);
      toast.error("Failed to generate report");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 pt-20 md:px-9 px-5">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600 mx-auto" />
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-10 pt-15 md:px-9 px-5">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Error Loading Reports
            </h3>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pt-15 md:px-9 px-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold text-gray-800">Reports</h2>
          <p className="text-gray-500 text-sm">
            Generate and export comprehensive system reports
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
          </select>

          <button
            onClick={handleGenerateReport}
            disabled={generating || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Revenue Report
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Revenue trends over time
            </p>
          </div>

          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Transaction Reports
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Breakdown by transaction type
            </p>
          </div>

          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Bar dataKey="transfer" fill="#16a34a" />
                <Bar dataKey="deposit" fill="#2563eb" />
                <Bar dataKey="withdraw" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Lower Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Settlement Report
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Settlement status overview
            </p>
          </div>

          {settlementData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={settlementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#16a34a"
                  fill="#86efac"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#fbbf24"
                  fill="#fde68a"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              User Activity
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              User login and registration trends
            </p>
          </div>

          {userActivity.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="login"
                  stroke="#2563eb"
                  fill="#93c5fd"
                />
                <Area
                  type="monotone"
                  dataKey="newUser"
                  stroke="#16a34a"
                  fill="#86efac"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
