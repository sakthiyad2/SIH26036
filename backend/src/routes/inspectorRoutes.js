const express = require("express");

const router = express.Router();

const inspectorService =
  require("../services/inspectorService");

const {
  startInspection,
  completeInspection
} = require("../controllers/inspectorController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");


// ============================================================
// ALL INSPECTOR ROUTES REQUIRE LOGIN
// ============================================================

router.use(authenticate);

router.use(
  authorizeRoles("INSPECTOR")
);


// ============================================================
// GET INSPECTOR PROFILE
// GET /api/inspector/profile
// ============================================================

router.get(
  "/profile",
  async (req, res) => {

    try {

      const profile =
        await inspectorService
          .getInspectorProfile(
            req.user.user_id
          );

      return res.json({
        success: true,
        data: profile
      });

    } catch (error) {

      console.error(
        "Inspector profile error:",
        error
      );

      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
);


// ============================================================
// GET INSPECTOR DASHBOARD
// GET /api/inspector/dashboard
// ============================================================

router.get(
  "/dashboard",
  async (req, res) => {

    try {

      const dashboard =
        await inspectorService
          .getDashboard(
            req.user.user_id
          );

      return res.json({
        success: true,
        data: dashboard
      });

    } catch (error) {

      console.error(
        "Inspector dashboard error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load inspector dashboard"
      });
    }
  }
);


// ============================================================
// GET ASSIGNED APPLICATIONS
// GET /api/inspector/applications
// ============================================================

router.get(
  "/applications",
  async (req, res) => {

    try {

      const applications =
        await inspectorService
          .getAssignedApplications(
            req.user.user_id
          );

      return res.json({
        success: true,
        data: applications
      });

    } catch (error) {

      console.error(
        "Assigned applications error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load assigned applications"
      });
    }
  }
);


// ============================================================
// GET APPLICATION DETAILS
// GET /api/inspector/applications/:id
// ============================================================

router.get(
  "/applications/:id",
  async (req, res) => {

    try {

      const applicationId =
        Number(req.params.id);

      if (
        !Number.isInteger(
          applicationId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid application ID"
        });
      }

      const application =
        await inspectorService
          .getApplicationDetails(
            req.user.user_id,
            applicationId
          );

      return res.json({
        success: true,
        data: application
      });

    } catch (error) {

      console.error(
        "Application details error:",
        error
      );

      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
);


// ============================================================
// GET INSPECTION HISTORY
// GET /api/inspector/history
// ============================================================

router.patch(
  "/:id/start",
  async (req, res) => {
    try {
      await startInspection(req, res);
    } catch (error) {
      console.error("Start inspection route error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to start inspection"
      });
    }
  }
);

router.patch(
  "/:id/complete",
  async (req, res) => {
    try {
      await completeInspection(req, res);
    } catch (error) {
      console.error("Complete inspection route error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to complete inspection"
      });
    }
  }
);

router.get(
  "/history",
  async (req, res) => {

    try {

      const history =
        await inspectorService
          .getInspectionHistory(
            req.user.user_id
          );

      return res.json({
        success: true,
        data: history
      });

    } catch (error) {

      console.error(
        "Inspection history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load inspection history"
      });
    }
  }
);


// ============================================================
// TEST
// GET /api/inspector/test
// ============================================================

router.get(
  "/test",
  (req, res) => {

    res.json({
      success: true,
      message:
        "Inspector API is working",
      user: req.user
    });

  }
);


// ============================================================
// EXPORT
// ============================================================

module.exports = router;