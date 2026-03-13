import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, Search } from "lucide-react";

const AssignAdminModal = ({ onClose, onAssign }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const API_URL = "https://admin-admin-credit.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  // Fetch admins from backend
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins || []);
      } else {
        toast.error(data.message || "Failed to fetch admins");
      }
    } catch (err) {
      console.error("Fetch admins error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (admin) => {
    setSelected((prev) =>
      prev.find((a) => a._id === admin._id)
        ? prev.filter((a) => a._id !== admin._id)
        : [...prev, admin],
    );
  };

  const handleAssign = async () => {
    if (selected.length === 0) return;

    try {
      setAssigning(true);
      const res = await fetch(`${API_URL}/admin/assign-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adminIds: selected.map((a) => a._id),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Admin(s) assigned successfully");
        onAssign(selected);
        onClose();
      } else {
        toast.error(data.message || "Failed to assign admin");
      }
    } catch (err) {
      console.error("Assign admin error:", err);
      toast.error("Error connecting to server");
    } finally {
      setAssigning(false);
    }
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-5 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-1">Assign Admin</h2>
        <p className="text-sm text-gray-500 mb-4">
          Select admins to assign this role
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search admin by name or email"
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0A7EA4]"
          />
        </div>

        {/* Admin List */}
        <div className="max-h-64 overflow-y-auto border rounded-md divide-y">
          {loading ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              Loading admins...
            </div>
          ) : filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => {
              const isSelected = selected.find((a) => a._id === admin._id);
              return (
                <div
                  key={admin._id}
                  onClick={() => toggleSelect(admin)}
                  className={`p-3 flex items-center justify-between cursor-pointer ${
                    isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <div className="font-medium text-sm">{admin.name}</div>
                    <div className="text-xs text-gray-500">{admin.email}</div>
                  </div>

                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    readOnly
                    className="w-4 h-4"
                  />
                </div>
              );
            })
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">
              No admins found
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            disabled={assigning}
            className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={selected.length === 0 || assigning}
            onClick={handleAssign}
            className="px-4 py-2 text-sm bg-[#0A7EA4] text-white rounded-md disabled:opacity-50"
          >
            {assigning ? "Assigning..." : `Assign ${selected.length || ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAdminModal;
