import { Prisma } from "@prisma/client";
import { decode, JwtPayload } from "jsonwebtoken";
import { database } from "../../../database/database";
import { verifyToken } from "../../../utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

const clientId = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const token = request.headers.authorization!.split(" ")[1];
    verifyToken(token, response);

    const contact = await database.contact.findFirstOrThrow({
      where: { id: request.query.id as string },
    });

    const decoded = decode(token) as JwtPayload;
    if (!decoded.sub?.includes(contact.userId)) {
      return response
        .status(401)
        .json({ message: "Contact does not belong to your list." });
    }

    const method = request.method;

    switch (method) {
      case "GET":
        return response.status(200).json(contact);

      case "PATCH":
        const updatedContact = await database.contact.update({
          data: { ...request.body },
          where: { id: request.query.id as string },
          select: database.$exclude("contact", ["userId"]),
        });
        return response.status(201).json(updatedContact);

      case "DELETE":
        await database.contact.delete({
          where: { id: request.query.id as string },
        });
        return response.status(204).end();
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(404).json({ message: "Contact not found." });
    }
    return response.status(500).json({ message: "Internal server error." });
  }
};

export default clientId;
