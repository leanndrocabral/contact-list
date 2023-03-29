import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { decode, JwtPayload } from "jsonwebtoken";
import { database } from "../../../database/database";
import { verifyToken } from "../../../utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

const contactId = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const token = request.headers.authorization!.split(" ")[1];
    verifyToken(token, response);

    const client = await database.client.findFirstOrThrow({
      where: { id: request.query.id as string },
      select: database.$exclude("client", ["password"]),
    });

    const decoded = decode(token) as JwtPayload;
    if (!decoded.sub?.includes(client.id)) {
      return response
        .status(401)
        .json({ message: "No permission to access another user." });
    }

    const method = request.method;

    switch (method) {
      case "GET":
        return response.status(200).json(client);

      case "PATCH":
        const password = await hash(request.body.password, 10);

        const clientUpdated = await database.client.update({
          data: { ...request.body, password },
          where: { id: request.query.id as string },
          select: database.$exclude("client", ["password"]),
        });
        return response.status(200).json(clientUpdated);

      case "DELETE":
        await database.client.delete({
          where: { id: request.query.id as string },
        });
        return response.status(204).end();
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(404).json({ message: "Client not found." });
    }
    return response.status(500).json({ message: "Internal server error." });
  }
};

export default contactId;
