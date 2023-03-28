import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../database/database";
import { Contact, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import exclude from "../../../utils/exclude";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { method, body, query, headers } = request;

    const token = headers.authorization!.split(" ")[1];
    const id = query.id!.toString();

    jwt.verify(token, process.env.SECRET_KEY as string, (error) => {
      if (error) {
        return response.status(401).json({ message: error.message });
      }
    });
    const decoded = decode(token) as JwtPayload;

    const contact = (await prisma.contact.findFirstOrThrow({
      where: { id },
    })) as Contact;

    if (decoded.sub !== contact.userId) {
      return response
        .status(401)
        .json({ message: "Contact does not belong to your list." });
    }

    switch (method) {
      case "GET":
        return response.status(200).json(contact);

      case "PATCH":
        const contactUpdated = await prisma.contact.update({
          where: { id },
          data: { ...body },
        });
        const contactWithoutUserId = exclude(contactUpdated, ["userId"]);
        return response.status(201).json(contactWithoutUserId);

      case "DELETE":
        await prisma.contact.delete({ where: { id } });
        return response.status(204).end();
    }
  } catch (error) {
    switch (true) {
      case error instanceof Prisma.PrismaClientKnownRequestError:
        return response.status(404).json({ message: "Contact not found." });

      case error instanceof Prisma.PrismaClientUnknownRequestError:
        return response.status(500).json({ message: "Internal server error." });
    }
  }
};

export default handler;
