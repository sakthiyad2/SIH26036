import CertificateCard from "../../components/certificates/CertificateCard";

function Certificates() {
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
    {
      certificate_id: 2,
      certificate_number:
        "CERT-2026-0002",
      instrument_name: "Platform Scale",
      issue_date: "2026-07-01",
      expiry_date: "2027-07-01",
      certificate_status: "VALID",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Certificates</h1>

        <p>
          Manage issued verification certificates.
        </p>
      </div>

      <div className="card-grid">
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.certificate_id}
            certificate={certificate}
          />
        ))}
      </div>
    </div>
  );
}

export default Certificates;