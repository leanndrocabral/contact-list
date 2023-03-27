import { createContext, useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { notifyError, notifySuccess } from "../utils/toast";
import {
  ContextProps,
  Context,
  CreateClientInput,
  LoginInput,
  CreateContactInput,
  Contacts,
} from "../interfaces/interfaces";
import exclude from "../utils/exclude";

export const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }: ContextProps) => {
  const { push } = useRouter();
  const defaultAvatar =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?t=st=1679855981~exp=1679856581~hmac=6681675914004cb933ae85aab7f8ff08fa0390d73d1c3aed629c7adcd70dc651";
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [contacts, setContats] = useState<Contacts[]>([]);

  const clientLogin = async (payload: LoginInput) => {
    try {
      const { data } = await apiRequest.post("/login", payload);

      setCookie(null, "_clientToken", data.token, {
        path: "/",
      });

      push("/dashboard");
    } catch {
      notifyError("Senha ou e-mail incorreto.");
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
        notifyError("Este e-mail já está em uso.");
      }
      notifyError("Este telefone já está em uso.");
    }
  };

  const logoutClient = () => {
    destroyCookie(null, "_clientToken");
    push("/signin");
  };

  const createContact = async (payload: CreateContactInput) => {
    try {
      const cookies = parseCookies();
      const token = cookies._clientToken;

      apiRequest.defaults.headers.authorization = `Bearer ${token}`;

      const { firstName, lastName } = payload;
      const contact = {
        ...payload,
        avatar,
        fullName: `${firstName} ${lastName}`,
      };
      const formattedContact = exclude(contact, ["firstName", "lastName"]);

      await apiRequest.post("/contacts", formattedContact);
      setContats([...contacts, formattedContact]);

      notifySuccess("Contato criado.");
    } catch (error) {
      const { message } = error.response.data;

      if (message.includes("email")) {
        notifyError("Este e-mail já está associado a um contato.");
      }
      notifyError("Este telefone já está associado a um contato.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        clientLogin,
        createClient,
        setAvatar,
        avatar,
        logoutClient,
        createContact,
        setContats,
        contacts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
