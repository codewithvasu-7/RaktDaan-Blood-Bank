import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL || "http://localhost:8080/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor to handle token expiration gracefully (OWASP A07)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes("/auth/login") ||
        error.config?.url?.includes("/auth/register");

      if (!isAuthEndpoint && localStorage.getItem("token")) {
        localStorage.removeItem("token");
        const publicPaths = [
          "/",
          "/blood-stock",
          "/donation-camps",
          "/blood-compatibility",
          "/eligibility-check",
          "/login",
          "/register",
        ];
        if (!publicPaths.includes(window.location.pathname)) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
