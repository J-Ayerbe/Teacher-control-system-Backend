import { z } from "zod";

const labourSchema=z.object({
     id: z.number().int().gte(1).lte(10),
     description: z.string().min(3).max(50),
     assignedHours:z.number().int().gte(1).lte(100),
     isActive:z.boolean(),
});