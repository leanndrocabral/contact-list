import { z } from "zod";

export const client = z.object({
  fullName: z
    .string()
    .min(10, "Full name must be at least 10 characters long.")
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/),
  email: z.string().email(),
  password: z.string().min(8, "The password must have at least 8 characters."),
  telephone: z
    .string()
    .regex(/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/),
});
