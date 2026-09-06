import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import authService from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await authService.forgotPassword(email);
      setMessage(response.data?.message || "Reset link requested.");
    } catch (requestError) {
      setMessage("");
      setError(
        requestError.response?.data?.message ||
        "Unable to request a password reset."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Forgot Password</h2>

      <p>
        Enter your registered email address.
      </p>

      <Alert
        message={message}
        type="success"
      />

      <Alert
        message={error}
        type="error"
      />

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Enter your email"
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <Link to="/login">
        Back to Login
      </Link>
    </div>
  );
}

export default ForgotPassword;