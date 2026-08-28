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
    return api.get(
      `/instruments/search?serialNumber=${encodeURIComponent(
        serialNumber
      )}`
    );
  },

};

export default instrumentService;