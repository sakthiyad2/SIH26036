import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CertificateCard from "../../components/certificates/CertificateCard";
import certificateService from "../../services/certificateService";
import "./MyCertificates.css";

function MyCertificates() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await certificateService.getMyCertificates();
        setCertificates(response.data?.data || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
          "Unable to load your certificates."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  return (
    <div className="page owner-certificates-page">
      <div className="page-header">
        <h1>My Certificates</h1>

        <p>
          View your instrument verification
          certificates.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card-grid">
        {loading && <p>Loading certificates...</p>}

        {!loading && !error && certificates.length === 0 && (
          <p>No certificates have been issued yet.</p>
        )}

        {!loading && certificates.map((certificate) => (
          <CertificateCard
            key={certificate.certificate_id}
            certificate={certificate}
            onView={() =>
              navigate(
                `/certificate/${encodeURIComponent(
                  certificate.certificate_number ||
                  certificate.certificateNumber
                )}`
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default MyCertificates;