import { useNavigate } from "react-router-dom";
import CertificateCard from "../../components/certificates/CertificateCard";
import "./MyCertificates.css";

function MyCertificates() {
  const navigate = useNavigate();

  const certificates = [
    {
      certificate_id: 1,
      certificate_number:
        "CERT-2026-0001",
      instrument_name:
        "Electronic Weighing Scale",
      issue_date: "2026-08-01",
      expiry_date: "2027-08-01",
      certificate_status: "VALID",
    },
  ];

  return (
    <div className="page owner-certificates-page">
      <div className="page-header">
        <h1>My Certificates</h1>

        <p>
          View your instrument verification
          certificates.
        </p>
      </div>

      <div className="card-grid">
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.certificate_id}
            certificate={certificate}
            onView={() =>
              navigate(
                `/owner/certificates/${certificate.certificate_id}`
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default MyCertificates;