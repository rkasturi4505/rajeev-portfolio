import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/education`;

export const getEducation = () => {
  return axios.get(API_URL);
};
