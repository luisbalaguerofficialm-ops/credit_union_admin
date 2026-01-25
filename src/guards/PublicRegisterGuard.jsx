import { Navigate } from "react-router-dom";

const PublicRegisterGuard = ({ children }) => {
  const superAdminExists = localStorage.getItem("superAdminExists") === "true";

  return superAdminExists ? <Navigate to="/login" replace /> : children;
};

export default PublicRegisterGuard;
