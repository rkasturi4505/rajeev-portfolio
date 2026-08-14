import api from "./axiosConfig";

const API_URL = "/api/resume";

// ==========================================================
// GET ALL RESUMES
// ==========================================================

export const getResumes = () => {
  return api.get(API_URL);
};

// ==========================================================
// GET RESUME BY ID
// ==========================================================

export const getResumeById = (id: number) => {
  return api.get(`${API_URL}/${id}`);
};

// ==========================================================
// UPLOAD RESUME
// Accepts File directly from ResumeManagement.tsx
// ==========================================================

export const uploadResume = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==========================================================
// DELETE RESUME
// ADMIN ONLY
// JWT is automatically attached by axiosConfig
// ==========================================================

export const deleteResume = (id: number) => {
  return api.delete(`${API_URL}/${id}`);
};
