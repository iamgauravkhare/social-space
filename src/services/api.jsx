import axios from "axios";
axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: "https://social-space-gur6.onrender.com",
});
