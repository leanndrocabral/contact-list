import { createContext } from "react";
import { apiRequest } from "../services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { notify } from "../utils/toasts";
import {
  ContextProps,
  Context,
  CreateClientInput,
  LoginInput,
} from "../interfaces/interfaces";
import exclude from "../utils/exclude";

export const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }: ContextProps) => {
  const { push } = useRouter();

  const clientLogin = async (payload: LoginInput) => {
    try {
      const { data } = await apiRequest.post("/login", payload);

      setCookie(null, "@client:token", data.token, {
        maxAge: 86400 * 7,
        path: "/",
      });

      push("/dashboard");
    } catch {
      notify("Senha ou e-mail incorreto.");
    }
  };

  const createClient = async (payload: CreateClientInput) => {
    try {
      const { firstName, lastName } = payload;

      const client = {
        ...payload,
        fullName: `${firstName} ${lastName}`,
      };
      const formattedUser = exclude(client, ["firstName", "lastName"]);
      await apiRequest.post("/clients", formattedUser);

      push("/signin");
    } catch (error) {
      const { message } = error.response.data;

      if (message.includes("email")) {
        notify("Este e-mail já está em uso.");
      }
      notify("Este telefone já está em uso.");
    }
  };

  return (
    <AuthContext.Provider value={{ clientLogin, createClient }}>
      {children}
    </AuthContext.Provider>
  );
};
