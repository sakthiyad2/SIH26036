import api from "./api";

const applicationService = {

  getAll: async () => {
    return api.get("/applications");
  },

  getMyApplications: async () => {
    return api.get(
      "/applications/my"
    );
  },

  getAssignedApplications: async () => {
    return api.get(
      "/applications/assigned"
    );
  },

  getById: async (id) => {
    return api.get(
      `/applications/${id}`
    );
  },

  create: async (applicationData) => {
    return api.post(
      "/applications",
      applicationData
    );
  },

  update: async (
    id,
    applicationData
  ) => {
    return api.put(
      `/applications/${id}`,
      applicationData
    );
  },

  assignInspector: async (
    id,
    inspectorId
  ) => {
    return api.patch(
      `/applications/${id}/assign`,
      {
        inspector_id: inspectorId.inspector_id,
        scheduled_date: inspectorId.scheduled_date,
        scheduled_time: inspectorId.scheduled_time,
        inspection_location: inspectorId.inspection_location
      }
    );
  },

  updateStatus: async (
    id,
    status
  ) => {
    return api.patch(
      `/applications/${id}/status`,
      {
        status,
      }
    );
  },

  cancel: async (id) => {
    return api.patch(
      `/applications/${id}/cancel`
    );
  },

};

export default applicationService;