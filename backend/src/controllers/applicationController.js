
const Application =
  require("../models/Application");

const Owner = require("../models/Owner");
const Inspector = require("../models/Inspector");
const Inspection = require("../models/Inspection");
const { pool } = require("../config/database");
const { createNotification } = require("../services/notificationService");

const generateApplicationNumber =
  require("../utils/generateApplicationNumber");

const createApplication = async (
  req,
  res,
  next
) => {
  try {
    const owner =
      await Owner.findByUserId(
        req.user.user_id
      );

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner profile not found"
      });
    }

    const application =
      await Application.create({
        ...req.body,
        owner_id: owner.owner_id,
        application_number:
          generateApplicationNumber()
      });

    res.status(201).json({
      success: true,
      message: "Application submitted",
      data: application
    });
  } catch (error) {
    next(error);
  }
};

const getApplications = async (
  req,
  res,
  next
) => {
  try {
    const applications =
      await Application.findAll();

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

const getApplication = async (
  req,
  res,
  next
) => {
  try {
    const application =
      await Application.findById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

const getMyApplications = async (
  req,
  res,
  next
) => {
  try {
    const owner =
      await Owner.findByUserId(
        req.user.user_id
      );

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner profile not found"
      });
    }

    const applications =
      await Application.findByOwner(
        owner.owner_id
      );

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus =
  async (req, res, next) => {
    try {
      const application =
        await Application.updateStatus(
          req.params.id,
          req.body.status
        );

      res.json({
        success: true,
        message: "Application status updated",
        data: application
      });
    } catch (error) {
      next(error);
    }
  };

const assignInspector = async (req, res, next) => {
  try {
    const {
      inspector_id,
      scheduled_date,
      scheduled_time,
      inspection_location
    } = req.body;

    if (!inspector_id || !scheduled_date) {
      return res.status(400).json({
        success: false,
        message: "Inspector and scheduled date are required"
      });
    }

    const inspector = await Inspector.findById(inspector_id);
    if (!inspector) {
      return res.status(404).json({
        success: false,
        message: "Inspector not found"
      });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    const [existingInspections] = await pool.execute(
      "SELECT inspection_id FROM inspections WHERE application_id = ? LIMIT 1",
      [application.application_id]
    );

    if (existingInspections[0]) {
      return res.status(409).json({
        success: false,
        message: "This application already has an inspection assignment"
      });
    }

    const [officialRows] = await pool.execute(
      "SELECT official_id FROM officials WHERE user_id = ? LIMIT 1",
      [req.user.user_id]
    );

    if (!officialRows[0]) {
      return res.status(400).json({
        success: false,
        message: "Official profile not found"
      });
    }

    const inspection = await Inspection.create({
      application_id: application.application_id,
      inspector_id,
      assigned_by_official_id: officialRows[0].official_id,
      scheduled_date,
      scheduled_time,
      inspection_location
    });

    await Application.updateStatus(
      application.application_id,
      "SCHEDULED"
    );

    await createNotification(
      inspector.user_id,
      "Inspection assigned",
      `Application ${application.application_number} has been assigned for inspection.`
    );

    res.status(201).json({
      success: true,
      message: "Inspector assigned successfully",
      data: inspection
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  getMyApplications,
  updateApplicationStatus,
  assignInspector
};