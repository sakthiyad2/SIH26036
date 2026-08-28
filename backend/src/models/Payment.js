// Payment model placeholder.
const { pool } = require("../config/database");

const Payment = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO payments
       (application_id, amount, status,
        transaction_reference, paid_at)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.application_id,
        data.amount,
        data.status || "PENDING",
        data.transaction_reference || null,
        data.paid_at || null
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM payments WHERE payment_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByApplication(applicationId) {
    const [rows] = await pool.execute(
      `SELECT * FROM payments
       WHERE application_id = ?
      ORDER BY payment_id DESC`,
      [applicationId]
    );

    return rows;
  },

  async updateStatus(id, status) {
    await pool.execute(
      `UPDATE payments
       SET status = ?, paid_at = CASE
         WHEN ? = 'PAID' THEN NOW()
         ELSE paid_at
       END
       WHERE id = ?`,
      [status, status, id]
    );

    return this.findById(id);
  }
};

module.exports = Payment;