import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


/*
==========================================================
JWT REQUEST INTERCEPTOR
Automatically attaches token to secured APIs
==========================================================
*/

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/*
==========================================================
JWT RESPONSE INTERCEPTOR
Handles expired/invalid token
==========================================================
*/

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);


export default apiClient;