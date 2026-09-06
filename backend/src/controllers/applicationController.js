
const Application =
  require("../models/Application");

const Instrument = require("../models/Instrument");
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

    const instrumentId = Number(req.body.instrument_id);

    if (!instrumentId) {
      return res.status(400).json({
        success: false,
        message: "Valid instrument_id is required"
      });
    }

    const instrument = await Instrument.findById(instrumentId);

    if (!instrument) {
      return res.status(404).json({
        success: false,
        message: "Instrument not found"
      });
    }

    if (Number(instrument.owner_id) !== Number(owner.owner_id)) {
      return res.status(403).json({
        success: false,
        message: "This instrument does not belong to your account"
      });
    }

    const [activeApplications] = await pool.execute(
      `SELECT application_id FROM applications
       WHERE instrument_id = ?
         AND status NOT IN ('REJECTED', 'CANCELLED')
       LIMIT 1`,
      [instrumentId]
    );
    if (activeApplications[0]) {
      return res.status(409).json({
        success: false,
        message: "This instrument already has an active verification application"
      });
    }

    const application =
      await Application.create({
        ...req.body,
        owner_id: owner.owner_id,
        instrument_id: instrumentId,
        application_number:
          generateApplicationNumber(),
        status: "SUBMITTED"
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
      const nextStatus = String(req.body.status || "").toUpperCase();
      if (!["APPROVED", "REJECTED"].includes(nextStatus)) {
        return res.status(400).json({
          success: false,
          message: "Status must be APPROVED or REJECTED"
        });
      }

      const current = await Application.findById(req.params.id);
      if (!current) {
        return res.status(404).json({
          success: false,
          message: "Application not found"
        });
      }

      if (current.status !== "INSPECTION_COMPLETED") {
        return res.status(409).json({
          success: false,
          message: "An application can be approved or rejected only after inspection is completed"
        });
      }

      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.execute(
          "UPDATE applications SET status = ? WHERE application_id = ?",
          [nextStatus, req.params.id]
        );
        await connection.execute(
          "UPDATE instruments SET status = ? WHERE instrument_id = ?",
          [nextStatus === "APPROVED" ? "VERIFIED" : "REJECTED", current.instrument_id]
        );
        await connection.commit();
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }

      const application = await Application.findById(req.params.id);
      const [ownerRows] = await pool.execute(
        "SELECT u.user_id FROM owners o INNER JOIN users u ON u.user_id = o.user_id WHERE o.owner_id = ? LIMIT 1",
        [current.owner_id]
      );
      if (ownerRows[0]) {
        await createNotification(
          ownerRows[0].user_id,
          `Application ${nextStatus.toLowerCase()}`,
          `Your verification application ${current.application_number} was ${nextStatus.toLowerCase()}.`
        );
      }

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