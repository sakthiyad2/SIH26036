// Notification model placeholder.
const { pool } = require("../config/database");

const Notification = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO notifications
       (user_id, title, message, is_read)
       VALUES (?, ?, ?, ?)`,
      [
        data.user_id,
        data.title,
        data.message,
        data.is_read || false
      ]
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM notifications
      WHERE notification_id = ?`,
      [id]
    );

    return rows[0];
  },

  async findByUser(userId) {
    const [rows] = await pool.execute(
      `SELECT * FROM notifications
       WHERE user_id = ?
      ORDER BY notification_id DESC`,
      [userId]
    );

    return rows;
  },

  async markAsRead(id) {
    await pool.execute(
      `UPDATE notifications
       SET is_read = true
       WHERE notification_id = ?`,
      [id]
    );

    return this.findById(id);
  },

  async markAllAsRead(userId) {
    await pool.execute(
      `UPDATE notifications
       SET is_read = true
       WHERE user_id = ?`,
      [userId]
    );
  },

  async delete(id) {
    await pool.execute(
      `DELETE FROM notifications
       WHERE notification_id = ?`,
      [id]
    );
  }
};

module.exports = Notification;