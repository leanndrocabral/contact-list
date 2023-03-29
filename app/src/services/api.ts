import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://projeto-fullstack.vercel.app/api",
});
