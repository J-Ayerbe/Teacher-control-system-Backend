import { z } from "zod";

const labourSchema = z.object({
  isActive: z.boolean(),
  labourType: z.object({
    idLabourType: z.number().int().min(1).max(10),
    code: z.string(),
    description: z.string(),
  }),
  assignedHours: z.number().int().min(1).max(100),
});

export default labourSchema;