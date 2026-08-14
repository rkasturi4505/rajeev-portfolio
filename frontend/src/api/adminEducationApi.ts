import api from "./axiosConfig";

const API_URL = "/api/education";

// ==========================================================
// GET EDUCATION
// ADMIN
// ==========================================================

export const getEducation = () => {
  return api.get(API_URL);
};

// ==========================================================
// ADD EDUCATION
// ADMIN
// ==========================================================

export const addEducation = (education: any) => {
  return api.post(API_URL, education);
};

// ==========================================================
// UPDATE EDUCATION
// ADMIN
// ==========================================================

export const updateEducation = (id: number, education: any) => {
  return api.put(`${API_URL}/${id}`, education);
};

// ==========================================================
// DELETE EDUCATION
// ADMIN
// ==========================================================

export const deleteEducation = (id: number) => {
  return api.delete(`${API_URL}/${id}`);
};
