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
    payload
  ) => {
    return api.patch(
      `/applications/${id}/assign`,
      {
        inspector_id:
          payload?.inspector_id ??
          payload?.inspectorId ??
          null,
        scheduled_date:
          payload?.scheduled_date ?? null,
        scheduled_time:
          payload?.scheduled_time ?? null,
        inspection_location:
          payload?.inspection_location ??
          payload?.location ??
          null
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