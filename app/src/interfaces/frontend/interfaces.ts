import { Dispatch, SetStateAction } from "react";

export interface ContextProps {
  children: React.ReactNode;
}

export interface Context {
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
  contactsList: Contact[];
  setContactsList: Dispatch<SetStateAction<Contact[]>>;
}

export interface Client {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  telephone: string;
  registrationDate: string;
  userId: string;
}

export interface Contact {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  telephone: string;
  registrationDate: string;
  userId: string;
}

export interface DashboardProps {
  client: Client;
  contacts: Contact[];
}

export interface ContactListProps {
  values: Contact[];
}

export interface CreateClientInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
}

export interface LoginInput {
  email: string;
  password: string;
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
