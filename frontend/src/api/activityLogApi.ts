import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/activity-logs`;

/* ==========================================================
   LOG NEW ACTIVITY
========================================================== */

export const logActivity = async (activity: string) => {
  try {
    const response = await axios.post(API_URL, {
      activity,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to log activity:", error);

    throw error;
  }
};

/* ==========================================================
   GET ALL ACTIVITY LOGS
========================================================== */

export const getActivityLogs = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);

    throw error;
  }
};
