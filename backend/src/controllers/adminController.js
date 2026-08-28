// Admin controller placeholder.
const {
  getDashboardStatistics,
  getApplicationReport,
  getCertificateReport
} = require("../services/reportService");

const User = require("../models/User");
const Instrument =
  require("../models/Instrument");
const Certificate =
  require("../models/Certificate");
const AuditLog =
  require("../models/AuditLog");

const getDashboard = async (
  req,
  res,
  next
) => {
  try {
    const statistics =
      await getDashboardStatistics();

    res.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    next(error);
  }
};

const getReports = async (
  req,
  res,
  next
) => {
  try {
    const [
      applications,
      certificates
    ] = await Promise.all([
      getApplicationReport(),
      getCertificateReport()
    ]);

    res.json({
      success: true,
      data: {
        applications,
        certificates
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users = await User.findAll();

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

const getInstruments = async (
  req,
  res,
  next
) => {
  try {
    const instruments =
      await Instrument.findAll();

    res.json({
      success: true,
      data: instruments
    });
  } catch (error) {
    next(error);
  }
};

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

const getAuditLogs = async (
  req,
  res,
  next
) => {
  try {
    const logs =
      await AuditLog.findAll();

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getReports,
  getUsers,
  getInstruments,
  getCertificates,
  getAuditLogs
};