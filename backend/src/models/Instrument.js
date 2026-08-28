const { pool } = require("../config/database");

const Instrument = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO instruments
      (owner_id, instrument_type_id, instrument_name, serial_number,
       description, installation_location, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        data.owner_id,
        data.instrument_type_id,
        data.instrument_name,
        data.serial_number,
        data.description || "",
        data.location || "",
        (data.status || "PENDING_VERIFICATION").trim(),
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT i.*, u.full_name AS user_name, u.email AS user_email
       FROM instruments i
      LEFT JOIN owners o ON o.owner_id = i.owner_id
      LEFT JOIN users u ON u.user_id = o.user_id
      WHERE i.instrument_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByUser(userId) {
    const [rows] = await pool.execute(
      `SELECT i.*, u.full_name AS user_name
       FROM instruments i
      LEFT JOIN owners o ON o.owner_id = i.owner_id
      LEFT JOIN users u ON u.user_id = o.user_id
      WHERE o.user_id = ?
       ORDER BY i.created_at DESC`,
      [userId]
    );

    return rows;
  },

  async findBySerialNumber(serialNumber) {
    const [rows] = await pool.execute(
      `SELECT i.*, u.full_name AS user_name
       FROM instruments i
      LEFT JOIN owners o ON o.owner_id = i.owner_id
      LEFT JOIN users u ON u.user_id = o.user_id
       WHERE i.serial_number = ?
       LIMIT 1`,
      [serialNumber]
    );

    return rows[0];
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT i.*, u.full_name AS user_name, u.email AS user_email
       FROM instruments i
      LEFT JOIN owners o ON o.owner_id = i.owner_id
      LEFT JOIN users u ON u.user_id = o.user_id
       ORDER BY i.created_at DESC`
    );

    return rows;
  },

  async update(id, data) {
    const fields = [];
    const values = [];

    const allowed = [
      "instrument_name",
      "instrument_type_id",
      "description",
      "installation_location",
      "status",
    ];

    allowed.forEach((field) => {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(data[field]);
      }
    });

    if (!fields.length) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE instruments SET ${fields.join(", ")} WHERE instrument_id = ?`,
      values
    );

    return this.findById(id);
  },
};

module.exports = Instrument;