import axios from "axios";
import { API_URL } from "../../restApi";

export const handleLogin = (Email, Password) => {
  let config = {
    Email,
    Password
  };

  return axios.post(API_URL + "User/authenticate", config);
};
