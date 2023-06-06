import jwt from "jsonwebtoken";

import { compare } from "bcryptjs";
import { database } from "../../database/database";
import type { NextApiRequest, NextApiResponse } from "next";

async function signIn(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { password, email } = request.body;

      const user = await database.client.findUniqueOrThrow({
        where: { email },
      });
      await compare(password, user.password);

      const token = jwt.sign({}, process.env.SECRET_KEY as string, {
        expiresIn: "72h",
        subject: user.id,
      });

      return response.status(200).json({ token });
    } catch (error) {
      return response
        .status(403)
        .json({ message: "Incorrect email or password." });
    }
  }
}

export default signIn;
