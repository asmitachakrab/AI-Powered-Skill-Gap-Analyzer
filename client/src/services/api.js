import axios from "axios";

// 🌐 Use ENV in production, fallback to deployed backend
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://ai-powered-skill-gap-analyzer-backend.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL
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
      if (error.response.status === 401) {
        console.warn("Unauthorized! Logging out...");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default API;