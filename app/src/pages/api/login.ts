import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prisma } from "../../db/db";;
import { Client } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { password, email } = request.body;

  const user = (await prisma.client.findFirst({ where: { email } })) as Client;

  if (user) {
    
    const passCompare = await compare(password, user.password);

    if (passCompare) {
      const token = jwt.sign({}, process.env.SECRET_KEY as string, {
        expiresIn: "72h",
        subject: user.id,
      });
      return response.status(200).json({ token });
    }
  }
  return response.status(400).json({ message: "Incorrect email or password" });
}

export default handler;
