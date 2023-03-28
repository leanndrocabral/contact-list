import { z } from "zod";

export const createClientApiSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name must be at least 1 characters long.")
    .regex(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "The full name must not contain numbers."
    ),
  email: z.string().email(),
  password: z.string().min(8, "The password must have at least 8 characters."),
  telephone: z
    .string()
    .regex(/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/, "Invalid phone number."),
});

export const updateClientApiSchema = createClientApiSchema.partial();
