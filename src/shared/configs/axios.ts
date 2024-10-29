import axios from "axios";

export const mainAPI = axios.create({
  baseURL: import.meta.env.VITE_MAIN_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const encAPI = axios.create({
  baseURL: import.meta.env.VITE_ENC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
