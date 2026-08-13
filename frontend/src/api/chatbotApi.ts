import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/chat`;

export const sendMessage = (message: string) => {
  return axios.post(API_URL, {
    message,
  });
};
