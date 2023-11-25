import { z } from "zod";

const periodSchema = z.object({
    name: z.string().min(3).max(50),
    year: z.string().min(3).max(5),
    semester: z.number().int().gte(1).lte(2),
  startDate: z.string().transform((value) => new Date(value)),
  endDate: z.string().transform((value) => new Date(value)),
}).strict("Se enviaron campos que no están permitidos")

export default periodSchema;