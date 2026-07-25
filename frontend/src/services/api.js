import axios from "axios";

const API = axios.create({
  baseURL: "https://jobboardapp-f7n0.onrender.com/api/jobs"
});

export default API;