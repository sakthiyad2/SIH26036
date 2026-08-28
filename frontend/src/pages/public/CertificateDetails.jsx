import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CertificateViewer from "../../components/certificates/CertificateViewer";
import QRCode from "../../components/certificates/QRCode";
import Alert from "../../components/common/Alert";
import certificateService from "../../services/certificateService";

function CertificateDetails() {
  const { certificateNumber } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        const response = await certificateService.verify(
          certificateNumber
        );
        const result = response.data;

        if (!result.valid || !result.certificate) {
          setError(result.message || "Certificate is invalid.");
          return;
        }

        setCertificate(result.certificate);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
          "Unable to verify certificate."
        );
      } finally {
        setLoading(false);
      }
    };

    if (certificateNumber) {
      loadCertificate();
    } else {
      setError("Certificate number is missing.");
      setLoading(false);
    }
  }, [certificateNumber]);

  const verificationUrl = `${
    import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin
  }/certificate/${encodeURIComponent(certificateNumber || "")}`;

  return (
    <div className="public-page">
      {loading && <p>Verifying certificate...</p>}
      {!loading && error && <Alert message={error} type="error" />}

      {!loading && certificate && (
        <section className="certificate-section">
          <CertificateViewer certificate={certificate} />

          <div className="certificate-qr">
            <h3>Scan to Verify</h3>
            <QRCode value={verificationUrl} />
          </div>
        </section>
      )}
    </div>
  );
}

export default CertificateDetails;