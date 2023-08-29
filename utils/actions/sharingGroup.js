import { axiosInstance } from "../restApi";

export const getGroups = () => {
  return axiosInstance.get("/SharingGroup");
};

export const addGroup = group => {
  let config = {
    Name: group.sharingGroups,
    members: group.emails
  };
  return axiosInstance.post("/SharingGroup", config);
};

export const deleteGroup = group => {
  return axiosInstance.delete(`/SharingGroup/${group.id}`);
};

export const updateGroup = sharingGroup => {
  let config = {
    id: sharingGroup.id,
    Name: sharingGroup.sharingGroups,
    members: sharingGroup.emails
  };
  return axiosInstance.patch("/SharingGroup", config);
};
