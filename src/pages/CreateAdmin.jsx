// pages/CreateAdmin.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Loader2, ShieldPlus } from "lucide-react";

const API_URL = "https://admin-credit-union.onrender.com/api";

const CreateAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("adminToken");

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors above");
      return;
    }

    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Admin created successfully!");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Admin",
        });
        setErrors({});
      } else {
        toast.error(data.message || "Failed to create admin");
      }
    } catch (err) {
      console.error("Error creating admin:", err);
      toast.error("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ShieldPlus className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Admin</h2>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Set up a new admin account for your system
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password (min 6 characters)"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Admin Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 ${
                errors.role ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">Super Admin</option>
              <option value="Staff">Staff</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-6 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Admin...
              </>
            ) : (
              <>
                <ShieldPlus className="w-4 h-4" />
                Create Admin
              </>
            )}
          </button>
        </form>

        {/* Help Text */}
        <p className="text-gray-400 text-xs text-center mt-4">
          Admin credentials will be sent to the provided email
        </p>
      </div>
    </div>
  );
};

export default CreateAdmin;
