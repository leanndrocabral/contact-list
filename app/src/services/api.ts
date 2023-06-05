import axios from "axios";
import "dotenv/config";

export const apiRequest = axios.create({
  baseURL: "https://listadeconntatos.vercel.app/api",
});
