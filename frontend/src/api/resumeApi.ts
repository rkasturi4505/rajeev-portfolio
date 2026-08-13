import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/resume`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getResumes = () => axios.get(API_URL);

export const getResumeById = (id: number) => axios.get(`${API_URL}/${id}`);

export const uploadResume = (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      ...getAuthHeaders().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteResume = (id: number) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeaders());
