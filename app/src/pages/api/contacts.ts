import { database } from "../../database/database";
import { decode, JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

const contacts = async (request: NextApiRequest, response: NextApiResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  
  try {
    const token = request.headers.authorization!.split(" ")[1];
    verifyToken(token, response);

    const decoded = decode(token) as JwtPayload;
    const method = request.method;

    switch (method) {
      case "POST":
        const contact = await database.contact.create({
          data: { ...request.body, userId: decoded.sub },
          select: database.$exclude("contact", ["userId"]),
        });
        return response.status(201).json(contact);

      case "GET":
        const contacts = await database.contact.findMany({
          orderBy: { fullName: "asc" },
          where: { userId: decoded.sub },
          select: database.$exclude("contact", ["userId"]),
        });
        return response.status(200).json(contacts);
    }
  } catch (error) {
    return response.status(500).json({ message: "Internal server error." });
  }
};

export default contacts;
