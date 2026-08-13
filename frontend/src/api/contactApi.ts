import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API = `${API_BASE_URL}/api/messages`;

export const sendMessage = (message: any) => {
  return axios.post(API, message);
};
