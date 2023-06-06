import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { database } from "../../database/database";
import { verifyToken } from "../../utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

const clients = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const method = request.method;

    switch (method) {
      case "POST":
        const password = await hash(request.body.password, 10);

        const user = await database.client.create({
          data: { ...request.body, password },
          select: database.$exclude("client", ["password"]),
        });
        return response.status(201).json(user);

      case "GET":
        const token = request.headers.authorization!.split(" ")[1];
        verifyToken(token, response);

        const users = await database.client.findMany({
          orderBy: { fullName: "asc" },
          select: database.$exclude("client", ["password"]),
        });
        return response.status(200).json(users);
    }
  } catch (error) {
    if ((error instanceof Prisma.PrismaClientKnownRequestError) as unknown) {
      if (error.meta.target.includes("email")) {
        return response
          .status(409)
          .json({ message: "This email is already in use." });
      } else if (error.meta.target.includes("telephone")) {
        return response
          .status(409)
          .json({ message: "This phone number is already in use." });
      }
      return response.status(500).json({ message: "Internal server error." });
    }
  }
};

export default clients;
