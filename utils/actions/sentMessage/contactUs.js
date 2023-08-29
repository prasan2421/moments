import { axiosInstance } from "../../restApi";

export const contactUs = Message => {
  let config = {
    Message
  };

  return axiosInstance.post("User/contactUs", config);
};
