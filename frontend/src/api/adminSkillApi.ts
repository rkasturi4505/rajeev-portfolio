import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/skills`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getSkills = () => 
  axios.get(API_URL);

export const addSkill = (skill: any) =>
  axios.post(
    API_URL,
    skill,
    getAuthHeaders()
  );

export const updateSkill = (
  id: number,
  skill: any
) =>
  axios.put(
    `${API_URL}/${id}`,
    skill,
    getAuthHeaders()
  );

export const deleteSkill = (id: number) =>
  axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );