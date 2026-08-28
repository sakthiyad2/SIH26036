import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RoleRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  // Wait until AuthContext finishes loading
  // saved login information from localStorage.
  if (loading) {
    return (
      <div className="page-loader">
        Loading...
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const normalizeRole = (role) => {
    return String(role || "")
      .trim()
      .toUpperCase()
      .replace(/[\s-]/g, "_");
  };

  const userRole = normalizeRole(user.role);

  const normalizedAllowedRoles = allowedRoles.map(
    (role) => normalizeRole(role)
  );

  console.log("RoleRoute user:", user);
  console.log("RoleRoute user role:", userRole);
  console.log(
    "RoleRoute allowed roles:",
    normalizedAllowedRoles
  );

  // User has no valid role
  if (!userRole) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User does not have permission
  if (!normalizedAllowedRoles.includes(userRole)) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Authorized
  return <Outlet />;
}

export default RoleRoute;