import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://conntactlist.vercel.app/api"
});
