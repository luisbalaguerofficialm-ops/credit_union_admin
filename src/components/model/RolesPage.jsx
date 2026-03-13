import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import RolePermission from "./RolePermission";

const RolesPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://admin-admin-credit.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch roles on mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRoles(data.roles || []);
      } else {
        toast.error(data.message || "Failed to fetch roles");
      }
    } catch (err) {
      console.error("Fetch roles error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Roles</h2>
        <p className="text-gray-600">Loading roles...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Roles</h2>

      {roles.length === 0 ? (
        <p className="text-gray-600">No roles found</p>
      ) : (
        <div className="space-y-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div>
                <p className="font-medium">{role.name}</p>
                <p className="text-sm text-gray-500">
                  {role.adminsCount || 0} admins · {role.type || "Standard"}
                </p>
              </div>

              <button
                onClick={() => setSelectedRole(role)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ MODAL */}
      {selectedRole && (
        <RolePermission
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
          onSuccess={fetchRoles}
        />
      )}
    </div>
  );
};

export default RolesPage;
