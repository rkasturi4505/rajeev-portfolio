import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/visitor-sessions`;

// ==========================================================
// GET ALL VISITOR SESSIONS
// ==========================================================

export const getVisitorSessions = () => {
  return axios.get(API_URL);
};

// ==========================================================
// GET VISITOR SESSION BY ID
// ==========================================================

export const getVisitorSessionById = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

// ==========================================================
// CREATE VISITOR SESSION
// ==========================================================

export const createVisitorSession = (data: any) => {
  return axios.post(API_URL, data);
};

// ==========================================================
// DELETE VISITOR SESSION
// ==========================================================

export const deleteVisitorSession = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

// ==========================================================
// SEARCH BY VISITOR NAME
// ==========================================================

export const searchVisitorSessions = (name: string) => {
  return axios.get(`${API_URL}/search`, {
    params: {
      name,
    },
  });
};

// ==========================================================
// SEARCH BY COMPANY
// ==========================================================

export const searchVisitorSessionsByCompany = (company: string) => {
  return axios.get(`${API_URL}/company`, {
    params: {
      company,
    },
  });
};

// ==========================================================
// DATE FILTER
// ==========================================================

export const getVisitorSessionsBetween = (start: string, end: string) => {
  return axios.get(`${API_URL}/between`, {
    params: {
      start,
      end,
    },
  });
};

// ==========================================================
// COUNT VISITS
// ==========================================================

export const countVisitorSessionsBetween = (start: string, end: string) => {
  return axios.get(`${API_URL}/count`, {
    params: {
      start,
      end,
    },
  });
};
