import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, Loader2, AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import CreateNewFeeRule from "../components/model/CreateNewFeeRule";
import EditFeeRule from "../components/model/EditFeeRule";

const API_URL = "https://admin-credit-union.onrender.com/api";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFee, setEditingFee] = useState(null);

  const token = localStorage.getItem("adminToken");

  /**
   * FETCH FEES
   */
  const fetchFees = async () => {
    if (!token) {
      toast.error("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/fee-rules`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setFees(Array.isArray(data.fees) ? data.fees : []);
      } else {
        throw new Error(data.message || "Failed to fetch fees");
      }
    } catch (error) {
      console.error("Failed to fetch fees:", error);
      toast.error(error.message || "Error loading fees");
      setFees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, [token]);

  /**
   * DELETE FEE RULE
   */
  const handleDeleteFee = async (feeId) => {
    if (!window.confirm("Are you sure you want to delete this fee rule?")) {
      return;
    }

    setDeleting(feeId);
    try {
      const res = await fetch(`${API_URL}/admin/fee-rules/${feeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Fee rule deleted successfully");
        fetchFees();
      } else {
        throw new Error(data.message || "Failed to delete fee rule");
      }
    } catch (error) {
      toast.error(error.message || "Error deleting fee rule");
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  /**
   * FILTER LOGIC
   */
  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const matchesSearch = (fee.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || fee.status === statusFilter;

      const matchesType = typeFilter === "All" || fee.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [fees, search, statusFilter, typeFilter]);

  const handleEdit = (fee) => {
    setEditingFee(fee);
    setShowEditModal(true);
  };

  return (
    <div className="w-full p-6 md:px-20 flex flex-col gap-7">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Fees</h2>
          <p className="text-sm text-gray-500">
            Configure transaction fees and charges
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Plus size={16} />
          Create Fee Rule
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-5 rounded-xl shadow flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search by rule name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
            className="w-full outline-none text-sm disabled:bg-gray-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          disabled={loading}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          disabled={loading}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
        >
          <option value="All">All Types</option>
          <option value="Transfer">Transfer</option>
          <option value="Withdrawal">Withdrawal</option>
          <option value="Deposit">Deposit</option>
          <option value="Service">Service</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-4 text-gray-900">
          Fee Rules ({filteredFees.length})
        </h3>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading fee rules...</p>
            </div>
          </div>
        ) : filteredFees.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48">
            <AlertTriangle className="w-10 h-10 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">
              {search || statusFilter !== "All" || typeFilter !== "All"
                ? "No fee rules match your filters"
                : "No fee rules found"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 text-gray-600 bg-gray-50">
                <tr>
                  <th className="py-3 px-2 text-left font-semibold">
                    Rule Name
                  </th>
                  <th className="py-3 px-2 text-left font-semibold">Type</th>
                  <th className="py-3 px-2 text-left font-semibold">
                    Structure
                  </th>
                  <th className="py-3 px-2 text-left font-semibold">Amount</th>
                  <th className="py-3 px-2 text-left font-semibold">Limits</th>
                  <th className="py-3 px-2 text-left font-semibold">Status</th>
                  <th className="py-3 px-2 text-left font-semibold">Updated</th>
                  <th className="py-3 px-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredFees.map((fee) => (
                  <tr key={fee._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-2 font-medium text-gray-900">
                      {fee.name || "N/A"}
                    </td>
                    <td className="py-3 px-2 text-gray-700">
                      {fee.type || "N/A"}
                    </td>
                    <td className="py-3 px-2 text-gray-700">
                      {fee.structure || "N/A"}
                    </td>
                    <td className="py-3 px-2 font-semibold text-gray-900">
                      {fee.amount ? `$${fee.amount}` : "N/A"}
                    </td>
                    <td className="py-3 px-2 text-gray-700">
                      {fee.limits ? `$${fee.limits.toLocaleString()}` : "N/A"}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          fee.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {fee.status || "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600">
                      {fee.updatedAt
                        ? new Date(fee.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-3 px-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(fee)}
                        disabled={deleting === fee._id}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFee(fee._id)}
                        disabled={deleting === fee._id}
                        className="text-red-600 hover:text-red-800 transition disabled:opacity-50 flex items-center gap-1"
                      >
                        {deleting === fee._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showCreateModal && (
        <CreateNewFeeRule
          onClose={() => {
            setShowCreateModal(false);
            fetchFees();
          }}
        />
      )}

      {showEditModal && editingFee && (
        <EditFeeRule
          fee={editingFee}
          onClose={() => {
            setEditingFee(null);
            setShowEditModal(false);
            fetchFees();
          }}
        />
      )}
    </div>
  );
};

export default Fees;
