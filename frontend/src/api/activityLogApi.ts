import api from "./axiosConfig";

// ==========================================================
// ACTIVITY LOG API
// ==========================================================

const API_URL = "/api/activity-logs";

// ==========================================================
// LOG NEW ACTIVITY
// ADMIN ONLY
// ==========================================================

export const logActivity = async (activity: string) => {

  try {

    const response = await api.post(API_URL, {
      activity,
    });

    return response.data;

  } catch (error) {

    console.error(
      "Failed to log activity:",
      error
    );

    throw error;
  }
};

// ==========================================================
// GET ALL ACTIVITY LOGS
// ADMIN ONLY
// ==========================================================

export const getActivityLogs = async () => {

  try {

    const response = await api.get(API_URL);

    return response.data;

  } catch (error) {

    console.error(
      "Failed to fetch activity logs:",
      error
    );

    throw error;
  }
};