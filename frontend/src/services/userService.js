import api from "./api";

const userService = {

  getAll: async () => {
    return api.get("/users");
  },

  getById: async (id) => {
    return api.get(
      `/users/${id}`
    );
  },

  update: async (
    id,
    userData
  ) => {
    return api.put(
      `/users/${id}`,
      userData
    );
  },

  delete: async (id) => {
    return api.delete(
      `/users/${id}`
    );
  },

  getInspectors: async () => {
    return api.get(
      "/users/inspectors"
    );
  },

  updateStatus: async (
    id,
    status
  ) => {
    return api.patch(
      `/users/${id}/status`,
      { status }
    );
  },

};

export default userService;