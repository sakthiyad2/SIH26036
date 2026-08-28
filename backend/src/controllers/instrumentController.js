const Instrument = require("../models/Instrument");
const Owner = require("../models/Owner");
const InstrumentType = require("../models/InstrumentType");
const Application = require("../models/Application");
const User = require("../models/User");
const { createNotification } = require("../services/notificationService");
const generateApplicationNumber = require("../utils/generateApplicationNumber");

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
      serial_number,
      description,
      location,
      status
    } = req.body;

    if (!instrument_name || !instrument_type || !serial_number || !location) {
      return res.status(400).json({
        success: false,
        message: "Instrument name, type, serial number and location are required",
      });
    }

    const owner = await Owner.findByUserId(req.user.user_id);
    const instrumentType = await InstrumentType.findAll();
    const selectedType = instrumentType.find(
      (type) => type.type_name === instrument_type
    );

    if (!owner || !selectedType) {
      return res.status(400).json({
        success: false,
        message: "Owner profile or instrument type not found",
      });
    }

    const instrument = await Instrument.create({
      owner_id: owner.owner_id,
      instrument_type_id: selectedType.instrument_type_id,
      instrument_name,
      serial_number,
      description,
      location,
      status,
    });

    const application = await Application.create({
      owner_id: owner.owner_id,
      instrument_id: instrument.instrument_id,
      application_type: "NEW_VERIFICATION",
      status: "SUBMITTED",
      application_number: generateApplicationNumber()
    });

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
      message: "Instrument submitted successfully",
      data: { instrument, application },
    });
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