import axiosInstance from "./axiosInstance";

/* ==========================================================
   ACTIVITY LOG API
   ========================================================== */

/*
 * Activity logs are ADMIN ONLY.
 *
 * axiosInstance automatically attaches:
 *
 * Authorization: Bearer <JWT>
 *
 * from localStorage.
 */

/* ==========================================================
   LOG NEW ACTIVITY
========================================================== */

export const logActivity = async (activity: string) => {
  try {
    const response = await axiosInstance.post("/api/activity-logs", {
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
    const response = await axiosInstance.get("/api/activity-logs");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);

    throw error;
  }
};
