export const serverPrefix = "http://3.213.201.221";
export const API_URL = serverPrefix + "/api/";
import axios from "axios";
import DeviceStorage from "./DeviceStorage";

let token = DeviceStorage.get("token");

export const axiosInstance = axios.create({
  baseURL: API_URL
});
