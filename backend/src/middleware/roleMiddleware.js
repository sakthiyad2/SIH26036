// ============================================================
// ROLE AUTHORIZATION MIDDLEWARE
// ============================================================

const authorizeRoles = (...allowedRoles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const userRole = String(
      req.user.role || ""
    ).toUpperCase();

    const roles = allowedRoles.map(
      (role) =>
        String(role).toUpperCase()
    );

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to access this resource"
      });
    }

    next();
  };
};

module.exports = authorizeRoles;