import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const EditFeeRule = ({ fee, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    ruleName: fee?.ruleName || "Default Transfer Fee",
    transactionType: fee?.type?.toLowerCase() || "transfer",
    feeType: fee?.structure?.toLowerCase() || "percentage",
    feeValue: fee?.amount?.replace(/[^0-9.]/g, "") || "1.5",
    minAmount: fee?.minLimit || "100",
    maxAmount: fee?.maxLimit || "500000",
    status: fee?.status?.toLowerCase() || "active",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.ruleName ||
      !formData.transactionType ||
      !formData.feeType ||
      !formData.feeValue ||
      !formData.minAmount ||
      !formData.maxAmount
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.ruleName,
        type:
          formData.transactionType.charAt(0).toUpperCase() +
          formData.transactionType.slice(1),
        structure:
          formData.feeType.charAt(0).toUpperCase() + formData.feeType.slice(1),
        amount: parseFloat(formData.feeValue),
        minLimit: parseFloat(formData.minAmount),
        maxLimit: parseFloat(formData.maxAmount),
        status: formData.status === "active" ? "Active" : "Disabled",
      };

      const res = await fetch(`${API_URL}/admin/fee-rules/${fee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Fee rule updated successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to update fee rule");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl max-h-screen overflow-y-auto p-6 md:p-10 relative">
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-[18px] font-semibold">Edit Fee Rule</h2>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Rule Name */}
          <div>
            <label className="font-semibold text-[13px]">Rule Name</label>
            <input
              type="text"
              name="ruleName"
              value={formData.ruleName}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            />
          </div>

          {/* Transaction Type */}
          <div>
            <label className="font-semibold text-[13px]">
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            >
              <option value="transfer">Transfer</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="deposit">Deposit</option>
            </select>
          </div>

          {/* Fee Type */}
          <div>
            <label className="font-semibold text-[13px]">Fee Type</label>
            <select
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            >
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          {/* Fee Value */}
          <div>
            <label className="font-semibold text-[13px]">Fee Value</label>
            <input
              type="number"
              name="feeValue"
              value={formData.feeValue}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            />
          </div>

          {/* Min & Max Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-[13px]">Min Amount</label>
              <input
                type="number"
                name="minAmount"
                value={formData.minAmount}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              />
            </div>
            <div>
              <label className="font-semibold text-[13px]">Max Amount</label>
              <input
                type="number"
                name="maxAmount"
                value={formData.maxAmount}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="font-semibold text-[13px]">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeeRule;
