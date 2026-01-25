import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import AssignAdminModal from "./AssignAdminModal";

const StatusBadge = ({ status }) => (
  <span
    className={`text-xs px-3 py-1 rounded-full font-medium ${
      status === "Active"
        ? "bg-emerald-100 text-emerald-600"
        : "bg-gray-200 text-gray-600"
    }`}
  >
    {status}
  </span>
);

const AssignedAdmins = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch assigned admins
  useEffect(() => {
    fetchAssignedAdmins();
  }, []);

  const fetchAssignedAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/assigned-admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins || []);
      } else {
        toast.error(data.message || "Failed to fetch assigned admins");
      }
    } catch (err) {
      console.error("Fetch admins error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (newAdmins) => {
    await fetchAssignedAdmins();
  };

  const handleActivate = async (adminId) => {
    try {
      const res = await fetch(`${API_URL}/admin/admins/${adminId}/activate`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Admin activated successfully");
        fetchAssignedAdmins();
      } else {
        toast.error(data.message || "Failed to activate admin");
      }
    } catch (err) {
      console.error("Activate admin error:", err);
      toast.error("Error connecting to server");
    }
  };

  const handleRemove = async (adminId) => {
    if (!window.confirm("Are you sure you want to remove this admin?")) return;

    try {
      setRemoving(adminId);
      const res = await fetch(`${API_URL}/admin/admins/${adminId}/remove`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Admin removed successfully");
        fetchAssignedAdmins();
      } else {
        toast.error(data.message || "Failed to remove admin");
      }
    } catch (err) {
      console.error("Remove admin error:", err);
      toast.error("Error connecting to server");
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Assigned Admins</h2>
          <p className="text-sm text-gray-500">
            {admins.length} admins have this role
          </p>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center justify-center gap-2 hover:bg-blue-700 bg-[#0A7EA4] text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
        >
          <Plus size={16} /> Assign Admin
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading admins...</div>
      ) : admins.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No admins assigned yet
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Activity</th>
                  <th className="px-4 py-3 text-left">Admin</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Assign Date</th>
                  <th className="px-4 py-3 text-left">Details</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                        {admin.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-xs text-gray-500">{admin.email}</div>
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={admin.status} />
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(admin.assignedDate).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 space-x-3">
                      {admin.status === "Inactive" && (
                        <button
                          onClick={() => handleActivate(admin._id)}
                          className="text-emerald-600 text-sm font-medium hover:underline"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(admin._id)}
                        disabled={removing === admin._id}
                        className="text-red-500 text-sm font-medium hover:underline disabled:opacity-50"
                      >
                        {removing === admin._id ? "Removing..." : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-4">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="border rounded-lg p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                    {admin.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">{admin.name}</div>
                    <div className="text-xs text-gray-500">{admin.email}</div>
                  </div>

                  <StatusBadge status={admin.status} />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Assigned</span>
                  <span>
                    {new Date(admin.assignedDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-4 pt-2">
                  {admin.status === "Inactive" && (
                    <button
                      onClick={() => handleActivate(admin._id)}
                      className="text-emerald-600 text-sm font-medium hover:underline"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(admin._id)}
                    disabled={removing === admin._id}
                    className="text-red-500 text-sm font-medium hover:underline disabled:opacity-50"
                  >
                    {removing === admin._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ASSIGN ADMIN MODAL */}
      {showAssignModal && (
        <AssignAdminModal
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default AssignedAdmins;
