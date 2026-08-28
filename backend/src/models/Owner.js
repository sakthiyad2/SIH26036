// Owner model placeholder.
const { pool } = require("../config/database");

const Owner = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO owners
       (user_id, business_name, business_address)
       VALUES (?, ?, ?)`,
      [
        data.user_id,
        data.business_name,
        data.business_address || null
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM owners WHERE owner_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByUserId(userId) {
    const [rows] = await pool.execute(
      `SELECT * FROM owners WHERE user_id = ?`,
      [userId]
    );

    return rows[0];
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT o.*, u.full_name, u.email, u.phone
       FROM owners o
      JOIN users u ON o.user_id = u.user_id
      ORDER BY o.owner_id DESC`
    );

    return rows;
  },

  async update(id, data) {
    await pool.execute(
      `UPDATE owners
       SET business_name = ?, business_address = ?
      WHERE owner_id = ?`,
      [
        data.business_name,
        data.business_address,
        id
      ]
    );

    return this.findById(id);
  }
};

module.exports = Owner;