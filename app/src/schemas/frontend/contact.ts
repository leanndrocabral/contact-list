import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "Não deve possuir números"
    ),
  lastName: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "Não deve possuir números"
    ),
  email: z.string().email("E-mail inválido"),
  telephone: z
    .string()
    .regex(
      /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/,
      "Número de telefone inválido"
    ),
});

export const updateContactSchema = createContactSchema;
