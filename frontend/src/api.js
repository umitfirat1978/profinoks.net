import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Do not hardcode URL or port; REACT_APP_BACKEND_URL is configured via .env
const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

export async function fetchHomePageData() {
  const response = await apiClient.get("/home");
  return response.data;
}

export default apiClient;
