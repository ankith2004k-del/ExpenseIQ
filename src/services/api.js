import axios from "axios";

const api = axios.create({
  baseURL: "https://expenseiq-r7o8.onrender.com",
});

export default api;