import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * RootGuard Component
 * Checks if super admin exists:
 * - If no super admin: render children (Register page)
 * - If super admin exists: redirect to login
 */
const RootGuard = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        const res = await fetch(
          "https://admin-admin-credit.onrender.com/api/auth/super-admin-exists",
        );
        const data = await res.json();

        if (data.success && data.exists) {
          // Super admin exists, redirect to login
          navigate("/login", { replace: true });
        } else {
          // No super admin, show register page
          setShowChildren(true);
        }
      } catch (err) {
        console.error("Failed to check super admin status:", err);
        // On error, default to showing register
        setShowChildren(true);
      } finally {
        setLoading(false);
      }
    };

    checkSuperAdmin();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600 mx-auto" />
          <p className="text-gray-600 text-2xl font-medium">
            loading please wait...
          </p>
        </div>
      </div>
    );
  }

  return showChildren ? children : null;
};

export default RootGuard;
