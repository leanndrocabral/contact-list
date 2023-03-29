import { createContext, useState } from "react";
import {
  ContextProps,
  Context,
  Contact,
} from "../interfaces/frontend/interfaces";

export const ContactContext = createContext({} as Context);

export const ContactProvider = ({ children }: ContextProps) => {
  const defaultAvatar = `https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524`;

  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [contactsList, setContactsList] = useState<Contact[]>([]);

  return (
    <ContactContext.Provider
      value={{
        defaultAvatar,
        avatar,
        setAvatar,
        contactsList,
        setContactsList,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
