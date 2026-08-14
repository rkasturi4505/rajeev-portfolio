import api from "./axiosConfig";

const API_URL = "/api";

// ==========================================================
// GET EXPERIENCES
// PUBLIC
// ==========================================================

export const getExperiences = () => {
  return api.get(`${API_URL}/experience`);
};

// ==========================================================
// ADD EXPERIENCE
// ADMIN
// ==========================================================

export const addExperience = (experience: any) => {
  return api.post(`${API_URL}/admin/experience`, experience);
};

// ==========================================================
// UPDATE EXPERIENCE
// ADMIN
// ==========================================================

export const updateExperience = (id: number, experience: any) => {
  return api.put(`${API_URL}/admin/experience/${id}`, experience);
};

// ==========================================================
// DELETE EXPERIENCE
// ADMIN
// ==========================================================

export const deleteExperience = (id: number) => {
  return api.delete(`${API_URL}/admin/experience/${id}`);
};
