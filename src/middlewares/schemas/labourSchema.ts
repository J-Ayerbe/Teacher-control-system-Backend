import { z } from "zod";

const labourSchema = z.object({
  nameWork:z.string(),
  isActive: z.boolean(),
  labourType: z.string(),
  assignedHours: z.number().int().min(1).max(100),
}).strict("Se enviaron campos que no están permitidos")

export default labourSchema;