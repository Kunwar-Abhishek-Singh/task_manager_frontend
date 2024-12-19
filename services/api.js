
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Adjust this based on your backend API endpoint
});

export default api;