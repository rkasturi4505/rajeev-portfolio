import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

export const getProfile = () => {
  return axios.get(
    `${API_BASE_URL}/api/portfolio`
  );
};