import api from "./api";


// ============================================================
// INSPECTOR SERVICE
// ============================================================

const inspectorService = {

  // ----------------------------------------------------------
  // GET INSPECTOR PROFILE
  // ----------------------------------------------------------

  getProfile: async () => {

    return api.get(
      "/inspector/profile"
    );
  },


  // ----------------------------------------------------------
  // GET DASHBOARD
  // ----------------------------------------------------------

  getDashboard: async () => {

    return api.get(
      "/inspector/dashboard"
    );
  },


  // ----------------------------------------------------------
  // GET ASSIGNED APPLICATIONS
  // ----------------------------------------------------------

  getAssignedApplications:
    async () => {

      return api.get(
        "/inspector/applications"
      );
    },


  // ----------------------------------------------------------
  // GET APPLICATION DETAILS
  // ----------------------------------------------------------

  getApplicationDetails:
    async (id) => {

      return api.get(
        `/inspector/applications/${id}`
      );
    },


  // ----------------------------------------------------------
  // GET INSPECTION HISTORY
  // ----------------------------------------------------------

  getInspectionHistory:
    async () => {

      return api.get(
        "/inspector/history"
      );
    },

  // ----------------------------------------------------------
  // START INSPECTION
  // ----------------------------------------------------------

  startInspection: async (id) => {
    return api.patch(
      `/inspector/${id}/start`
    );
  },

  // ----------------------------------------------------------
  // COMPLETE INSPECTION
  // ----------------------------------------------------------

  completeInspection: async (id, data) => {
    return api.patch(
      `/inspector/${id}/complete`,
      data
    );
  }

};


// ============================================================
// EXPORT
// ============================================================

export default inspectorService;