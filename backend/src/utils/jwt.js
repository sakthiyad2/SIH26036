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

const generatePasswordResetToken = (user) => {
  if (!user) {
    throw new Error("User is required to generate a reset token");
  }

  return jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      purpose: "PASSWORD_RESET"
    },
    config.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const verifyPasswordResetToken = (token) => {
  const payload = verifyToken(token);

  if (payload.purpose !== "PASSWORD_RESET") {
    throw new Error("Invalid password reset token");
  }

  return payload;
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  generateToken,
  verifyToken,
  generatePasswordResetToken,
  verifyPasswordResetToken
};