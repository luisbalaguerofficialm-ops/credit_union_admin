import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, UserCircle2, Menu } from "lucide-react";

const Topbar = ({ setMobileOpen }) => {
  const location = useLocation();

  // Map routes to page names
  const pageNames = {
    "/admin/dashboard": "Dashboard",
    "/admin/user-management": "User Management",
    "/admin/account-management": "Account Management",
    "/admin/kyc-verification": "KYC Verification",
    "/admin/transaction-monitor": "Transaction Monitor",
    "/admin/disputes-reversals": "Disputes & Reversals",
    "/admin/fees": "Fees",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
    "/admin/roles-permission": "Roles & Permissions",
    "/admin/add-funds": "Add Funds",
    "/admin/create-admin": "Create Admin",
  };

  // Get current page name from route
  const currentPage = pageNames[location.pathname] || "";

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white flex items-center justify-between px-6 z-50 shadow-sm border-b border-gray-200">
      {/* Mobile Hamburger + Page Title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Current Page Indicator */}
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-500">Current Page</p>
          <p className="text-lg font-semibold text-gray-900">{currentPage}</p>
        </div>

        {/* Mobile: Just show page name */}
        <div className="md:hidden">
          <p className="text-base font-semibold text-gray-900">{currentPage}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <UserCircle2 className="w-6 h-6 text-gray-600 hover:text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
