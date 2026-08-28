// Verification service placeholder.
const Instrument = require("../models/Instrument");
const Certificate = require("../models/Certificate");

const verifyInstrument = async (serialNumber) => {
  const instrument =
    await Instrument.findBySerialNumber(
      serialNumber
    );

  if (!instrument) {
    return {
      found: false,
      message: "Instrument not found"
    };
  }

  const certificates =
    await Certificate.findByApplication(
      instrument.id
    );

  return {
    found: true,
    instrument,
    certificates
  };
};

const verifyCertificateNumber = async (
  certificateNumber
) => {
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
  const expiry =
    certificate.valid_until
      ? new Date(certificate.valid_until)
      : null;

  const valid =
    certificate.status === "VALID" &&
    (!expiry || expiry >= today);

  return {
    valid,
    message: valid
      ? "Certificate verified successfully"
      : "Certificate is expired or invalid",
    certificate
  };
};

module.exports = {
  verifyInstrument,
  verifyCertificateNumber
};