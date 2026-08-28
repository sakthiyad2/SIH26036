import api from "./api";

const notificationService = {

  getAll: async () => {
    return api.get(
      "/notifications"
    );
  },

  markAsRead: async (id) => {
    return api.patch(
      `/notifications/${id}/read`
    );
  },

  markAllAsRead: async () => {
    return api.patch(
      "/notifications/read-all"
    );
  },

  delete: async (id) => {
    return api.delete(
      `/notifications/${id}`
    );
  },

};

export default notificationService;