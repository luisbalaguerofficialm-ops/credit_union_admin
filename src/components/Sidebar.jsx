import React, { useState } from "react";
import {
  LayoutGrid,
  FileText,
  Users,
  UserCheck,
  UserCircle2,
  Monitor,
  Repeat,
  DollarSign,
  Settings,
  KeyRound,
  Bell,
  MessageCircle,
  Ticket,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image/Credit-Union-logo-PMS (1).webp";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.role === "SuperAdmin";

  const toggle = (section) =>
    setOpenSection(openSection === section ? null : section);

  const NavButton = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center w-full px-3 py-2 rounded-lg ${
        location.pathname.startsWith(to)
          ? "bg-[#006A91] text-white"
          : "hover:bg-gray-100 text-gray-700"
      }`}
      onClick={() => setMobileOpen(false)}
    >
      <Icon className="w-4 h-4 mr-3" />
      {children}
    </Link>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-7 left-0 w-64 h-screen bg-gray-100 shadow-sm p-4 flex flex-col overflow-y-auto z-50 transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <img src={logo} alt="Logo" className="h-12 object-contain" />
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 text-gray-700">
          {/* Overview */}
          <div>
            <p className="text-xs text-black mb-2">OVERVIEW</p>
            <NavButton to="/admin/dashboard" icon={LayoutGrid}>
              Dashboard
            </NavButton>
            <NavButton to="/admin/reports" icon={FileText}>
              Reports
            </NavButton>
          </div>

          {/* User */}
          <div>
            <div
              onClick={() => toggle("user")}
              className="flex items-center justify-between cursor-pointer mb-1"
            >
              <p className="text-xs text-black">USER</p>
              {openSection === "user" ? <ChevronDown /> : <ChevronRight />}
            </div>

            {openSection === "user" && (
              <div className="space-y-1 mt-2 ml-3">
                <NavButton to="/admin/users" icon={Users}>
                  User Management
                </NavButton>
                <NavButton to="/admin/kyc" icon={UserCheck}>
                  KYC Verification
                </NavButton>
                <NavButton to="/admin/accounts" icon={UserCircle2}>
                  Account Management
                </NavButton>
              </div>
            )}
          </div>

          {/* Transactions */}
          <div>
            <div
              onClick={() => toggle("transactions")}
              className="flex items-center justify-between cursor-pointer mb-1"
            >
              <p className="text-xs text-black">TRANSACTIONS</p>
              {openSection === "transactions" ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
            </div>

            {openSection === "transactions" && (
              <div className="space-y-1 mt-2 ml-3">
                <NavButton to="/admin/transactions" icon={Monitor}>
                  Transaction Monitor
                </NavButton>
                <NavButton to="/admin/disputes" icon={Repeat}>
                  Disputes & Reversal
                </NavButton>
                <NavButton to="/admin/fees" icon={DollarSign}>
                  Fees
                </NavButton>
                <NavButton to="/admin/addfunds" icon={DollarSign}>
                  Add Funds
                </NavButton>
              </div>
            )}
          </div>

          {/* Settings */}
          <div>
            <div
              onClick={() => toggle("settings")}
              className="flex items-center justify-between cursor-pointer mb-1"
            >
              <p className="text-xs text-black">SETTINGS</p>
              {openSection === "settings" ? <ChevronDown /> : <ChevronRight />}
            </div>

            {openSection === "settings" && (
              <div className="space-y-1 mt-2 ml-3">
                <NavButton to="/admin/settings" icon={Settings}>
                  General Settings
                </NavButton>

                {/* 🔒 SUPER ADMIN ONLY */}
                {isSuperAdmin && (
                  <>
                    <NavButton to="/admin/roles" icon={KeyRound}>
                      Roles & Permissions
                    </NavButton>
                    <NavButton to="/admin/create-admin" icon={UserCircle2}>
                      Create Admin
                    </NavButton>
                  </>
                )}

                <NavButton to="/admin/notifications" icon={Bell}>
                  Notifications
                </NavButton>
              </div>
            )}
          </div>

          {/* Support */}
          <div>
            <p className="text-xs text-black mb-2">SUPPORTS</p>
            <NavButton to="/admin/livechat" icon={MessageCircle}>
              Live Chats
            </NavButton>
          </div>
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-6">
          <button className="flex items-center w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
