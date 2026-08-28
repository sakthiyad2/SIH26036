// Inspection result model placeholder.
const { pool } = require("../config/database");

const InspectionResult = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO inspection_results
       (inspection_id, parameter_name,
        expected_value, actual_value,
        result, remarks)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.inspection_id,
        data.parameter_name,
        data.expected_value,
        data.actual_value,
        data.result,
        data.remarks || null
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM inspection_results
      WHERE result_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByInspection(inspectionId) {
    const [rows] = await pool.execute(
      `SELECT * FROM inspection_results
       WHERE inspection_id = ?
      ORDER BY result_id`,
      [inspectionId]
    );

    return rows;
  }
};

module.exports = InspectionResult;