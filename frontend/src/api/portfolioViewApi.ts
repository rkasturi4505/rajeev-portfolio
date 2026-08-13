import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/portfolio-views`;

export const trackPortfolioView = async () => {
  try {
    const response = await axios.post(API_URL);

    return response.data;
  } catch (error) {
    console.error("Portfolio view tracking failed:", error);

    throw error;
  }
};

export const getPortfolioViews = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio views:", error);

    throw error;
  }
};
