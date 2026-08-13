import api from "./axiosConfig";

const API = "/api/admin/messages";

export const getMessages = () => {
  return api.get(API);
};

export const deleteMessage = (id: number) => {
  return api.delete(`${API}/${id}`);
};
