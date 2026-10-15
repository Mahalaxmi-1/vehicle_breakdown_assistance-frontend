import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:8080" : "");
const baseURL = rawApiUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

api.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();
  if (!["post", "put", "patch", "delete"].includes(method)) return config;

  // Spring issues the readable CSRF cookie here; the session cookie stays HttpOnly.
  await api.get("/api/auth/csrf");
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;
    if (error.response?.status === 401 && url !== "/api/auth/me" && url !== "/api/auth/login") {
      window.dispatchEvent(new Event("roadassist:session-expired"));
    }
    return Promise.reject(error);
  }
);

export default api;
