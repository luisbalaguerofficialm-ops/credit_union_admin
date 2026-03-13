import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const ROLE_TYPES = ["SuperAdmin", "Admin", "Support"];

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

const CreateRoleModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    roleName: "",
    roleType: "",
    description: "",
    status: "Active",
    adminId: "",
  });
  const [admins, setAdmins] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingAdmins, setFetchingAdmins] = useState(true);

  const API_URL = "https://admin-admin-credit.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch admins on mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins || []);
      }
    } catch (err) {
      console.error("Fetch admins error:", err);
    } finally {
      setFetchingAdmins(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (permission, action) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: {
        ...(prev[permission] || {}),
        [action]: !prev[permission]?.[action],
      },
    }));
  };

  const handleSubmit = async () => {
    if (!form.roleName || !form.roleType || !form.adminId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.roleName,
          type: form.roleType,
          description: form.description,
          status: form.status,
          adminId: form.adminId,
          permissions,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Role created successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to create role");
      }
    } catch (err) {
      console.error("Create role error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-6">Create New Role</h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Role Name */}
          <div>
            <label className="block text-sm mb-1 font-medium">Role Name</label>
            <input
              type="text"
              name="roleName"
              value={form.roleName}
              onChange={handleChange}
              placeholder="Enter role name"
              className="border border-gray-200 w-full rounded-md px-3 py-2"
            />
          </div>

          {/* Role Type */}
          <div>
            <label className="block text-sm mb-1 font-medium">Role Type</label>
            <select
              name="roleType"
              value={form.roleType}
              onChange={handleChange}
              className="border border-gray-200 w-full rounded-md px-3 py-2"
            >
              <option value="">Select role type</option>
              {ROLE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the role and its responsibilities"
              className="border border-gray-200 w-full rounded-md px-3 py-2"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm mb-1 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border w-full rounded-md px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Select Admin */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Select Admin
            </label>
            <select
              name="adminId"
              value={form.adminId}
              onChange={handleChange}
              className="border border-gray-200 w-full rounded-md px-3 py-2"
              disabled={fetchingAdmins}
            >
              <option value="">
                {fetchingAdmins ? "Loading admins..." : "Choose an admin"}
              </option>
              {admins.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Permission Matrix</h3>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Permission</th>
                  <th className="px-4 py-3">View</th>
                  <th className="px-4 py-3">Edit</th>
                  <th className="px-4 py-3">Approve</th>
                  <th className="px-4 py-3">Delete</th>
                </tr>
              </thead>

              <tbody>
                {PERMISSIONS.map((item) => (
                  <tr key={item} className="border-t border-gray-200">
                    <td className="px-4 py-3">{item}</td>
                    {["view", "edit", "approve", "delete"].map((action) => (
                      <td key={action} className="text-center px-4 py-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={permissions[item]?.[action] || false}
                          onChange={() => handlePermissionChange(item, action)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border border-gray-200 rounded-md bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-[#0A7EA4] text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoleModal;
