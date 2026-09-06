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
      "/inspections/my"
    );
  },

  schedule: async (
    applicationId,
    inspectionData
  ) => {
    return api.patch(
      `/applications/${applicationId}/assign`,
      inspectionData
    );
  },

  start: async (id) => {
    return api.patch(
      `/inspections/${id}/status`,
      { status: "IN_PROGRESS" }
    );
  },

  submit: async (
    id,
    inspectionData
  ) => {
    const result = await api.post(
      "/inspections/results",
      {
        ...inspectionData,
        inspection_id: id
      }
    );

    await api.patch(
      `/inspections/${id}/status`,
      { status: "COMPLETED" }
    );

    return result;
  },

  addMeasurement: async (
    inspectionId,
    measurementData
  ) => {
    return api.post(
      "/inspections/results",
      {
        ...measurementData,
        inspection_id: inspectionId
      }
    );
  },

};

export default inspectionService;