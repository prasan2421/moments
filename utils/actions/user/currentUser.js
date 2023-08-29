import { axiosInstance } from "../../restApi";

export const currentUser = () => {
  return axiosInstance.get("User/");
};
