import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddFunds = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL = "https://admin-credit-union.onrender.com";

  // =========================================
  // FETCH ALL FUNDING REQUESTS (ADMIN)
  // =========================================
  const fetchFundingRequests = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/funding-request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setRequests(data.requests || []);
    } catch (err) {
      toast.error(err.message || "Failed to load funding requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundingRequests();
  }, []);

  // =========================================
  // APPROVE / REJECT REQUEST
  // =========================================
  const handleAction = async (requestId, action) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/funding-request/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message || "Action successful");
      fetchFundingRequests();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold mb-6">Bank Funding Requests</h1>

      {loading && <p className="text-gray-500 mb-4">Loading requests...</p>}

      {!loading && requests.length === 0 ? (
        <p className="text-gray-500">No funding requests found</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Requested At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="p-3 font-medium">
                    {req.user?.fullName || "—"}
                  </td>
                  <td className="p-3">{req.user?.email || "—"}</td>
                  <td className="p-3">
                    ₦{Number(req.amount).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(req.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    {req.status === "pending" && (
                      <div className="flex justify-center gap-3">
                        <button
                          disabled={loading}
                          onClick={() => handleAction(req._id, "approve")}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          Approve
                        </button>

                        <button
                          disabled={loading}
                          onClick={() => handleAction(req._id, "reject")}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddFunds;
