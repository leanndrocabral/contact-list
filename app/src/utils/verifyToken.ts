import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export const verifyToken = (token: string, response: NextApiResponse) => {
  jwt.verify(token, process.env.SECRET_KEY as string, (error) => {
    if (error) {
      return response.status(401).json({ message: error.message });
    }
  });
};
