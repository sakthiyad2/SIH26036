const { verifyToken } = require("../utils/jwt");

// ============================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
    }

    const token = authHeader
      .substring(7)
      .trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing"
      });
    }

    const decoded = verifyToken(token);

    /*
      JWT may contain:
      {
        user_id,
        email,
        role
      }
    */

    req.user = decoded;

    next();

  } catch (error) {
    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

// ============================================================
// ROLE AUTHORIZATION
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

// ============================================================
// ROLE HELPERS
// ============================================================

const inspectorOnly =
  authorizeRoles("INSPECTOR");

const officialOnly =
  authorizeRoles("OFFICIAL");

const adminOnly =
  authorizeRoles("ADMIN");

const ownerOnly =
  authorizeRoles("OWNER");

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  authenticate,
  authorizeRoles,
  inspectorOnly,
  officialOnly,
  adminOnly,
  ownerOnly
};