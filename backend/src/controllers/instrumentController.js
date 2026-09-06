const Instrument = require("../models/Instrument");
const Owner = require("../models/Owner");
const InstrumentType = require("../models/InstrumentType");
const Application = require("../models/Application");
const User = require("../models/User");
const { createNotification } = require("../services/notificationService");
const generateApplicationNumber = require("../utils/generateApplicationNumber");
const generateInstrumentSerialNumber = require("../utils/generateInstrumentSerialNumber");

const getInstruments = async (req, res, next) => {
  try {
    const instruments = await Instrument.findAll();

    res.json({
      success: true,
      data: instruments,
    });
  } catch (error) {
    next(error);
  }
};

const getInstrument = async (req, res, next) => {
  try {
    const instrument = await Instrument.findById(req.params.id);

    if (!instrument) {
      return res.status(404).json({
        success: false,
        message: "Instrument not found",
      });
    }

    res.json({
      success: true,
      data: instrument,
    });
  } catch (error) {
    next(error);
  }
};

const searchInstrument = async (req, res, next) => {
  try {
    const { serial } = req.params;
    const instrument = await Instrument.findBySerialNumber(serial);

    if (!instrument) {
      return res.status(404).json({
        success: false,
        message: "Instrument not found",
      });
    }

    res.json({
      success: true,
      data: instrument,
    });
  } catch (error) {
    next(error);
  }
};

const getMyInstruments = async (req, res, next) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const instruments = await Instrument.findByUser(req.user.user_id);

    res.json({
      success: true,
      data: instruments,
    });
  } catch (error) {
    next(error);
  }
};

const normalizeInstrumentStatus = (value) => {
  const normalized = String(value || "PENDING_VERIFICATION").trim().toUpperCase();

  if (["REGISTERED", "PENDING_VERIFICATION", "VERIFIED", "EXPIRED", "REJECTED", "SUSPENDED"].includes(normalized)) {
    return normalized;
  }

  return "PENDING_VERIFICATION";
};

const createInstrument = async (req, res, next) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      instrument_name,
      instrument_type,
      description,
      location,
      location_address,
      latitude,
      longitude,
      status,
      city,
      state,
      manufacturer,
      model_number,
      capacity,
      unit,
      accuracy,
      year_of_manufacture,
      purchase_date,
    } = req.body;

    if (!instrument_name || !instrument_type) {
      return res.status(400).json({
        success: false,
        message: "Instrument name and type are required",
      });
    }

    const owner = await Owner.findByUserId(req.user.user_id);
    const instrumentTypes = await InstrumentType.findAll();
    const selectedType = instrumentTypes.find((type) => {
      const candidate = String(type.type_name || "").trim().toLowerCase();
      const incoming = String(instrument_type || "").trim().toLowerCase();

      return candidate === incoming || candidate.includes(incoming) || incoming.includes(candidate);
    });

    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "Owner profile not found. Please contact support or register again.",
      });
    }

    if (!selectedType) {
      return res.status(400).json({
        success: false,
        message: `Instrument type not found: ${instrument_type}`,
      });
    }

    const [existingRows] = await require("../config/database").pool.execute(
      `SELECT i.instrument_id
       FROM instruments i
       INNER JOIN owners o ON o.owner_id = i.owner_id
       WHERE o.user_id = ?
         AND LOWER(TRIM(i.instrument_name)) = LOWER(TRIM(?))
         AND i.instrument_type_id = ?
       LIMIT 1`,
      [req.user.user_id, String(instrument_name || "").trim(), selectedType.instrument_type_id]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This instrument has already been submitted by this user.",
      });
    }

    const connection = await require("../config/database").pool.getConnection();

    try {
      await connection.beginTransaction();

      const [nextIdRows] = await connection.execute(
        `SELECT COALESCE(MAX(instrument_id), 0) + 1 AS next_id FROM instruments`
      );
      const nextInstrumentId = Number(nextIdRows[0]?.next_id || 1);
      const serial_number = generateInstrumentSerialNumber(nextInstrumentId);

      const insertedInstrument = await connection.execute(
        `INSERT INTO instruments
         (owner_id, instrument_type_id, instrument_name, serial_number,
          manufacturer, model_number, capacity, unit, accuracy,
          year_of_manufacture, purchase_date, installation_location,
          city, state, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          owner.owner_id,
          selectedType.instrument_type_id,
          instrument_name,
          serial_number,
          manufacturer || null,
          model_number || null,
          capacity ?? null,
          unit || null,
          accuracy || null,
          year_of_manufacture ?? null,
          purchase_date || null,
          location || location_address || "",
          city || null,
          state || null,
          normalizeInstrumentStatus(status),
        ]
      );

      const instrumentId = Number(insertedInstrument?.[0]?.insertId || 0);

      if (!instrumentId) {
        throw new Error("Instrument creation failed: no insert ID returned");
      }

      const [instrumentRows] = await connection.execute(
        `SELECT i.*, u.full_name AS user_name, u.email AS user_email
         FROM instruments i
         LEFT JOIN owners o ON o.owner_id = i.owner_id
         LEFT JOIN users u ON u.user_id = o.user_id
         WHERE i.instrument_id = ?`,
        [instrumentId]
      );

      const instrument = instrumentRows[0];

      if (!instrument) {
        throw new Error("Instrument creation failed: record not found after insert");
      }

      const applicationNumber = generateApplicationNumber();
      const ownerInputLocation = String(location || location_address || "").trim();
      const [applicationResult] = await connection.execute(
        `INSERT INTO applications
         (application_number, owner_id, instrument_id, application_type, application_date, location, status)
         VALUES (?, ?, ?, ?, CURDATE(), ?, ?)` ,
        [
          applicationNumber,
          owner.owner_id,
          instrument.instrument_id,
          "NEW_VERIFICATION",
          ownerInputLocation || null,
          "SUBMITTED",
        ]
      );

      const application = {
        application_id: applicationResult.insertId,
        application_number: applicationNumber,
        owner_id: owner.owner_id,
        instrument_id: instrument.instrument_id,
        application_type: "NEW_VERIFICATION",
        application_date: new Date().toISOString().slice(0, 10),
        location: ownerInputLocation || null,
        status: "SUBMITTED",
      };

      await connection.commit();

      const officials = (await User.findAll())
        .filter((user) => user.role === "OFFICIAL");

      await Promise.all(
        officials.map((official) =>
          createNotification(
            official.user_id,
            "New instrument verification request",
            `A new instrument requires review: ${instrument.instrument_name} (${instrument.serial_number}).`
          )
        )
      );

      res.status(201).json({
        success: true,
        message: "Instrument registered successfully",
        data: {
          ...instrument,
          serial_number: instrument.serial_number,
          application,
        },
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    next(error);
  }
};

const updateInstrument = async (req, res, next) => {
  try {
    const instrument = await Instrument.update(req.params.id, req.body);

    res.json({
      success: true,
      message: "Instrument updated",
      data: instrument,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInstruments,
  getInstrument,
  searchInstrument,
  getMyInstruments,
  createInstrument,
  updateInstrument,
};