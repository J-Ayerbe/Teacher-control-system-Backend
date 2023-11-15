import { z } from "zod";

const sendEmailSchema = z.object({
    email: z.string().email(),
    content: z.string().min(3).max(500),
});

export default sendEmailSchema;