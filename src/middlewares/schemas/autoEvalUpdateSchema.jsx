import { z } from "zod";

export const autoEvaluationSchemaCoordinador = z
  .object({
    state: z.enum(["En ejecución", "Terminado", "Suspendido"]),
    observation: z.string().optional(),
  })
  .strict("Se enviaron campos que no están permitidos");

export const autoEvaluationSchemaDocent = z
  .object({
    state: z.enum(["En ejecución", "Terminado", "Suspendido"]),
    observation: z.string().optional(),
  })
  .strict("Se enviaron campos que no están permitidos");
