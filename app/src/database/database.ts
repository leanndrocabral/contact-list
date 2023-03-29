import { PrismaClient } from "@prisma/client";
import { withExclude } from "prisma-exclude";

export const database = withExclude(new PrismaClient());
