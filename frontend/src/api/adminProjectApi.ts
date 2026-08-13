import api from "./axiosConfig";

export const getProjects = () => {
  return api.get("/api/projects");
};

export const addProject = (project: any) => {
  return api.post("/api/projects", project);
};

export const updateProject = (id: number, project: any) => {
  return api.put(`/api/projects/${id}`, project);
};

export const deleteProject = (id: number) => {
  return api.delete(`/api/projects/${id}`);
};
