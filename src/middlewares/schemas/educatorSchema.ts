import { z } from "zod";

const userSchema = z.object({
  id: z.string().min(4).max(10),
  name: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  idType: z.string().min(2).max(4),
  typeUser: z.string(),
  email: z.string().email("Not a valid email"),
  gender: z.string(),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters long",
    })
    .max(15, {
      message: "Password must be at most 15 characters long",
    }),
  title: z
    .string()
    .max(2, "Title must be max 2 characters long")
    .min(2, "Title must be at least 2 characters long"),
});

export default userSchema;
