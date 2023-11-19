import { z } from "zod";

const labourSchema=z.object({
     nameWork:z.string(),
     isActive:z.boolean(),
     labourType:z.object({
          idLabourType:z.number().int().gte(1).lte(14),
          code:z.string(),
          description:z.string(),
     }),
    assignedHours:z.number().int().gte(1).lte(100),
});