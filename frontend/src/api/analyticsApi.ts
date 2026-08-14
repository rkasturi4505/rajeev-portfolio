import api from "./axiosConfig";

const ANALYTICS_API_URL = "/api/analytics";

// ==========================================================
// TRACK RESUME DOWNLOAD
// PUBLIC
// ==========================================================

export const trackResumeDownload = () => {
  return api.post(
    `${ANALYTICS_API_URL}/resume-download`
  );
};

// ==========================================================
// TRACK PORTFOLIO VIEW
// PUBLIC
// ==========================================================

export const trackPortfolioView = () => {
  return api.post(
    `${ANALYTICS_API_URL}/portfolio-view`
  );
};