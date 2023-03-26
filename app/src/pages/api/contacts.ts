import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { prisma } from "../../db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import exclude from "../../utils/exclude";
import { Prisma } from "@prisma/client";

export async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { method, body, headers } = request;

    const token = headers.authorization!.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (error) => {
      if (error) {
        return response.status(401).json({ message: error.message });
      }
    });

    const decoded = decode(token) as JwtPayload;

    switch (method) {
      case "POST":
        const contact = await prisma.contact.create({
          data: { ...body, userId: decoded.sub },
        });
        const contactWithoutUserId = exclude(contact, ["userId"]);
        return response.status(201).json(contactWithoutUserId);

      case "GET":
        const contacts = await prisma.contact.findMany({
          where: { userId: decoded.sub },
          select: {
            id: true,
            fullName: true,
            email: true,
            telephone: true,
            registrationDate: true,
          },
          orderBy: { id: "asc" },
        });
        return response.status(200).json(contacts);
    }
  } catch (error) {
    if ((error instanceof Prisma.PrismaClientKnownRequestError) as unknown) {
      if (error.meta.target.includes("email")) {
        return response
          .status(400)
          .json({ message: "This email already exists in your contacts." });
      }
      return response
        .status(400)
        .json({ message: "This phone already exists in your contacts." });
    }
  }
}
