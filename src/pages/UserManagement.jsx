import React, { useEffect, useState } from "react";
import { Search, Plus, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

import AddNewBeneficiary from "../components/AddNewBeneficiary";
import UserProfile from "../components/model/UserProfile";

const API_URL = "https://admin-credit-union.onrender.com/api";

const UserManagement = () => {
  const token = localStorage.getItem("adminToken");

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ==============================
  // FETCH USERS (ADMIN)
  // ==============================
  const fetchUsers = async () => {
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        page,
        limit,
        search,
        status,
        risk,
      });

      const res = await fetch(`${API_URL}/admin/users?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.data || []);
        setTotalPages(data.totalPages || 1);
        toast.success("Users loaded successfully");
      } else {
        setError("Failed to load users");
        toast.error("Failed to load users");
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again.");
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, status, risk, token]);

  return (
    <div className="space-y-8 text-left px-5 md:px-9 pt-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            User Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor all platform users
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          disabled={loading || error}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg shadow-sm font-medium transition-colors whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Error Loading Users
            </h3>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <button
              onClick={fetchUsers}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="border border-gray-300 rounded-lg flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full px-3 py-1 outline-none bg-transparent text-gray-700"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* Status */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Risk */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setPage(1);
            setRisk(e.target.value);
          }}
        >
          <option value="">All Risk Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="py-4 px-5">User</th>
              <th className="py-4 px-5">Contact</th>
              <th className="py-4 px-5">KYC</th>
              <th className="py-4 px-5">Balance</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5">Risk</th>
              <th className="py-4 px-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Loading users...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="space-y-2">
                    <p className="text-gray-400 font-medium">No users found</p>
                    <p className="text-gray-400 text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm"
                >
                  <td className="py-4 px-5 font-medium text-gray-900">
                    {user.fullName || "N/A"}
                  </td>

                  <td className="py-4 px-5">
                    <p className="text-gray-900">{user.email || "N/A"}</p>
                    <p className="text-xs text-gray-500">{user.phone || "—"}</p>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.kycStatus === "Approved"
                          ? "bg-green-100 text-green-700"
                          : user.kycStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.kycStatus || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-5 font-medium text-gray-900">
                    $
                    {(user.balance || 0).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : user.status === "Suspended"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.riskLevel === "Low"
                          ? "bg-green-100 text-green-700"
                          : user.riskLevel === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.riskLevel || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowProfile(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {!loading && users.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-gray-600 mb-6">
          <p className="font-medium">
            Page <span className="text-blue-600 font-bold">{page}</span> of{" "}
            <span className="text-blue-600 font-bold">{totalPages}</span>
          </p>

          <div className="flex gap-1 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ← Previous
            </button>

            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 border rounded-lg transition-colors font-medium ${
                    page === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      {showModal && <AddNewBeneficiary onClose={() => setShowModal(false)} />}

      {showProfile && (
        <UserProfile
          user={selectedUser}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
