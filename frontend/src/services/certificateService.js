import api from "./api";

const certificateService = {

  getAll: async () => {
    return api.get("/certificates");
  },

  getMyCertificates: async () => {
    return api.get(
      "/certificates/my"
    );
  },

  getById: async (id) => {
    return api.get(
      `/certificates/${id}`
    );
  },

  create: async (certificateData) => {
    return api.post(
      "/certificates",
      certificateData
    );
  },

  verify: async (
    certificateNumber
  ) => {
    return api.get(
      `/certificates/verify/${encodeURIComponent(
        certificateNumber
      )}`
    );
  },

  download: async (id) => {
    return api.get(
      `/certificates/${id}/download`
    );
  },

};

export default certificateService;