import axios from "axios";
import { API_URL } from "../../restApi";

export const resetPassword = Email => {
  let config = {
    Email
  };

  return axios.post(API_URL + "User/resetPassword", config);
};
