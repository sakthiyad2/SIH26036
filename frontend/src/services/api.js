import axios from "axios";


// ============================================================
// AXIOS INSTANCE
// ============================================================

const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "/api",

  headers: {
    "Content-Type": "application/json"
  },

  timeout: 10000
});


// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(

  (response) => {

    return response;
  },

  (error) => {

    if (
      error.response &&
      error.response.status === 401
    ) {

      console.warn(
        "Authentication expired or invalid."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("currentUser");

      // Don't force redirect here.
      // AuthContext will handle authentication state.
    }

    return Promise.reject(
      error
    );
  }
);


// ============================================================
// EXPORT
// ============================================================

export default api;