import axios from "axios";

// 🌐 Base URL (auto-switch for production later)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = token;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// 🚨 Handle global errors (like token expiry)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 🔴 Token expired / invalid
      if (error.response.status === 401) {
        console.warn("Unauthorized! Logging out...");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default API;