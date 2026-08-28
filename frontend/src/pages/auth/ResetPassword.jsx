import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Password reset successfully.");

    navigate("/login");
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

        <Button type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;