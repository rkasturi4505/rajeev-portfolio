import api from "./axiosConfig";

const API = "/api/analytics";

export const getDashboardAnalytics = () => {
  return api.get(`${API}/dashboard`);
};
