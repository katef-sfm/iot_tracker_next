import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://iot-tracker.duo.cloud";

export function getApiServer() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("api_server") || API_BASE_URL;
  }
  return API_BASE_URL;
}

export const api = axios.create({
  baseURL: getApiServer(),
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    "Cache-Control": "no-cache",
  },
});

api.interceptors.request.use((config) => {
  config.baseURL = getApiServer();
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;