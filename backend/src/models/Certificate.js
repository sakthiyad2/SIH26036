const { pool } = require("../config/database");

const Certificate = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO certificates
       (application_id, instrument_id,
        certificate_number, issued_date,
          valid_until, certificate_status,
          certificate_file, qr_code_data)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.application_id,
        data.instrument_id,
        data.certificate_number,
        data.issued_date,
        data.valid_until,
        data.status || data.certificate_status || "ACTIVE",
        data.certificate_file || null,
        data.qr_code_data || null
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT c.*,
              c.certificate_status AS status,
              i.instrument_name,
              i.serial_number,
              i.manufacturer,
              i.model_number
       FROM certificates c
       LEFT JOIN instruments i
         ON c.instrument_id = i.instrument_id
       WHERE c.certificate_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByNumber(number) {
    const [rows] = await pool.execute(
      `SELECT c.*,
              i.instrument_name,
              i.serial_number,
              i.manufacturer,
              i.model_number
       FROM certificates c
       LEFT JOIN instruments i
         ON c.instrument_id = i.instrument_id
       WHERE c.certificate_number = ?`,
      [number]
    );

    return rows[0];
  },

  async findByApplication(applicationId) {
    const [rows] = await pool.execute(
      `SELECT * FROM certificates
       WHERE application_id = ?`,
      [applicationId]
    );

    return rows;
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT c.*,
              i.instrument_name,
              i.serial_number
       FROM certificates c
       LEFT JOIN instruments i
         ON c.instrument_id = i.instrument_id
       ORDER BY c.certificate_id DESC`
    );

    return rows;
  },

  async findByOwnerUserId(userId) {
    const [rows] = await pool.execute(
            `SELECT c.*,
              c.certificate_status AS status,
              i.instrument_name,
              i.serial_number,
              i.manufacturer,
              i.model_number
       FROM certificates c
       INNER JOIN applications a
         ON c.application_id = a.application_id
       INNER JOIN owners o
         ON a.owner_id = o.owner_id
       LEFT JOIN instruments i
         ON c.instrument_id = i.instrument_id
       WHERE o.user_id = ?
       ORDER BY c.certificate_id DESC`,
      [userId]
    );

    return rows;
  },

  async updateStatus(id, status) {
    await pool.execute(
      `UPDATE certificates
       SET status = ?
      WHERE certificate_id = ?`,
      [status, id]
    );

    return this.findById(id);
  }
};

module.exports = Certificate;