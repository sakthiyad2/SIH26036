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
    }

};


// ============================================================
// EXPORT
// ============================================================

export default inspectorService;