import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const EditFeeRule = ({ fee, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    ruleName: fee?.ruleName || "",
    type: fee?.type || "Transfer",
    structure: fee?.structure || "Fixed",
    amount: fee?.amount || "",
    status: fee?.status || "Active",
    tiers:
      fee?.structure === "Tiered" && fee?.tiers?.length
        ? fee.tiers
        : [{ min: "", max: "", fee: "" }],
  });

  const [loading, setLoading] = useState(false);

  const API_URL = "https://admin-admin-credit.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers[index][field] = value;
    setFormData({ ...formData, tiers: updatedTiers });
  };

  const addTier = () => {
    setFormData({
      ...formData,
      tiers: [...formData.tiers, { min: "", max: "", fee: "" }],
    });
  };

  const removeTier = (index) => {
    const updated = formData.tiers.filter((_, i) => i !== index);
    setFormData({ ...formData, tiers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ruleName || !formData.type || !formData.structure) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ruleName: formData.ruleName,
        type: formData.type,
        structure: formData.structure,
        status: formData.status,
      };

      if (formData.structure === "Tiered") {
        payload.tiers = formData.tiers.map((t) => ({
          min: Number(t.min),
          max: Number(t.max),
          fee: Number(t.fee),
        }));
      } else {
        if (formData.structure === "Fixed") {
          payload.fixedFee = Number(formData.amount);
        }

        if (formData.structure === "Percentage") {
          payload.percentage = Number(formData.amount);
        }
      }

      const res = await fetch(`${API_URL}/fees/${fee._id}`, {
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
      <div className="bg-white w-full max-w-2xl rounded-xl max-h-screen overflow-y-auto p-6 md:p-10">
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

          {/* Type */}
          <div>
            <label className="font-semibold text-[13px]">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            >
              <option value="Transfer">Transfer</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Service">Service</option>
            </select>
          </div>

          {/* Structure */}
          <div>
            <label className="font-semibold text-[13px]">Structure</label>
            <select
              name="structure"
              value={formData.structure}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg text-[13px]"
            >
              <option value="Fixed">Fixed</option>
              <option value="Percentage">Percentage</option>
              <option value="Tiered">Tiered</option>
            </select>
          </div>

          {/* Fixed / Percentage */}
          {formData.structure !== "Tiered" && (
            <div>
              <label className="font-semibold text-[13px]">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg text-[13px]"
              />
            </div>
          )}

          {/* Tiered Structure */}
          {formData.structure === "Tiered" && (
            <div className="space-y-4">
              <label className="font-semibold text-[13px]">Fee Tiers</label>

              {formData.tiers.map((tier, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-end">
                  <input
                    type="number"
                    placeholder="Min"
                    value={tier.min}
                    onChange={(e) =>
                      handleTierChange(index, "min", e.target.value)
                    }
                    className="p-3 border rounded-lg text-[13px]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={tier.max}
                    onChange={(e) =>
                      handleTierChange(index, "max", e.target.value)
                    }
                    className="p-3 border rounded-lg text-[13px]"
                  />
                  <input
                    type="number"
                    placeholder="Fee"
                    value={tier.fee}
                    onChange={(e) =>
                      handleTierChange(index, "fee", e.target.value)
                    }
                    className="p-3 border rounded-lg text-[13px]"
                  />

                  {formData.tiers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTier(index)}
                      className="text-red-500 text-xs mt-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addTier}
                className="text-blue-600 text-sm font-medium"
              >
                + Add Tier
              </button>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="font-semibold text-[13px]">Status</label>
            <select
              name="status"
              value={formData.status}
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
              className="px-6 py-2 border w-[150px] rounded-lg text-[13px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#006A91] w-[150px] text-white rounded-lg text-[13px]"
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
