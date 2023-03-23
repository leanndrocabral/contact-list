import { hash } from "bcryptjs";
import { prisma } from "../../db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import exclude from "../../utils/exclude";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { method, body } = request;

    switch (method) {
      case "POST":
        const password = await hash(body.password, 10);

        const user = await prisma.client.create({
          data: { ...request.body, password },
        });
        const userWithoutPassword = exclude(user, ["password"]);
        return response.status(201).json(userWithoutPassword);

      case "GET":
        const users = await prisma.client.findMany({
          select: {
            id: true,
            fullName: true,
            email: true,
            password: false,
            telephone: true,
            registrationDate: true,
          },
        });
        return response.status(200).json(users);
    }
  } catch (error) {
    if (error?.meta.target[0] === "email") {
      return response
        .status(400)
        .json({ message: "This email is already in use" });
    }
    return response
      .status(400)
      .json({ message: "This phone number is already in use" });
  }
}

export default handler;