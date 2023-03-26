import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../db/db";
import exclude from "../../../utils/exclude";
import { Client, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
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
    const user = (await prisma.client.findFirstOrThrow({
      where: { id },
    })) as Client;

    if (decoded.sub !== user.id) {
      return response
        .status(401)
        .json({ message: "No permission to access another user." });
    }

    switch (method) {
      case "GET":
        const userWithoutPassword = exclude(user, ["password"]);
        return response.status(200).json(userWithoutPassword);

      case "PATCH":
        const userUpdated = await prisma.client.update({
          where: { id },
          data: { ...body },
        });
        const userUpdatedWithoutPassword = exclude(userUpdated, ["password"]);
        return response.status(200).json(userUpdatedWithoutPassword);

      case "DELETE":
        await prisma.client.delete({ where: { id } });
        return response.status(204).end();
    }
  } catch (error) {
    switch (true) {
      case error instanceof Prisma.PrismaClientKnownRequestError:
        return response.status(404).json({ message: "Not found user." });

      case error instanceof Prisma.PrismaClientUnknownRequestError:
        return response.status(500).json({ message: "Internal server error." });
    }
  }
}
