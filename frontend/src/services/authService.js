import api from "./api";

const authService = {
  // ============================================================
  // LOGIN
  // ============================================================

  login: async (credentials) => {
    return api.post("/auth/login", {
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
    });
  },

  // ============================================================
  // REGISTER
  // ============================================================

  register: async (userData) => {
    return api.post("/auth/register", userData);
  },

  // ============================================================
  // LOGOUT
  // ============================================================

  logout: async () => {
    return api.post("/auth/logout");
  },

  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  forgotPassword: async (email) => {
    return api.post("/auth/forgot-password", {
      email: email.trim().toLowerCase(),
    });
  },

  // ============================================================
  // RESET PASSWORD
  // ============================================================

  resetPassword: async (token, password) => {
    return api.post("/auth/reset-password", {
      token,
      password,
    });
  },

  // ============================================================
  // CURRENT USER
  // ============================================================

  getCurrentUser: async () => {
    return api.get("/auth/me");
  },
};

export default authService;