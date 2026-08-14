import api from "./axiosConfig";

// ==========================================================
// PORTFOLIO VIEW API
// ==========================================================

const API_URL = "/api/portfolio-views";

// ==========================================================
// TRACK PORTFOLIO VIEW
// PUBLIC
// ==========================================================

export const trackPortfolioView = async () => {

  const response = await api.post(API_URL);

  return response.data;
};

// ==========================================================
// GET PORTFOLIO VIEWS
// ADMIN ONLY
// ==========================================================

export const getPortfolioViews = async () => {

  const response = await api.get(API_URL);

  return response.data;
};