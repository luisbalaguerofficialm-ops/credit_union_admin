import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  X,
  Image as ImageIcon,
  User,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const BASE_URL = "https://admin-admin-credit.onrender.com/api";

const KycReview = ({ user, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [kycData, setKycData] = useState(null);
  const token = localStorage.getItem("adminToken");

  // ===============================
  // FETCH FULL KYC DETAILS
  // ===============================
  useEffect(() => {
    const fetchKycDetails = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/admin/kyc/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setKycData(data.kyc);
        }
      } catch (err) {
        console.error("Failed to fetch KYC images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKycDetails();
  }, [user, token]);

  // ===============================
  // HANDLE STATUS UPDATES
  // ===============================
  const updateKycStatus = async (status, reason = "") => {
    const confirmMsg = `Are you sure you want to set this KYC to ${status.toUpperCase()}?`;
    if (!window.confirm(confirmMsg)) return;

    setProcessing(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/kyc/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          status: status,
          reason: reason, // Optional rejection reason
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`KYC ${status} successfully.`);
        if (onRefresh) onRefresh(); // Refresh the list in the background
        onClose(); // Close modal
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 text-left z-[60] flex items-center justify-center bg-black/60 px-3 backdrop-blur-sm">
      <div className="flex w-full max-w-5xl max-h-[95vh] flex-col bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              KYC Verification Case
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Reviewing: {user?.name || "Unknown User"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-200 p-2 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <Loader2 className="animate-spin text-teal-600 mb-2" size={32} />
              <p className="text-sm font-medium text-gray-500">
                Loading documents from Render...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* LEFT: USER DATA */}
              <div className="space-y-6">
                <section>
                  <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">
                    User Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                    <Field label="Full Name" value={user?.name} />
                    <Field label="User ID" value={user?._id || user?.userId} />
                    <Field
                      label="ID Type"
                      value={kycData?.idType || user?.idType}
                    />
                    <Field
                      label="ID Number"
                      value={kycData?.idNumber || user?.idNumber}
                    />
                    <Field label="Country" value={kycData?.country} />
                    <Field label="Risk Level" value={user?.risk || "Normal"} />
                  </div>
                </section>

                <section className="p-4 border border-orange-100 bg-orange-50 rounded-lg">
                  <div className="flex gap-2 items-center text-orange-700 mb-1">
                    <AlertTriangle size={16} />
                    <span className="text-xs font-bold uppercase">
                      Admin Note
                    </span>
                  </div>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    Please verify that the name on the document matches the
                    account name exactly. Ensure the photo on the ID matches the
                    selfie provided.
                  </p>
                </section>
              </div>

              {/* RIGHT: DOCUMENT IMAGES */}
              <div>
                <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">
                  Identity Documents
                </h3>

                <DocumentBox
                  title="ID Document - Front"
                  url={
                    kycData?.docs?.find((d) => d.name.includes("Front"))?.url
                  }
                >
                  <ImageIcon className="text-gray-300" size={40} />
                </DocumentBox>

                <DocumentBox
                  title="ID Document - Back"
                  url={kycData?.docs?.find((d) => d.name.includes("Back"))?.url}
                >
                  <ImageIcon className="text-gray-300" size={40} />
                </DocumentBox>

                <DocumentBox
                  title="Selfie with ID"
                  url={
                    kycData?.docs?.find((d) => d.name.includes("Selfie"))?.url
                  }
                >
                  <User className="text-gray-300" size={40} />
                </DocumentBox>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end items-center gap-3 border-t bg-gray-50 px-6 py-4">
          <button
            disabled={processing}
            onClick={() => updateKycStatus("rejected")}
            className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-xs font-bold uppercase text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Reject
          </button>

          <button
            disabled={processing}
            onClick={() => updateKycStatus("not_submitted")} // Sending back to 'not_submitted' triggers re-upload for user
            className="rounded-lg border border-orange-200 bg-white px-5 py-2.5 text-xs font-bold uppercase text-orange-600 hover:bg-orange-50 disabled:opacity-50"
          >
            Request Resubmission
          </button>

          <button
            disabled={processing}
            onClick={() => updateKycStatus("approved")}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-bold uppercase text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100 disabled:opacity-50"
          >
            {processing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <CheckCircle size={16} />
            )}
            Approve Verification
          </button>
        </div>
      </div>
    </div>
  );
};

/* HELPER COMPONENTS */

const Field = ({ label, value }) => (
  <div className="py-1">
    <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
      {label}
    </p>
    <p className="text-sm font-bold text-gray-700 truncate">{value || "N/A"}</p>
  </div>
);

const DocumentBox = ({ title, children, url }) => (
  <div className="mb-4">
    <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
      {title}
    </p>
    <div className="group relative flex h-48 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-teal-400">
      {url ? (
        <img
          src={url}
          alt={title}
          className="h-full w-full object-contain p-1 transition-transform group-hover:scale-105"
          onClick={() => window.open(url, "_blank")}
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          {children}
          <span className="text-[10px] font-bold text-gray-400">
            No Image Uploaded
          </span>
        </div>
      )}
      {url && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 cursor-zoom-in">
          <span className="text-white text-xs font-bold uppercase">
            View Original
          </span>
        </div>
      )}
    </div>
  </div>
);

export default KycReview;
