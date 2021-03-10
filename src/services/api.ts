import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.4:8000",
  withCredentials: true,
  headers: { Accept: "application/json" },
});
