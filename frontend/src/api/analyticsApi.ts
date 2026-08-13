import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const ANALYTICS_API_URL = `${API_BASE_URL}/api/analytics`;

const RESUME_DOWNLOAD_API_URL = `${API_BASE_URL}/api/resume-downloads`;

export const trackResumeDownload = () => {
  return axios.post(RESUME_DOWNLOAD_API_URL);
};

export const trackPortfolioView = () => {
  return axios.post(`${ANALYTICS_API_URL}/portfolio-view`);
};
