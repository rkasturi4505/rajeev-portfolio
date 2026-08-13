import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ===========================
   PUBLIC API
=========================== */

export const getExperiences = () => axios.get(`${API_URL}/experience`);

/* ===========================
   ADMIN API
=========================== */

export const addExperience = (experience: any) =>
  axios.post(`${API_URL}/admin/experience`, experience, getAuthHeaders());

export const updateExperience = (id: number, experience: any) =>
  axios.put(`${API_URL}/admin/experience/${id}`, experience, getAuthHeaders());

export const deleteExperience = (id: number) =>
  axios.delete(`${API_URL}/admin/experience/${id}`, getAuthHeaders());
