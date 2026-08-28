function CertificateViewer({
  certificate,
}) {
  if (!certificate) {
    return (
      <div>
        Certificate not found.
      </div>
    );
  }

  return (
    <div className="certificate-viewer">
      <div className="certificate-header">
        <h1>VERIFICATION CERTIFICATE</h1>

        <p>
          Online Verification System
        </p>
      </div>

      <div className="certificate-body">
        <div className="certificate-row">
          <span>Certificate Number</span>

          <strong>
            {certificate.certificate_number ||
              certificate.certificateNumber}
          </strong>
        </div>

        <div className="certificate-row">
          <span>Instrument</span>

          <strong>
            {certificate.instrument_name ||
              certificate.instrumentName ||
              "N/A"}
          </strong>
        </div>

        <div className="certificate-row">
          <span>Serial Number</span>

          <strong>
            {certificate.serial_number ||
              certificate.serialNumber ||
              "N/A"}
          </strong>
        </div>

        <div className="certificate-row">
          <span>Issue Date</span>

          <strong>
            {certificate.issue_date ||
              certificate.issued_date ||
              certificate.issueDate}
          </strong>
        </div>

        <div className="certificate-row">
          <span>Expiry Date</span>

          <strong>
            {certificate.expiry_date ||
              certificate.valid_until ||
              certificate.expiryDate}
          </strong>
        </div>

        <div className="certificate-row">
          <span>Verification Code</span>

          <strong>
            {certificate.verification_code ||
              certificate.verificationCode}
          </strong>
        </div>

        <div className="certificate-valid">
          ✓ CERTIFICATE VALID
        </div>
      </div>
    </div>
  );
}

export default CertificateViewer;