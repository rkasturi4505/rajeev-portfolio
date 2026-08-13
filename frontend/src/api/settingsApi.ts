import api from "./axiosConfig";

export interface Settings {
  id?: number;

  adminName: string;

  adminEmail: string;

  role: string;

  applicationName: string;

  backendTechnology: string;

  frontendTechnology: string;
}

/*
==========================================================
    GET SETTINGS
==========================================================
*/

export const getSettings = () => {
  return api.get<Settings>("/settings");
};

/*
==========================================================
    UPDATE SETTINGS
==========================================================
*/

export const updateSettings = (id: number, settings: Settings) => {
  return api.put<Settings>(`/settings/${id}`, settings);
};
