import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://listadeconntatos.vercel.app/api",
  headers: { "Access-Control-Allow-Origin": "*" },
});
