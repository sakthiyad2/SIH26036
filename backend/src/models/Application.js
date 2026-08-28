// Application model placeholder.
const { pool } = require("../config/database");

const Application = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO applications
       (application_number, owner_id, instrument_id,
        application_type, application_date, status)
      VALUES (?, ?, ?, ?, CURDATE(), ?)`,
      [
        data.application_number,
        data.owner_id,
        data.instrument_id,
        data.application_type || "VERIFICATION",
        data.status || "SUBMITTED"
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT a.*,
              o.business_name,
              i.instrument_name,
              i.serial_number
       FROM applications a
      LEFT JOIN owners o ON a.owner_id = o.owner_id
      LEFT JOIN instruments i ON a.instrument_id = i.instrument_id
      WHERE a.application_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByNumber(number) {
    const [rows] = await pool.execute(
      `SELECT * FROM applications
       WHERE application_number = ?`,
      [number]
    );

    return rows[0];
  },

  async findByOwner(ownerId) {
    const [rows] = await pool.execute(
      `SELECT a.*,
              i.instrument_name,
              i.serial_number
       FROM applications a
      LEFT JOIN instruments i ON a.instrument_id = i.instrument_id
       WHERE a.owner_id = ?
      ORDER BY a.application_id DESC`,
      [ownerId]
    );

    return rows;
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT a.*,
              o.business_name,
              i.instrument_name,
              i.serial_number
       FROM applications a
      LEFT JOIN owners o ON a.owner_id = o.owner_id
      LEFT JOIN instruments i ON a.instrument_id = i.instrument_id
      ORDER BY a.application_id DESC`
    );

    return rows;
  },

  async updateStatus(id, status) {
    await pool.execute(
      `UPDATE applications
       SET status = ?
      WHERE application_id = ?`,
      [status, id]
    );

    return this.findById(id);
  }
};

module.exports = Application;