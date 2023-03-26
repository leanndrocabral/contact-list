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
  setAvatar: Dispatch<SetStateAction<string>>;
  contacts: Contacts[];
  setContats: Dispatch<SetStateAction<Contacts[]>>;
  logoutClient: () => void;
  clientLogin: (payload: LoginInput) => Promise<void>;
  createClient: (payload: CreateClientInput) => Promise<void>;
  createContact: (payload: CreateContactInput) => Promise<void>;
}

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  avatar: string;
}

export interface Contacts {
  avatar: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  telephone: string;
}
