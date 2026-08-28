// Instrument type model placeholder.
const { pool } = require("../config/database");

const InstrumentType = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO instrument_types
       (type_name, description)
       VALUES (?, ?)`,
      [
        data.type_name,
        data.description || null
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM instrument_types WHERE instrument_type_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT * FROM instrument_types ORDER BY type_name`
    );

    return rows;
  }
};

module.exports = InstrumentType;