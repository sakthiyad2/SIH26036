import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      return;
    }

    setMessage(
      "If this email is registered, a password reset link will be sent."
    );
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

        <Button type="submit">
          Send Reset Link
        </Button>
      </form>

      <Link to="/login">
        Back to Login
      </Link>
    </div>
  );
}

export default ForgotPassword;