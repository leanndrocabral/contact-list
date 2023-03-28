import { Contact } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface ContextProps {
  children: React.ReactNode;
}

export interface Context {
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
  contactsList: any[];
  setContactsList: Dispatch<SetStateAction<any[]>>;
}

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
