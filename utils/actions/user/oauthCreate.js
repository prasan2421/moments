import axios from "axios";
import { API_URL } from "../../restApi";

export const createUserOAuth = (FirstName, LastName, Email) => {
  let config = {
    FirstName,
    LastName,
    Email,
    Password: "Serviceee" // This value has to be in frontend part,
  };

  return axios.post(API_URL + "OAuth/create", config);
};
