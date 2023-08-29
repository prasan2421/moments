import axios from "axios";
import { API_URL } from "../../restApi";

export const handleRegister = (FirstName, LastName, Email, Password) => {
  let config = {
    FirstName,
    LastName,
    Email,
    Password
  };

  return axios.post(API_URL + "User/", config);
};
