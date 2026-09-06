import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import authService from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setError("This password reset link is missing or invalid.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await authService.resetPassword(token, password);
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to reset your password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Reset Password</h2>

      <Alert
        message={error}
        type="error"
      />

      <form onSubmit={handleSubmit}>
        <Input
          label="New Password"
          name="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;