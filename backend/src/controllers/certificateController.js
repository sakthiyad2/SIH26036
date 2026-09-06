// Certificate controller placeholder.
const Certificate =
  require("../models/Certificate");
const fs = require("fs");
const path = require("path");

const {
  createCertificate,
  verifyCertificate
} = require("../services/certificateService");

const getCertificates = async (
  req,
  res,
  next
) => {
  try {
    const certificates =
      await Certificate.findAll();

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    next(error);
  }
};

const getMyCertificates = async (
  req,
  res,
  next
) => {
  try {
    const certificates =
      await Certificate.findByOwnerUserId(
        req.user.user_id
      );

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    next(error);
  }
};

const getCertificate = async (
  req,
  res,
  next
) => {
  try {
    const certificate =
      await Certificate.findById(
        req.params.id
      );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    res.json({
      success: true,
      data: certificate
    });
  } catch (error) {
    next(error);
  }
};

const create = async (
  req,
  res,
  next
) => {
  try {
    const certificate =
      await createCertificate(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Certificate issued",
      data: certificate
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await verifyCertificate(
        req.params.number
      );

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (
  req,
  res,
  next
) => {
  try {
    const certificate =
      await Certificate.updateStatus(
        req.params.id,
        req.body.status
      );

    res.json({
      success: true,
      message:
        "Certificate status updated",
      data: certificate
    });
  } catch (error) {
    next(error);
  }
};

const download = async (
  req,
  res,
  next
) => {
  try {
    const certificate =
      await Certificate.findById(
        req.params.id
      );

    if (!certificate || !certificate.certificate_file) {
      return res.status(404).json({
        success: false,
        message: "Certificate file not found"
      });
    }

    const storedPath = path.isAbsolute(
      certificate.certificate_file
    )
      ? certificate.certificate_file
      : path.resolve(
          process.cwd(),
          certificate.certificate_file
        );

    if (!fs.existsSync(storedPath)) {
      return res.status(404).json({
        success: false,
        message: "Certificate file not found"
      });
    }

    return res.download(storedPath);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertificates,
  getMyCertificates,
  getCertificate,
  download,
  create,
  verify,
  updateStatus
};