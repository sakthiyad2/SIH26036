// Report service placeholder.
const { pool } = require("../config/database");

const getDashboardStatistics = async () => {
  const [[users]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM users`
  );

  const [[instruments]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM instruments`
  );

  const [[applications]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM applications`
  );

  const [[inspections]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM inspections`
  );

  const [[certificates]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM certificates`
  );

  return {
    users: users.total,
    instruments: instruments.total,
    applications: applications.total,
    inspections: inspections.total,
    certificates: certificates.total
  };
};

const getApplicationReport = async () => {
  const [rows] = await pool.execute(
    `SELECT status, COUNT(*) AS total
     FROM applications
     GROUP BY status`
  );

  return rows;
};

const getCertificateReport = async () => {
  const [rows] = await pool.execute(
    `SELECT status, COUNT(*) AS total
     FROM certificates
     GROUP BY status`
  );

  return rows;
};

module.exports = {
  getDashboardStatistics,
  getApplicationReport,
  getCertificateReport
};