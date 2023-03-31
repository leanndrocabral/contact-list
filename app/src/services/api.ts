import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://listadecontatospage.vercel.app/api",
});
