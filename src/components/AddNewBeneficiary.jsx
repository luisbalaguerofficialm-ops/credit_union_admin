import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddNewBeneficiary = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    nationality: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "https://admin-credit-union.onrender.com/api";
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      toast.error("Please enter first name");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Please enter last name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter email");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter phone number");
      return;
    }
    if (!formData.dateOfBirth) {
      toast.error("Please enter date of birth");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/beneficiaries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || null,
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.nationality || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Beneficiary created successfully");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Failed to create beneficiary");
      }
    } catch (err) {
      console.error("Create beneficiary error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-400 bg-opacity-50 text-left flex min-h-screen justify-center items-center px-4 z-50 fixed inset-0">
      <div className="mb-9">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-2xl">Add New Beneficiary</h4>
          <button onClick={onClose} disabled={loading}>
            <X className="w-7 h-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col bg-[#E9E6E6] gap-3 max-w-lg mb-9 pb-7 rounded-xl shadow-lg p-6 relative"
        >
          <div className="mb-5 flex items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstName">First Name*</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="lastName">Last Name*</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex mb-1 flex-col gap-1 w-full">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col mb-1 gap-1 w-full">
              <label htmlFor="phone">Phone Number*</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
              />
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Street address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
            />
          </div>
          <div className="mb-6 flex gap-5 items-center">
            <div className="flex-1">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="nationality">Nationality</label>
              <input
                id="nationality"
                name="nationality"
                type="text"
                placeholder="e.g., USA"
                value={formData.nationality}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg h-9 border px-2 disabled:opacity-50"
              />
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full rounded-lg h-9 border bg-gray-300 text-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg h-9 border bg-[#006A91] text-white disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Beneficiary"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBeneficiary;
