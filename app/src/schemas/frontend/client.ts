import { z } from "zod";

export const createClientSchema = z.object({
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
  password: z.string().min(8, "A senha deve possuir no minímo 8 caracteres"),
  telephone: z
    .string()
    .regex(
      /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/,
      "Número de telefone inválido"
    ),
});

export const loginClientSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve possuir no minímo 8 caracteres"),
});
