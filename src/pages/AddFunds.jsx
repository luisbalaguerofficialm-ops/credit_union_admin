import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/api";

const AddFunds = () => {
  const { token } = useContext(AuthContext); // get token from context

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH FUNDING REQUESTS
  // =========================
  const fetchFundingRequests = async () => {
    try {
      if (!token) {
        toast.error("Admin not authenticated");
        return;
      }

      setLoading(true);

      const res = await fetch(`${API_URL}/funding-requests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("Funding API response:", data);

      if (data.success) {
        setRequests(data.requests || []);
      } else {
        toast.error(data.message || "Failed to fetch requests");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Server error while loading requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundingRequests();
  }, [token]);

  // =========================
  // APPROVE / REJECT
  // =========================
  const handleAction = async (id, action) => {
    try {
      if (!token) {
        toast.error("Admin not authenticated");
        return;
      }

      const endpoint =
        action === "approve"
          ? `${API_URL}/funding-requests/${id}/approve`
          : `${API_URL}/funding-requests/${id}/reject`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewNote: "" }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Request ${action}d successfully`);
        fetchFundingRequests();
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process request");
    }
  };

  const statusStyle = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-2xl text-[#006A91] font-semibold mb-6">
        Bank Funding Requests
      </h1>

      {loading && <p className="text-gray-500 mb-4">Loading requests...</p>}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="p-3 font-medium">{req.user?.name || "User"}</td>

                <td className="p-3">{req.user?.email || "N/A"}</td>

                <td className="p-3">
                  {req.currency} {Number(req.amount).toLocaleString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                      req.status,
                    )}`}
                  >
                    {req.status.toUpperCase()}
                  </span>
                </td>

                <td className="p-3 text-gray-500 text-xs">
                  {new Date(req.createdAt).toLocaleString()}
                </td>

                <td className="p-3 text-center">
                  {req.status === "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAction(req._id, "approve")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleAction(req._id, "reject")}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && requests.length === 0 && (
        <p className="text-gray-500 mt-4">No funding requests available</p>
      )}
    </div>
  );
};

export default AddFunds;
