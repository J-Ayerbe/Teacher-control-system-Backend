import { z } from "zod";

export const toggleAutoEvalSchema = z.object({
    state: z.boolean()
});


