import React, { useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const CreateNewFeeRule = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    ruleName: "",
    type: "",
    structure: "",
    amount: "",
    minLimit: "",
    maxLimit: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.ruleName ||
      !form.type ||
      !form.structure ||
      !form.amount ||
      !form.minLimit ||
      !form.maxLimit
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/fee-rules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.ruleName,
          type: form.type,
          structure: form.structure,
          amount: parseFloat(form.amount),
          minLimit: parseFloat(form.minLimit),
          maxLimit: parseFloat(form.maxLimit),
          status: form.status,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Fee rule created successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to create fee rule");
      }
    } catch (err) {
      console.error("Create fee rule error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl max-h-screen overflow-y-auto p-6 md:p-10">
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-[18px] font-semibold">Create Fee Rule</h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rule Name */}
          <div>
            <label className="text-[13px] font-medium">Rule Name</label>
            <input
              type="text"
              name="ruleName"
              value={form.ruleName}
              onChange={handleChange}
              placeholder="Enter rule name"
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-[13px] font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              required
            >
              <option value="">Select type</option>
              <option value="Transfer">Transfer</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Service">Service</option>
            </select>
          </div>

          {/* Structure */}
          <div>
            <label className="text-[13px] font-medium">Structure</label>
            <select
              name="structure"
              value={form.structure}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              required
            >
              <option value="">Select structure</option>
              <option value="Fixed">Fixed</option>
              <option value="Percentage">Percentage</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Fee Amount */}
          <div>
            <label className="text-[13px] font-medium">Fee Amount</label>
            <input
              type="text"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount (e.g. ₦50 or 1.5%)"
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              required
            />
          </div>

          {/* Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[13px] font-medium">Min Limit</label>
              <input
                type="number"
                name="minLimit"
                value={form.minLimit}
                onChange={handleChange}
                placeholder="Minimum amount"
                className="w-full mt-1 p-3 border rounded-lg text-[13px]"
                required
              />
            </div>
            <div>
              <label className="text-[13px] font-medium">Max Limit</label>
              <input
                type="number"
                name="maxLimit"
                value={form.maxLimit}
                onChange={handleChange}
                placeholder="Maximum amount"
                className="w-full mt-1 p-3 border rounded-lg text-[13px]"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-[13px] font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-10 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border w-[150px] hover:bg-gray-500 rounded-lg text-[13px] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#006A91] w-[150px] hover:bg-blue-800 text-white rounded-lg text-[13px] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Rule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewFeeRule;
