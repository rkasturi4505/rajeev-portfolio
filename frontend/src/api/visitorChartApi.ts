import api from "./axiosConfig";

export const getDeviceChart = () => api.get("/visitor-sessions/charts/device");

export const getBrowserChart = () =>
  api.get("/visitor-sessions/charts/browser");

export const getCountryChart = () =>
  api.get("/visitor-sessions/charts/country");

export const getCompanyChart = () =>
  api.get("/visitor-sessions/charts/company");

export const getPageChart = () => api.get("/visitor-sessions/charts/pages");
