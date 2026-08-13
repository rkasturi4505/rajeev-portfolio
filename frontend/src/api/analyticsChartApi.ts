import api from "./axiosConfig";

export interface ChartResponse {
  labels: string[];
  values: number[];
}

// ==========================================================
// VISITOR TREND
// ==========================================================

export const getVisitorTrend = async (): Promise<ChartResponse> => {
  const response = await api.get("/analytics/charts/visitor-trend");
  return response.data;
};

// ==========================================================
// DEVICE TYPES
// ==========================================================

export const getDeviceTypes = async (): Promise<ChartResponse> => {
  const response = await api.get("/analytics/charts/device-types");
  return response.data;
};

// ==========================================================
// BROWSER USAGE
// ==========================================================

export const getBrowserUsage = async (): Promise<ChartResponse> => {
  const response = await api.get("/analytics/charts/browser-usage");
  return response.data;
};

// ==========================================================
// COUNTRY STATISTICS
// ==========================================================

export const getCountryStatistics = async (): Promise<ChartResponse> => {
  const response = await api.get("/analytics/charts/countries");
  return response.data;
};

// ==========================================================
// TOP VISITED PAGES
// ==========================================================

export const getTopVisitedPages = async (): Promise<ChartResponse> => {
  const response = await api.get("/analytics/charts/top-pages");
  return response.data;
};
