import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Do not hardcode URL or port; REACT_APP_BACKEND_URL is configured via .env
const apiClient = axios.create({
  baseURL: BACKEND_URL ? `${BACKEND_URL}/api` : "/api",
});

// Response interceptor to catch HTML responses (routing issues)
apiClient.interceptors.response.use(response => {
  if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
    return Promise.reject(new Error("API returned HTML instead of JSON. Check server routing."));
  }
  return response;
}, error => {
  if (error.response && typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE html>')) {
    return Promise.reject(new Error("API Route misconfigured: Server returned HTML page."));
  }
  return Promise.reject(error);
});

export async function fetchHomePageData() {
  const response = await apiClient.get("/home");
  return response.data;
}

export default apiClient;
