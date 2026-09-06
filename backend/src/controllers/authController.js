const {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword
} = require("../services/authService");

// ============================================================
// REGISTER
// ============================================================

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required"
      });
    }
    const result = await registerUser({
      name,
      email,
      password,
      role: "OWNER",
      phone,
      address
    });

    return res.status(201).json({
      success: true,
      message:
        "Registration successful",
      data: result
    });

  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const message = await requestPasswordReset(req.body.email);
    return res.json({ success: true, message });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    await resetPassword(req.body.token, req.body.password);
    return res.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset request"
    });
  }
};

// ============================================================
// LOGIN
// ============================================================

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required"
      });
    }

    const result =
      await loginUser(
        email,
        password
      );

    return res.status(200).json({
      success: true,
      message:
        "Login successful",
      data: result
    });

  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        error.message
    });
  }
};

// ============================================================
// CURRENT USER
// ============================================================

const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });

  } catch (error) {
    console.error(
      "GET ME ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to get current user"
    });
  }
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword: resetPasswordController
};