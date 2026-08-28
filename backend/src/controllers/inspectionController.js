// Inspection controller placeholder.
const Inspection =
  require("../models/Inspection");

const InspectionResult =
  require("../models/InspectionResult");

const createInspection = async (
  req,
  res,
  next
) => {
  try {
    const inspection =
      await Inspection.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Inspection scheduled",
      data: inspection
    });
  } catch (error) {
    next(error);
  }
};

const getInspections = async (
  req,
  res,
  next
) => {
  try {
    const inspections =
      await Inspection.findAll();

    res.json({
      success: true,
      data: inspections
    });
  } catch (error) {
    next(error);
  }
};

const getPendingInspections =
  async (req, res, next) => {
    try {
      const inspections =
        await Inspection.findPending();

      res.json({
        success: true,
        data: inspections
      });
    } catch (error) {
      next(error);
    }
  };

const getInspection = async (
  req,
  res,
  next
) => {
  try {
    const inspection =
      await Inspection.findById(
        req.params.id
      );

    if (!inspection) {
      return res.status(404).json({
        success: false,
        message: "Inspection not found"
      });
    }

    const results =
      await InspectionResult.findByInspection(
        req.params.id
      );

    res.json({
      success: true,
      data: {
        ...inspection,
        results
      }
    });
  } catch (error) {
    next(error);
  }
};

const getMyInspections = async (
  req,
  res,
  next
) => {
  try {
    const Inspector =
      require("../models/Inspector");

    const inspector =
      await Inspector.findByUserId(
        req.user.user_id
      );

    if (!inspector) {
      return res.status(404).json({
        success: false,
        message:
          "Inspector profile not found"
      });
    }

    const inspections =
      await Inspection.findByInspector(
        inspector.inspector_id
      );

    res.json({
      success: true,
      data: inspections
    });
  } catch (error) {
    next(error);
  }
};

const addResult = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await InspectionResult.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Inspection result added",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const updateInspectionStatus =
  async (req, res, next) => {
    try {
      const inspection =
        await Inspection.updateStatus(
          req.params.id,
          req.body.status,
          req.body.remarks
        );

      res.json({
        success: true,
        message:
          "Inspection status updated",
        data: inspection
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createInspection,
  getInspections,
  getPendingInspections,
  getInspection,
  getMyInspections,
  addResult,
  updateInspectionStatus
};