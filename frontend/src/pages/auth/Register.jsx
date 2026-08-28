import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* =========================================================
     HANDLE INPUT CHANGE
     ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================================================
     HANDLE REGISTER
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* =======================================================
       VALIDATION
       ======================================================= */

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /* =======================================================
       IMPORTANT SECURITY CHECK

       Public registration is NOT allowed to create ADMIN.

      The frontend only allows OWNER, OFFICIAL or INSPECTOR.
       The backend MUST also perform this validation.
       ======================================================= */

    if (!["OWNER", "OFFICIAL", "INSPECTOR"].includes(formData.role)) {
      setError("Invalid registration role.");
      return;
    }

    try {
      setLoading(true);

      /* =====================================================
         SEND DATA TO BACKEND
         ===================================================== */

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,

            // IMPORTANT:
            // Send MySQL ENUM-compatible value
            role: formData.role,
          }),
        }
      );

      /* =====================================================
         READ RESPONSE SAFELY
         ===================================================== */

      const contentType = response.headers.get("content-type");

      let data;

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "Non-JSON response from server:",
          text
        );

        throw new Error(
          "Invalid response from server. Please check the backend."
        );
      }

      /* =====================================================
         HANDLE BACKEND ERROR
         ===================================================== */

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Registration failed."
        );
      }

      /* =====================================================
         SUCCESS
         ===================================================== */

      setSuccess(
        data.message ||
          "Registration successful! Redirecting to login..."
      );

      /* Clear form */

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      /* Redirect to login */

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err instanceof TypeError && err.message === "Failed to fetch"
          ? "Unable to connect to the server. Start the backend with: npm start"
          : err.message || "Unable to register."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* =====================================================
          REGISTER CARD
          ===================================================== */}

      <div className="register-container">

        <div className="register-card">

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="register-header">

            <div className="register-logo">
              ⚖
            </div>

            <h1 className="register-title">
              Create Account
            </h1>

            <p className="register-subtitle">
              Register with e-Maap to manage and verify
              weighing instruments digitally.
            </p>

          </div>


          {/* =================================================
              ERROR MESSAGE
              ================================================= */}

          {error && (
            <div className="register-error-box">

              <span className="message-icon">
                ⚠
              </span>

              <span>
                {error}
              </span>

            </div>
          )}


          {/* =================================================
              SUCCESS MESSAGE
              ================================================= */}

          {success && (
            <div className="register-success-box">

              <span className="message-icon">
                ✓
              </span>

              <span>
                {success}
              </span>

            </div>
          )}


          {/* =================================================
              FORM
              ================================================= */}

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {/* =================================================
                FULL NAME
                ================================================= */}

            <div className="form-group">

              <label
                htmlFor="name"
                className="form-label"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />

            </div>


            {/* =================================================
                EMAIL
                ================================================= */}

            <div className="form-group">

              <label
                htmlFor="email"
                className="form-label"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />

            </div>


            {/* =================================================
                REGISTER AS
                ================================================= */}

            <div className="form-group">

              <label
                htmlFor="role"
                className="form-label"
              >
                Register as
              </label>

              <div className="select-wrapper">

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`form-select ${
                    formData.role === ""
                      ? "select-placeholder"
                      : "select-selected"
                  }`}
                  required
                >

                  <option
                    value=""
                    disabled
                  >
                    Register as
                  </option>

                  {/* PUBLIC USER */}

                  <option value="OWNER">
                    Instrument Owner
                  </option>

                  {/* GOVERNMENT OFFICIAL */}

                  <option value="OFFICIAL">
                    Government Official
                  </option>

                  <option value="INSPECTOR">
                    Inspector
                  </option>

                </select>

              </div>

              <span className="form-help">
                Admin accounts can only be created or approved
                by an authorized administrator.
              </span>

            </div>


            {/* =================================================
                PASSWORD
                ================================================= */}

            <div className="form-group">

              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

              <span className="form-help">
                Password must contain at least 6 characters.
              </span>

            </div>


            {/* =================================================
                CONFIRM PASSWORD
                ================================================= */}

            <div className="form-group">

              <label
                htmlFor="confirmPassword"
                className="form-label"
              >
                Confirm Password
              </label>

              <div className="password-wrapper">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>


            {/* =================================================
                SUBMIT BUTTON
                ================================================= */}

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="register-loading"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}

            </button>

          </form>


          {/* =================================================
              LOGIN LINK
              ================================================= */}

          <div className="register-login">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </div>


          {/* =================================================
              TERMS
              ================================================= */}

          <div className="register-terms">

            By creating an account, you agree to use
            the e-Maap platform responsibly.

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;