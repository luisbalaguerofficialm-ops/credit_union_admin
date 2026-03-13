import React, { useEffect, useState } from "react";
import { Loader2, Plus, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import CreateRoleModal from "../components/model/CreateRoleModel";
import RolePermission from "../components/model/RolePermission";

const API_URL = "https://admin-admin-credit.onrender.com/api";

const RolesPermission = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const token = localStorage.getItem("adminToken");

  /**
   * FETCH ROLES FROM API
   */
  const fetchRoles = async () => {
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/roles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        // Defensive: support { roles: [] } or []
        setRoles(Array.isArray(data.data) ? data.data : data.data?.roles || []);
        toast.success("Roles loaded successfully");
      } else {
        setError("Failed to load roles");
        toast.error("Failed to load roles");
        setRoles([]);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      setError("Failed to load roles. Please try again.");
      toast.error("Failed to load roles");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [token]);

  return (
    <div className="w-full p-4 sm:p-8 mt-16 text-left space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Roles & Permissions
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage system roles, permissions, and assign admins.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          disabled={loading || error}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Create New Role
        </button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Error Loading Roles
            </h3>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <button
              onClick={fetchRoles}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto" />
              <p className="text-gray-600 text-sm">Loading roles...</p>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-700 text-left text-sm font-medium">
                <th className="py-4 px-4">Role Name</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Admins Assigned</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Last Updated</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role) => (
                <tr
                  key={role._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {role.name || "N/A"}
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-blue-700 bg-blue-100 text-xs px-3 py-1 rounded-full font-medium">
                      {role.type || "System"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-gray-700">
                    {role.adminCount ?? 0}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${role.status === "Active" || !role.status ? "text-green-700 bg-green-100" : "text-gray-700 bg-gray-100"}`}
                    >
                      {role.status || "Active"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-600">
                    {role.updatedAt
                      ? new Date(role.updatedAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() =>
                        setSelectedRole({
                          id: role._id,
                          name: role.name,
                          admins: role.adminCount ?? 0,
                          type: role.type || "System",
                        })
                      }
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {!roles.length && !loading && (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="space-y-2">
                      <p className="text-gray-400 font-medium">
                        No roles found
                      </p>
                      <p className="text-gray-400 text-sm">
                        Create a new role to get started
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* CREATE ROLE MODAL */}
      {showCreateModal && (
        <CreateRoleModal
          onClose={() => {
            setShowCreateModal(false);
            fetchRoles();
          }}
        />
      )}

      {/* ROLE PERMISSION MODAL */}
      {selectedRole && (
        <RolePermission
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </div>
  );
};

export default RolesPermission;
