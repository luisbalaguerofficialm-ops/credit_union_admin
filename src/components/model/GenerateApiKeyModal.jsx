import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const GenerateApiKeyModal = ({ onClose, onGenerate, loading = false }) => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleGenerate = () => {
    if (!name) return; // basic validation
    onGenerate({ name, expiry });
    setName("");
    setExpiry("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg max-h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Generate API Key
          </h3>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Key Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Production API"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Expiry */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Expiry Date (optional)
          </label>
          <input
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!name || loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Key"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateApiKeyModal;
