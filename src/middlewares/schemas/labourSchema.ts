import { z } from "zod";

export const labourSchema = z.object({
  nameWork:z.string(),
  isActive: z.boolean(),
  labourType: z.string(),
  assignedHours: z.number().int().min(2).max(18),
}).strict("Se enviaron campos que no están permitidos")

export const labourUpdateSchema = z.object({
  nameWork:z.string(),
  isActive: z.boolean(),
  labourType: z.string(),
}).strict("Se enviaron campos que no están permitidos")
