import axios from "axios";

const api = axios.create({
  baseURL: "https://agrofix-project.onrender.com/",
});

export default api;
