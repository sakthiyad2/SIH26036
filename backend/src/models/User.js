const { pool } = require("../config/database");

const User = {

  // ============================================================
  // CREATE USER
  // ============================================================
  async create(data) {

    const full_name = data.full_name ?? data.name ?? null;
    const email = data.email ?? null;
    const password_hash = data.password_hash ?? null;

    // Convert frontend role to database role
    let role = String(data.role ?? "OWNER").trim().toUpperCase();

    // Only allow roles that exist in MySQL ENUM
    const allowedRoles = [
      "OWNER",
      "OFFICIAL",
      "INSPECTOR",
      "ADMIN"
    ];

    if (!allowedRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }

    const phone = data.phone ?? null;
    const address = data.address ?? null;
    const status = data.status ?? "ACTIVE";

    if (!full_name) {
      throw new Error("Full name is required");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password_hash) {
      throw new Error("Password is required");
    }

    const [result] = await pool.execute(
      `INSERT INTO users
      (
        full_name,
        email,
        password_hash,
        role,
        phone,
        address,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        password_hash,
        role,
        phone,
        address,
        status
      ]
    );

    return this.findById(result.insertId);
  },


  // ============================================================
  // FIND USER BY ID
  // ============================================================
  async findById(id) {

    if (id === undefined || id === null) {
      return null;
    }

    const [rows] = await pool.execute(
      `SELECT
        user_id,
        full_name,
        email,
        password_hash,
        phone,
        role,
        status,
        address,
        created_at,
        updated_at
       FROM users
       WHERE user_id = ?`,
      [id]
    );

    return rows[0] || null;
  },


  // ============================================================
  // FIND USER BY EMAIL
  // ============================================================
  async findByEmail(email) {

    if (!email) {
      return null;
    }

    const [rows] = await pool.execute(
      `SELECT
        user_id,
        full_name,
        email,
        password_hash,
        phone,
        role,
        status,
        address,
        created_at,
        updated_at
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email]
    );

    return rows[0] || null;
  },


  // ============================================================
  // FIND ALL USERS
  // ============================================================
  async findAll() {

    const [rows] = await pool.execute(
      `SELECT
        user_id,
        full_name,
        email,
        phone,
        role,
        status,
        address,
        created_at,
        updated_at
       FROM users
       ORDER BY created_at DESC`
    );

    return rows;
  },


  // ============================================================
  // UPDATE USER
  // ============================================================
  async update(id, data) {

    if (id === undefined || id === null) {
      throw new Error("User ID is required");
    }

    const fields = [];
    const values = [];


    if (data.full_name !== undefined) {
      fields.push("full_name = ?");
      values.push(data.full_name ?? null);
    }


    if (data.email !== undefined) {
      fields.push("email = ?");
      values.push(data.email ?? null);
    }


    if (data.role !== undefined) {

      let role = String(data.role).trim().toUpperCase();

      const allowedRoles = [
        "OWNER",
        "OFFICIAL",
        "INSPECTOR",
        "ADMIN"
      ];

      if (!allowedRoles.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }

      fields.push("role = ?");
      values.push(role);
    }


    if (data.phone !== undefined) {
      fields.push("phone = ?");
      values.push(data.phone ?? null);
    }


    if (data.address !== undefined) {
      fields.push("address = ?");
      values.push(data.address ?? null);
    }


    if (data.status !== undefined) {
      fields.push("status = ?");
      values.push(data.status ?? "ACTIVE");
    }


    if (data.password_hash !== undefined) {
      fields.push("password_hash = ?");
      values.push(data.password_hash ?? null);
    }


    if (fields.length === 0) {
      return this.findById(id);
    }


    values.push(id);


    await pool.execute(
      `UPDATE users
       SET ${fields.join(", ")}
       WHERE user_id = ?`,
      values
    );


    return this.findById(id);
  },


  // ============================================================
  // DELETE USER
  // ============================================================
  async delete(id) {

    if (id === undefined || id === null) {
      throw new Error("User ID is required");
    }

    const [result] = await pool.execute(
      `DELETE FROM users
       WHERE user_id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }

};


module.exports = User;