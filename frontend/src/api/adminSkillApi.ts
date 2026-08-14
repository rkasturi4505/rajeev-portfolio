import api from "./axiosConfig";

const API_URL = "/api/skills";

// ==========================================================
// GET SKILLS
// ADMIN
// ==========================================================

export const getSkills = () => {
  return api.get(API_URL);
};

// ==========================================================
// ADD SKILL
// ADMIN
// ==========================================================

export const addSkill = (skill: any) => {
  return api.post(API_URL, skill);
};

// ==========================================================
// UPDATE SKILL
// ADMIN
// ==========================================================

export const updateSkill = (
  id: number,
  skill: any
) => {
  return api.put(`${API_URL}/${id}`, skill);
};

// ==========================================================
// DELETE SKILL
// ADMIN
// ==========================================================

export const deleteSkill = (id: number) => {
  return api.delete(`${API_URL}/${id}`);
};