// Certificate service placeholder.
const Certificate = require("../models/Certificate");
const Application = require("../models/Application");
const generateCertificateNumber =
  require("../utils/generateCertificateNumber");

const createCertificate = async (data) => {
  const application = await Application.findById(
    data.application_id
  );

  if (!application) {
    throw new Error("Application not found");
  }

  const existing = await Certificate.findByApplication(
    data.application_id
  );

  if (existing.length > 0) {
    throw new Error(
      "Certificate already exists for this application"
    );
  }

  const certificateNumber =
    generateCertificateNumber();

  const publicAppUrl =
    process.env.PUBLIC_APP_URL ||
    process.env.FRONTEND_URL ||
    "http://localhost:5173";

  const certificate = await Certificate.create({
    ...data,
    certificate_number: certificateNumber,
    qr_code_data:
      `${publicAppUrl}/certificate/${encodeURIComponent(
        certificateNumber
      )}`
  });

  await Application.updateStatus(
    data.application_id,
    "CERTIFIED"
  );

  return certificate;
};

const verifyCertificate = async (certificateNumber) => {
  const certificate =
    await Certificate.findByNumber(
      certificateNumber
    );

  if (!certificate) {
    return {
      valid: false,
      message: "Certificate not found"
    };
  }

  const today = new Date();
  const validUntil =
    certificate.valid_until
      ? new Date(certificate.valid_until)
      : null;

  if (
    !["VALID", "ACTIVE"].includes(
      certificate.status ||
      certificate.certificate_status
    ) ||
    (validUntil && validUntil < today)
  ) {
    return {
      valid: false,
      message: "Certificate is expired or invalid",
      certificate
    };
  }

  return {
    valid: true,
    message: "Certificate is valid",
    certificate
  };
};

module.exports = {
  createCertificate,
  verifyCertificate
};