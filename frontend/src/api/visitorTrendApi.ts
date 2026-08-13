import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/visitor-trends`;

export const getLast7DaysTrend = () => {
  return axios.get(`${API_URL}/last7days`);
};

export const getLast30DaysTrend = () => {
  return axios.get(`${API_URL}/last30days`);
};

export const getMonthlyTrend = () => {
  return axios.get(`${API_URL}/monthly`);
};
