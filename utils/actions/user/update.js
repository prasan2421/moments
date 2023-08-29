import { axiosInstance } from "../../restApi";

export const updateUser = (
  FirstName,
  LastName,
  Email,
  Password,
  SeenOnBoarding
) => {
  let config = {
    FirstName,
    LastName,
    Email,
    Password,
    SeenOnBoarding
  };

  return axiosInstance.patch("User/", config);
};
