import axios from "axios";

const API = axios.create({
  baseURL: "/api", // ✅ no need to hardcode localhost
});

export const generateResume = (payload) => API.post("/resume/generate", payload);
