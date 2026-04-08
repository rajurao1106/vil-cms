import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://vil-cms-dhct.vercel.app/api",
});

axiosClient.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default axiosClient;