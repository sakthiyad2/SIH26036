const User = require("../models/User");
const {
  hashPassword,
  comparePassword
} = require("../utils/password");

const {
  generateToken
} = require("../utils/jwt");
const { pool } = require("../config/database");

// ============================================================
// NORMALIZE REGISTRATION ROLE
// ============================================================

const normalizeRegistrationRole = (role) => {
  const value =
    String(role || "")
      .trim()
      .toLowerCase();

  if (value === "owner") {
    return "OWNER";
  }

  if (value === "official") {
    return "OFFICIAL";
  }

  if (value === "inspector") {
    return "INSPECTOR";
  }

  // ADMIN should not be publicly registered
  if (value === "admin") {
    throw new Error(
      "Admin accounts cannot be created through public registration"
    );
  }

  throw new Error(
    "Invalid registration role"
  );
};

// ============================================================
// REGISTER USER
// ============================================================

const registerUser = async (data) => {
  if (
    !data.name ||
    !data.email ||
    !data.password ||
    !data.role
  ) {
    throw new Error(
      "Name, email, password and role are required"
    );
  }

  const email =
    data.email
      .trim()
      .toLowerCase();

  // ----------------------------------------------------------
  // CHECK EXISTING USER
  // ----------------------------------------------------------

  const existing =
    await User.findByEmail(email);

  if (existing) {
    throw new Error(
      "Email already registered"
    );
  }

  // ----------------------------------------------------------
  // NORMALIZE ROLE
  // ----------------------------------------------------------

  const role =
    normalizeRegistrationRole(
      data.role
    );

  // ----------------------------------------------------------
  // HASH PASSWORD
  // ----------------------------------------------------------

  const password_hash =
    await hashPassword(
      data.password
    );

  // ----------------------------------------------------------
  // CREATE USER
  // ----------------------------------------------------------

  const user =
    await User.create({
      full_name:
        data.name.trim(),

      email,

      password_hash,

      role,

      phone:
        data.phone || null,

      address:
        data.address || null,

      status: "ACTIVE"
    });

  if (!user) {
    throw new Error(
      "Failed to create user"
    );
  }

  if (role === "OFFICIAL") {
    await pool.execute(
      `INSERT INTO officials
       (user_id, employee_id, designation, status)
       VALUES (?, ?, ?, 'ACTIVE')`,
      [
        user.user_id,
        `OFF-${user.user_id}`,
        "Verification Officer"
      ]
    );
  }

  if (role === "INSPECTOR") {
    await pool.execute(
      `INSERT INTO inspectors
       (user_id, employee_id, designation, status)
       VALUES (?, ?, ?, 'ACTIVE')`,
      [
        user.user_id,
        `INS-${user.user_id}`,
        "Field Inspector"
      ]
    );
  }

  // ----------------------------------------------------------
  // RETURN USER + TOKEN
  // ----------------------------------------------------------

  return {
    user: {
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address
    },

    token:
      generateToken(user)
  };
};

// ============================================================
// LOGIN USER
// ============================================================

const loginUser = async (
  email,
  password
) => {

  if (!email || !password) {
    throw new Error(
      "Email and password are required"
    );
  }

  // ----------------------------------------------------------
  // NORMALIZE EMAIL
  // ----------------------------------------------------------

  const normalizedEmail =
    email
      .trim()
      .toLowerCase();

  // ----------------------------------------------------------
  // FIND USER
  // ----------------------------------------------------------

  const user =
    await User.findByEmail(
      normalizedEmail
    );

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  // ----------------------------------------------------------
  // CHECK STATUS
  // ----------------------------------------------------------

  if (
    user.status !== "ACTIVE"
  ) {
    throw new Error(
      `Account is ${String(
        user.status
      ).toLowerCase()}`
    );
  }

  // ----------------------------------------------------------
  // CHECK PASSWORD
  // ----------------------------------------------------------

  const passwordMatches =
    await comparePassword(
      password,
      user.password_hash
    );

  if (!passwordMatches) {
    throw new Error(
      "Invalid email or password"
    );
  }

  // ----------------------------------------------------------
  // GENERATE TOKEN
  // ----------------------------------------------------------

  const token =
    generateToken(user);

  // ----------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------

  return {
    user: {
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address
    },

    token
  };
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  registerUser,
  loginUser
};