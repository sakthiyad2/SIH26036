// Inspection model placeholder.
const { pool } = require("../config/database");

const Inspection = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO inspections
       (application_id, inspector_id, assigned_by_official_id,
        scheduled_date, scheduled_time, inspection_location,
        status, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.application_id,
        data.inspector_id,
        data.assigned_by_official_id || null,
        data.scheduled_date,
        data.scheduled_time || null,
        data.inspection_location || null,
        data.status || "SCHEDULED",
        data.remarks || null
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT ins.*,
              u.full_name AS inspector_name,
              a.application_number,
              i.serial_number
       FROM inspections ins
       LEFT JOIN inspectors insp
         ON ins.inspector_id = insp.inspector_id
       LEFT JOIN users u
         ON insp.user_id = u.user_id
       LEFT JOIN applications a
         ON ins.application_id = a.application_id
       LEFT JOIN instruments i
         ON a.instrument_id = i.instrument_id
       WHERE ins.inspection_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByInspector(inspectorId) {
    const [rows] = await pool.execute(
      `SELECT ins.*,
              a.application_number,
              i.instrument_name,
              i.serial_number
       FROM inspections ins
       LEFT JOIN applications a
         ON ins.application_id = a.application_id
       LEFT JOIN instruments i
         ON a.instrument_id = i.instrument_id
       WHERE ins.inspector_id = ?
      ORDER BY ins.inspection_id DESC`,
      [inspectorId]
    );

    return rows;
  },

  async findPending() {
    const [rows] = await pool.execute(
      `SELECT ins.*,
              a.application_number,
              i.instrument_name,
              i.serial_number
       FROM inspections ins
       LEFT JOIN applications a
         ON ins.application_id = a.application_id
       LEFT JOIN instruments i
         ON a.instrument_id = i.instrument_id
       WHERE ins.status IN ('SCHEDULED', 'PENDING')
       ORDER BY ins.scheduled_date`
    );

    return rows;
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT ins.*,
              a.application_number
       FROM inspections ins
       LEFT JOIN applications a
         ON ins.application_id = a.application_id
      ORDER BY ins.inspection_id DESC`
    );

    return rows;
  },

  async updateStatus(id, status, remarks = null) {
    await pool.execute(
      `UPDATE inspections
       SET status = ?, remarks = ?
      WHERE inspection_id = ?`,
      [status, remarks, id]
    );

    return this.findById(id);
  }
};

module.exports = Inspection;