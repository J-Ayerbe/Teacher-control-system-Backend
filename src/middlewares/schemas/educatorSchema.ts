import { z } from "zod";

const userSchema = z.object({
  identification: z.string().min(5).max(11),
  email: z.string().email("Not a valid email"),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }).max(15, {
    message: "Password must be at most 15 characters long",
  }),
  docentType:z.enum(["Tiempo Completo", "Planta", "Cátedra"]),
  idType: z.string().min(2).max(10),
  title: z.string(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(3).max(50),
  role: z.enum(["Coordinador", "Decano", "Docente"]),
});

export default userSchema;
