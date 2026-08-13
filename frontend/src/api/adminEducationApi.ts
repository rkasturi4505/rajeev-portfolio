import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/education`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getEducation = () => {
  return axios.get(API_URL);
};

export const addEducation = (education: any) => {
  return axios.post(API_URL, education, getAuthHeaders());
};

export const updateEducation = (id: number, education: any) => {
  return axios.put(`${API_URL}/${id}`, education, getAuthHeaders());
};

export const deleteEducation = (id: number) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
