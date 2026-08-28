import api from "./api";

const inspectionService = {

  getAll: async () => {
    return api.get("/inspections");
  },

  getById: async (id) => {
    return api.get(
      `/inspections/${id}`
    );
  },

  getHistory: async () => {
    return api.get(
      "/inspections/history"
    );
  },

  schedule: async (
    applicationId,
    inspectionData
  ) => {
    return api.post(
      `/inspections/${applicationId}/schedule`,
      inspectionData
    );
  },

  start: async (id) => {
    return api.patch(
      `/inspections/${id}/start`
    );
  },

  submit: async (
    id,
    inspectionData
  ) => {
    return api.post(
      `/inspections/${id}/submit`,
      inspectionData
    );
  },

  addMeasurement: async (
    inspectionId,
    measurementData
  ) => {
    return api.post(
      `/inspections/${inspectionId}/measurements`,
      measurementData
    );
  },

};

export default inspectionService;