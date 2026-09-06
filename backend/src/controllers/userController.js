// User controller placeholder.
const { pool } = require("../config/database");
const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

const getInspectors = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      `SELECT
         i.inspector_id,
         i.employee_id,
         i.designation,
         i.department,
         i.status AS inspector_status,
         u.user_id,
         u.full_name,
         u.email,
         u.phone,
         u.status AS user_status
       FROM inspectors i
       INNER JOIN users u ON i.user_id = u.user_id
       WHERE u.role = 'INSPECTOR' AND u.status = 'ACTIVE'
       ORDER BY u.full_name ASC`
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.update(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "User updated",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.delete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User deleted"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getInspectors,
  getUser,
  updateUser,
  deleteUser
};