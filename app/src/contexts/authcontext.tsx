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
  UpdateContactInput,
} from "../interfaces/interfaces";
import exclude from "../utils/exclude";
import { Client } from "@prisma/client";

export const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }: ContextProps) => {
  const { push } = useRouter();
  const defaultAvatar =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?t=st=1679855981~exp=1679856581~hmac=6681675914004cb933ae85aab7f8ff08fa0390d73d1c3aed629c7adcd70dc651";
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [contact, setContact] = useState<Client | null>(null);

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
      const response = await apiRequest.post("/contacts", formattedContact);

      setContacts([...contacts, response.data]);

      notifySuccess("Contato criado.");
    } catch (error) {
      const { message } = error.response.data;

      if (message.includes("email")) {
        notifyError("Este e-mail já está associado a um contato.");
      }
      notifyError("Este telefone já está associado a um contato.");
    }
  };

  const getContact = async (id: string, callback: Function) => {
    const cookies = parseCookies();
    const token = cookies._clientToken;

    apiRequest.defaults.headers.authorization = `Bearer ${token}`;
    const response = await apiRequest.get(`/contacts/${id}`);

    setContact(response.data);
    setAvatar(response.data.avatar);

    callback();
  };

  const updateContact = async (payload: UpdateContactInput) => {
    const cookies = parseCookies();
    const token = cookies._clientToken;

    apiRequest.defaults.headers.authorization = `Bearer ${token}`;

    const { firstName, lastName } = payload;
    const updatedContact = {
      ...payload,
      avatar,
      fullName: `${firstName} ${lastName}`,
    };

    const formattedContact = exclude(updatedContact, ["firstName", "lastName"]);
    const response = await apiRequest.patch(
      `/contacts/${contact!.id}`,
      formattedContact
    );

    const index = contacts.findIndex(
      (contact) => contact.id === response.data.id
    );
    contacts.splice(index, 1, response.data);
    setContacts(contacts);
  };

  return (
    <AuthContext.Provider
      value={{
        avatar,
        contacts,
        contact,
        setAvatar,
        clientLogin,
        createClient,
        logoutClient,
        createContact,
        getContact,
        setContacts,
        updateContact,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
