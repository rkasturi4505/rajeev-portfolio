import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/resume-downloads`;

export const trackResumeDownload = async () => {
  try {
    const response = await axios.post(API_URL);

    return response.data;
  } catch (error) {
    console.error("Resume download tracking failed:", error);

    throw error;
  }
};

export const getResumeDownloads = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch resume downloads:", error);

    throw error;
  }
};
