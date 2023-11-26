import { z } from 'zod';

export const autoEvaluationSchema = z.object({
  periodId:z.number().int("El id de la periodo es obligatorio"),
  act: z.boolean(),
  labourId: z.string().min(1, 'El id de la labor es obligatorio'),
  evaluated:z.string().min(1, 'El evaluado es obligatorio')
}).strict('Se enviaron campos que no están permitidos');