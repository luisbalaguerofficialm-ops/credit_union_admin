import { Navigate } from "react-router-dom";

const RequireSuperAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "SuperAdmin" ? (
    children
  ) : (
    <Navigate to="/admin/dashboard" replace />
  );
};

export default RequireSuperAdmin;
