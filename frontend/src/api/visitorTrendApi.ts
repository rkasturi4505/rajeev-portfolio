import api from "./axiosConfig";

const API_URL = "/api/visitor-trends";

// ==========================================================
// LAST 7 DAYS
// ADMIN ONLY
// ==========================================================

export const getLast7DaysTrend = () => {
  return api.get(`${API_URL}/last7days`);
};

// ==========================================================
// LAST 30 DAYS
// ADMIN ONLY
// ==========================================================

export const getLast30DaysTrend = () => {
  return api.get(`${API_URL}/last30days`);
};

// ==========================================================
// MONTHLY
// ADMIN ONLY
// ==========================================================

export const getMonthlyTrend = () => {
  return api.get(`${API_URL}/monthly`);
};