import api from "./axiosConfig";

export const getCertifications = () => {
  return api.get("/api/certifications");
};

export const addCertification = (certification: any) => {
  return api.post("/api/certifications", certification);
};

export const updateCertification = (
  id: number,
  certification: any
) => {
  return api.put(
    `/api/certifications/${id}`,
    certification
  );
};

export const deleteCertification = (id: number) => {
  return api.delete(`/api/certifications/${id}`);
};