import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import "./VerifyCertificate.css";

function VerifyCertificate() {
  const navigate = useNavigate();

  const [certificateNumber, setCertificateNumber] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!certificateNumber.trim()) {
      return;
    }

    navigate(
      `/certificate/${certificateNumber}`
    );
  };

  return (
    <div className="public-page">
      <section className="verification-section">
        <h1>Verify Certificate</h1>

        <p>
          Enter the certificate number to check
          its authenticity.
        </p>

        <form
          className="verification-form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label>
              Certificate Number
            </label>

            <input
              type="text"
              value={certificateNumber}
              onChange={(event) =>
                setCertificateNumber(
                  event.target.value
                )
              }
              placeholder="Example: CERT-2026-0001"
              required
            />
          </div>

          <Button type="submit">
            Verify Certificate
          </Button>
        </form>
      </section>
    </div>
  );
}

export default VerifyCertificate;