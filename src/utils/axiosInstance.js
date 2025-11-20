import axios from "axios";

import { serverUrl } from "../config/config.js";

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) =>  response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      if (error.response.status === 403) {
        alert("You do not have permission!");
      }
    }
    return Promise.reject(error);
  }
); 

export default api;
