import { z } from "zod";

export const createContactApiSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name must be at least 1 characters long.")
    .regex(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "The full name must not contain numbers."
    ),
  email: z.string().email(),
  telephone: z
    .string()
    .regex(/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/, "Invalid phone number."),
  avatar: z.string().url(),
});

export const updateContactApiSchema = createContactApiSchema.partial();
