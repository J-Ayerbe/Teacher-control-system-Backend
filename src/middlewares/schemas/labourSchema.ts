import { z } from "zod";

const labourSchema=z.object({
     nameWork:z.string(),
     isActive:z.boolean(),
     assignedHours:z.number().int().gte(1).lte(100),
     labourType:z.string(),
});

export default labourSchema;