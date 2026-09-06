import api from "./api";

const instrumentService = {

  getAll: async () => {
    return api.get("/instruments");
  },

  getById: async (id) => {
    return api.get(
      `/instruments/${id}`
    );
  },

  getMyInstruments: async () => {
    return api.get(
      "/instruments/my"
    );
  },

  create: async (instrumentData) => {
    return api.post(
      "/instruments",
      instrumentData
    );
  },

  update: async (
    id,
    instrumentData
  ) => {
    return api.put(
      `/instruments/${id}`,
      instrumentData
    );
  },

  delete: async (id) => {
    return api.delete(
      `/instruments/${id}`
    );
  },

  search: async (serialNumber) => {
    const value = String(serialNumber || "").trim();

    if (!value) {
      return Promise.resolve({
        data: {
          success: true,
          data: []
        }
      });
    }

    return api.get(
      `/instruments/search/${encodeURIComponent(value)}`
    );
  },

};

export default instrumentService;