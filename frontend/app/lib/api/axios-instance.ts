import axios from "axios";
import { getCookie } from "../cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const BASE_URL = `${API_URL}/api/v1`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
