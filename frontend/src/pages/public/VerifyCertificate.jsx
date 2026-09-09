import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import "./VerifyCertificate.css";

function VerifyCertificate() {
  const navigate = useNavigate();

  const [certificateNumber, setCertificateNumber] =
    useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!certificateNumber.trim()) {
      return;
    }

    navigate(
      `/certificate/${encodeURIComponent(certificateNumber.trim())}`
    );
  };

  const handleSerialSubmit = (event) => {
    event.preventDefault();

    if (!serialNumber.trim()) {
      return;
    }

    navigate(
      `/certificate/serial/${encodeURIComponent(serialNumber.trim())}`
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

        <form
          className="verification-form"
          onSubmit={handleSerialSubmit}
        >
          <div className="input-group">
            <label>
              Instrument Serial Number
            </label>

            <input
              type="text"
              value={serialNumber}
              onChange={(event) =>
                setSerialNumber(event.target.value)
              }
              placeholder="Example: DEMO-SCALE-001"
              required
            />
          </div>

          <Button type="submit">
            Find Certificate
          </Button>
        </form>
      </section>
    </div>
  );
}

export default VerifyCertificate;