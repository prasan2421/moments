import axios from "axios";
import { API_URL } from "../../restApi";

export const authenticateUserOAuth = (Email, Password) => {
  let config = {
    Email,
    Password
  };

  return axios.post(API_URL + "OAuth/authenticate", config);
};
