function CertificateCard({
  certificate,
  onView,
}) {
  return (
    <div className="certificate-card">
      <div className="certificate-icon">
        📜
      </div>

      <h3>
        {certificate.certificate_number ||
          certificate.certificateNumber ||
          "Certificate"}
      </h3>

      <p>
        <strong>Instrument:</strong>{" "}
        {certificate.instrument_name ||
          certificate.instrumentName ||
          "N/A"}
      </p>

      <p>
        <strong>Issue Date:</strong>{" "}
        {certificate.issue_date ||
          certificate.issueDate ||
          "N/A"}
      </p>

      <p>
        <strong>Expiry Date:</strong>{" "}
        {certificate.expiry_date ||
          certificate.expiryDate ||
          "N/A"}
      </p>

      <span
        className={`status status-${String(
          certificate.certificate_status ||
            certificate.status ||
            "valid"
        ).toLowerCase()}`}
      >
        {certificate.certificate_status ||
          certificate.status ||
          "VALID"}
      </span>

      {onView && (
        <button
          type="button"
          onClick={() => onView(certificate)}
        >
          View Certificate
        </button>
      )}
    </div>
  );
}

export default CertificateCard;