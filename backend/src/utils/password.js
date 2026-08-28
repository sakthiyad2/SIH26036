const bcrypt = require("bcryptjs");

// ============================================================
// HASH PASSWORD
// ============================================================

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


// ============================================================
// COMPARE PASSWORD
// ============================================================

const comparePassword = async (
  password,
  hashedPassword
) => {
  return await bcrypt.compare(
    password,
    hashedPassword
  );
};


module.exports = {
  hashPassword,
  comparePassword
};