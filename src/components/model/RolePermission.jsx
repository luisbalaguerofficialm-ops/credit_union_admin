import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import AssignedAdmins from "./AssignedAdmins";

const PERMISSIONS = [
  "User Management",
  "Account Actions",
  "KYC Operations",
  "Transactions",
  "Fraud & Risk",
  "Reports",
  "Notifications",
  "Admin Settings",
];

const RolePermission = ({ role, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showAdminsModal, setShowAdminsModal] = useState(false);
  const [roleData, setRoleData] = useState(role);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [saving, setSaving] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch role details and permissions on mount
  useEffect(() => {
    if (role?.id) {
      fetchRoleDetails();
    }
  }, [role?.id]);

  const fetchRoleDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/roles/${role.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRoleData(data.role);
        // Initialize permissions from backend
        if (data.role.permissions) {
          setPermissions(data.role.permissions);
        }
      } else {
        toast.error(data.message || "Failed to fetch role details");
      }
    } catch (err) {
      console.error("Fetch role error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (permission, action) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: {
        ...prev[permission],
        [action]: !prev[permission]?.[action],
      },
    }));
  };

  const handleSavePermissions = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/admin/roles/${role.id}/permissions`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Permissions updated successfully");
        setShowPermissionModal(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.message || "Failed to save permissions");
      }
    } catch (err) {
      console.error("Save permissions error:", err);
      toast.error("Error connecting to server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-3 sm:px-4">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6">
          <p className="text-center text-gray-600">Loading role details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-3 sm:px-4">
      {/* ================= MAIN ROLE MODAL ================= */}
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Header */}
        <h3 className="text-lg sm:text-xl font-semibold">{roleData?.name}</h3>
        <p className="text-gray-500 text-sm mb-5">
          Handles role permissions and assignments
        </p>

        {/* Tabs */}
        <div className="flex gap-6 sm:gap-10 border-b mb-6 overflow-x-auto scrollbar-hide">
          {["overview", "permissions", "admins"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "permissions") setShowPermissionModal(true);
                if (tab === "admins") setShowAdminsModal(true);
              }}
              className={`whitespace-nowrap pb-2 text-sm sm:text-base font-medium capitalize transition ${
                activeTab === tab
                  ? "text-[#006A91] border-b-2 border-[#006A91]"
                  : "text-gray-500 hover:text-[#006A91]"
              }`}
            >
              {tab === "overview" && "Overview"}
              {tab === "permissions" && "Permissions"}
              {tab === "admins" && "Assigned Admins"}
            </button>
          ))}
        </div>

        {/* Overview */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm sm:text-base">
          <p>
            Status:{" "}
            <span
              className={`font-semibold ${
                roleData?.status === "Active"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {roleData?.status || "Active"}
            </span>
          </p>
          <p>Admins Assigned: {roleData?.adminsCount || 0}</p>
          <p>Role Type: {roleData?.type || "Standard"}</p>
          {roleData?.description && <p>Description: {roleData.description}</p>}
        </div>
      </div>

      {/* ================= PERMISSIONS MODAL ================= */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center px-3 sm:px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPermissionModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold mb-1">
              Permission Matrix
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Configure role access levels
            </p>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-500">
                    <th className="p-3 text-left">Permission</th>
                    <th className="p-3 text-center">View</th>
                    <th className="p-3 text-center">Edit</th>
                    <th className="p-3 text-center">Approve</th>
                    <th className="p-3 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((perm) => (
                    <tr key={perm} className="border-b hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">{perm}</td>
                      {["view", "edit", "approve", "delete"].map((action) => (
                        <td key={action} className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={permissions[perm]?.[action] || false}
                            onChange={() =>
                              handlePermissionChange(perm, action)
                            }
                            disabled={saving}
                            className="disabled:opacity-50"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPermissionModal(false)}
                disabled={saving}
                className="px-5 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePermissions}
                disabled={saving}
                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Permissions"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ASSIGNED ADMINS MODAL ================= */}
      {showAdminsModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center px-3 sm:px-4">
          <div className="bg-white w-full max-w-5xl rounded-xl relative max-h-[90vh] overflow-y-auto p-3 sm:p-6">
            <button
              onClick={() => setShowAdminsModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <AssignedAdmins />
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermission;
