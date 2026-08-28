// Document model placeholder.
const { pool } = require("../config/database");

const Document = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO documents
       (application_id, document_type, file_name, file_path)
       VALUES (?, ?, ?, ?)`,
      [
        data.application_id,
        data.document_type,
        data.file_name,
        data.file_path
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM documents WHERE document_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByApplication(applicationId) {
    const [rows] = await pool.execute(
      `SELECT * FROM documents
       WHERE application_id = ?
      ORDER BY document_id DESC`,
      [applicationId]
    );

    return rows;
  }
};

module.exports = Document;