// Audit log model placeholder.
const { pool } = require("../config/database");

const AuditLog = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO audit_logs
       (user_id, action, entity_type,
        entity_id, details)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.user_id || null,
        data.action,
        data.entity_type,
        data.entity_id || null,
        data.details || null
      ]
    );

    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT al.*,
              u.full_name AS user_name
       FROM audit_logs al
       LEFT JOIN users u
         ON al.user_id = u.user_id
       ORDER BY al.audit_id DESC`
    );

    return rows;
  }
};

module.exports = AuditLog;