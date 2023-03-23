import { z } from "zod";

export const contact = z.object({
  fullName: z
    .string()
    .min(10, "Full name must be at least 10 characters long.")
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/),
  email: z.string().email(),
  telephone: z
    .string()
    .regex(/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/),
});
