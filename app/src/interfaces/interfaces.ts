import { Client } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateClientInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
}

export interface ContextProps {
  children: React.ReactNode;
}

export interface Context {
  avatar: string;
  contacts: Contacts[];
  contact: Client | null;
  setAvatar: Dispatch<SetStateAction<string>>;
  createClient: (payload: CreateClientInput) => Promise<void>;
  clientLogin: (payload: LoginInput) => Promise<void>;
  logoutClient: () => void;
  createContact: (payload: CreateContactInput) => Promise<void>;
  getContact: (id: string, callback: Function) => Promise<void>;
  setContacts: Dispatch<SetStateAction<Contacts[]>>;
  updateContact: (payload: UpdateContactInput) => Promise<void>;
}

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  avatar: string;
}

export interface UpdateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  avatar?: string;
}

export interface Contacts {
  id: string;
  avatar: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  telephone: string;
}
