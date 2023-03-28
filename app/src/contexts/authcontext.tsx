import { Contact } from "@prisma/client";
import { createContext, useState } from "react";
import { ContextProps, Context } from "../interfaces/interfaces";

export const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }: ContextProps) => {
  const defaultAvatar = `https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?
    t=st=1679855981~exp=1679856581~hmac=6681675914004cb933ae85aab7f8ff08fa0390d73d1c3aed629c7adcd70dc651`;

  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [contactsList, setContactsList] = useState<any[]>([]);

  return (
    <AuthContext.Provider
      value={{
        avatar,
        setAvatar,
        contactsList,
        setContactsList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
