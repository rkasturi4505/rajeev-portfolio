import api from "./axiosConfig";

// ==========================================================
// RESUME DOWNLOAD API
// ==========================================================

const API_URL = "/api/resume-downloads";

// ==========================================================
// TRACK RESUME DOWNLOAD
// PUBLIC
// ==========================================================

export const trackResumeDownload = async () => {

  const response = await api.post(API_URL);

  return response.data;
};

// ==========================================================
// GET RESUME DOWNLOADS
// ADMIN ONLY
// ==========================================================

export const getResumeDownloads = async () => {

  const response = await api.get(API_URL);

  return response.data;
};