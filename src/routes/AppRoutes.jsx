import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";

// Guards
import RequireSuperAdmin from "../guards/RequireSuperAdmin";
import PublicRegisterGuard from "../guards/PublicRegisterGuard";
import RootGuard from "../guards/RootGuard";

// Pages
import AdminDashboard from "../pages/AdminDashboard";
import Reports from "../pages/Reports";
import UserManagement from "../pages/UserManagement";
import KYCVerification from "../pages/KYCVerification";

import Fees from "../pages/Fees";
import TransactionMonitor from "../pages/TransactionMonitor";
// import DisputesReversals from "../pages/DisputesReversals";
import Settings from "../pages/Settings";
import RolesPermission from "../pages/RolesPermission";
import AddFunds from "../pages/AddFunds";
import CreateAdmin from "../pages/CreateAdmin";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Components
import SendNotification from "../components/model/SendNotification";
import UserProfile from "../components/model/UserProfile";
import LiveChats from "../components/LiveChats";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== ROOT ROUTE - Checks Super Admin Status ===== */}
      <Route
        path="/"
        element={
          <RootGuard>
            <Register />
          </RootGuard>
        }
      />

      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={
          <PublicRegisterGuard>
            <Register />
          </PublicRegisterGuard>
        }
      />

      <Route path="/userprofile" element={<UserProfile />} />

      {/* ===== DASHBOARD ROUTES ===== */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/reports" element={<Reports />} />
        <Route path="admin/users" element={<UserManagement />} />
        <Route path="admin/kyc" element={<KYCVerification />} />
        <Route path="admin/fees" element={<Fees />} />
        <Route path="admin/notifications" element={<SendNotification />} />
        <Route
          path="admin/settings"
          element={
            <RequireSuperAdmin>
              <Settings />
            </RequireSuperAdmin>
          }
        />
        <Route path="admin/livechat" element={<LiveChats />} />
        {/* <Route path="admin/disputes" element={<DisputesReversals />} /> */}
        <Route path="admin/addfunds" element={<AddFunds />} />

        {/*SUPER ADMIN ONLY */}
        <Route
          path="admin/roles"
          element={
            <RequireSuperAdmin>
              <RolesPermission />
            </RequireSuperAdmin>
          }
        />
        <Route
          path="admin/transactions"
          element={
            <RequireSuperAdmin>
              <TransactionMonitor />
            </RequireSuperAdmin>
          }
        />

        <Route
          path="admin/create-admin"
          element={
            <RequireSuperAdmin>
              <CreateAdmin />
            </RequireSuperAdmin>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
