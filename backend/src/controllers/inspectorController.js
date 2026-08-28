const Inspector = require("../models/Inspector");

// ============================================================
// HELPER
// ============================================================

const getInspector = async (req) => {

  if (!req.user || !req.user.user_id) {
    throw new Error("Authentication required");
  }

  const inspector =
    await Inspector.findByUserId(
      req.user.user_id
    );

  if (!inspector) {
    throw new Error(
      "Inspector profile not found"
    );
  }

  return inspector;
};


// ============================================================
// GET INSPECTOR PROFILE
// ============================================================

const getProfile = async (req, res) => {

  try {

    const inspector =
      await getInspector(req);

    res.json({
      success: true,
      data: inspector
    });

  } catch (error) {

    console.error(
      "Inspector profile error:",
      error
    );

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ============================================================
// GET ASSIGNED APPLICATIONS
// ============================================================

const getAssignedApplications =
  async (req, res) => {

    try {

      const inspector =
        await getInspector(req);

      const applications =
        await Inspector.getAssignedApplications(
          inspector.inspector_id
        );

      res.json({
        success: true,
        data: applications
      });

    } catch (error) {

      console.error(
        "Assigned applications error:",
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };


// ============================================================
// GET APPLICATION DETAILS
// ============================================================

const getApplicationDetails =
  async (req, res) => {

    try {

      const inspector =
        await getInspector(req);

      const { id } = req.params;

      const application =
        await Inspector.getApplicationDetails(
          id,
          inspector.inspector_id
        );

      if (!application) {

        return res.status(404).json({
          success: false,
          message:
            "Application not found or not assigned to you"
        });
      }

      res.json({
        success: true,
        data: application
      });

    } catch (error) {

      console.error(
        "Application details error:",
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };


// ============================================================
// DASHBOARD
// ============================================================

const getDashboard =
  async (req, res) => {

    try {

      const inspector =
        await getInspector(req);

      const statistics =
        await Inspector.getDashboardStatistics(
          inspector.inspector_id
        );

      res.json({
        success: true,
        data: {
          assigned:
            Number(statistics.total_assigned || 0),

          scheduled:
            Number(statistics.scheduled || 0),

          completed:
            Number(statistics.completed || 0),

          pending:
            Number(statistics.pending || 0)
        }
      });

    } catch (error) {

      console.error(
        "Inspector dashboard error:",
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };


// ============================================================
// INSPECTION HISTORY
// ============================================================

const getHistory =
  async (req, res) => {

    try {

      const inspector =
        await getInspector(req);

      const history =
        await Inspector.getInspectionHistory(
          inspector.inspector_id
        );

      res.json({
        success: true,
        data: history
      });

    } catch (error) {

      console.error(
        "Inspection history error:",
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };


// ============================================================
// START INSPECTION
// ============================================================

const startInspection =
  async (req, res) => {

    try {

      const inspector =
        await getInspector(req);

      const { id } = req.params;

      const updated =
        await Inspector.startInspection(
          id,
          inspector.inspector_id
        );

      if (!updated) {

        return res.status(400).json({
          success: false,
          message:
            "Inspection cannot be started"
        });
      }

      res.json({
        success: true,
        message:
          "Inspection started successfully"
      });

    } catch (error) {

      console.error(
        "Start inspection error:",
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };


// ============================================================
// COMPLETE INSPECTION
// ============================================================

const completeInspection =
  async (req, res) => {

    try {

      const inspector =
        await getInspector(req);

      const { id } = req.params;

      await Inspector.completeInspection(
        id,
        inspector.inspector_id,
        req.body
      );

      res.json({
        success: true,
        message:
          "Inspection submitted successfully"
      });

    } catch (error) {

      console.error(
        "Complete inspection error:",
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };


module.exports = {
  getProfile,
  getAssignedApplications,
  getApplicationDetails,
  getDashboard,
  getHistory,
  startInspection,
  completeInspection
};