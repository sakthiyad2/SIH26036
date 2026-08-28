const jwt = require("jsonwebtoken");

const config =
  require("../config/config");

// ============================================================
// GENERATE JWT
// ============================================================

const generateToken = (user) => {

  if (!user) {
    throw new Error(
      "User is required to generate token"
    );
  }

  const payload = {
    user_id: user.user_id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(
    payload,
    config.JWT_SECRET,
    {
      expiresIn:
        config.JWT_EXPIRES_IN || "7d"
    }
  );
};

// ============================================================
// VERIFY JWT
// ============================================================

const verifyToken = (token) => {

  if (!token) {
    throw new Error(
      "Token is required"
    );
  }

  return jwt.verify(
    token,
    config.JWT_SECRET
  );
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  generateToken,
  verifyToken
};