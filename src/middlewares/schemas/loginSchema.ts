import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Not a valid email"),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }).max(15, {
    message: "Password must be at most 15 characters long",
  }),
});

export default loginSchema;