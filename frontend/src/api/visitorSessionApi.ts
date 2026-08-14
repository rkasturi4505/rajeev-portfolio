import api from "./axiosConfig";

// ==========================================================
// VISITOR SESSION API
// ==========================================================

const API_URL = "/api/visitor-sessions";

// ==========================================================
// GET ALL VISITOR SESSIONS
// ADMIN ONLY
// ==========================================================

export const getVisitorSessions = () => {
  return api.get(API_URL);
};

// ==========================================================
// GET VISITOR SESSION BY ID
// ADMIN ONLY
// ==========================================================

export const getVisitorSessionById = (id: number) => {
  return api.get(`${API_URL}/${id}`);
};

// ==========================================================
// CREATE VISITOR SESSION
// PUBLIC
// ==========================================================

export const createVisitorSession = (data: any) => {
  return api.post(API_URL, data);
};

// ==========================================================
// DELETE VISITOR SESSION
// ADMIN ONLY
// ==========================================================

export const deleteVisitorSession = (id: number) => {
  return api.delete(`${API_URL}/${id}`);
};

// ==========================================================
// SEARCH BY VISITOR NAME
// ADMIN ONLY
// ==========================================================

export const searchVisitorSessions = (name: string) => {
  return api.get(`${API_URL}/search`, {
    params: {
      name,
    },
  });
};

// ==========================================================
// SEARCH BY COMPANY
// ADMIN ONLY
// ==========================================================

export const searchVisitorSessionsByCompany = (company: string) => {
  return api.get(`${API_URL}/company`, {
    params: {
      company,
    },
  });
};

// ==========================================================
// DATE FILTER
// ADMIN ONLY
// ==========================================================

export const getVisitorSessionsBetween = (
  start: string,
  end: string
) => {
  return api.get(`${API_URL}/between`, {
    params: {
      start,
      end,
    },
  });
};

// ==========================================================
// COUNT VISITS
// ADMIN ONLY
// ==========================================================

export const countVisitorSessionsBetween = (
  start: string,
  end: string
) => {
  return api.get(`${API_URL}/count`, {
    params: {
      start,
      end,
    },
  });
};