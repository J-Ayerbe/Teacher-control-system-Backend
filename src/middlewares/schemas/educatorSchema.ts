import { z } from "zod";

export const userSchema = z.object({
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
}).strict("Se enviaron campos que no están permitidos")

export const updateEducatorSchema = z.object({
  email: z.string().email("Not a valid email"),
  isActive: z.boolean(),
  docentType:z.enum(["Tiempo Completo", "Planta", "Cátedra"]),
  idType: z.string().min(2).max(10),
  title: z.string(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(3).max(50),
  identification: z.string().min(5).max(11),
}).strict("Se enviaron campos que no están permitidos")


export const addAutoEvalSchema = z.object({
  educatorId: z.string().min(5).max(30),
  state: z.enum(["En ejecución","Terminado","Suspendido"]),
  puntuation: z.number().int().gte(0).lte(100),
  period: z.object({
    idPeriod: z.string().min(5).max(30),
    name: z.string().min(5).max(30),
    year: z.string().min(4).max(4),
    semester:   z.number().int().gte(1).lte(2),
    startDate:  z.string(),
    endDate:  z.string()
  }),
  date: z.string(),
  evaluator: z.string().min(5).max(30),
  evaluated: z.string().min(5).max(30),
  act: z.boolean(),
  labour: z.string().min(5).max(30),
}).strict("Se enviaron campos que no están permitidos")

export const addNotificationSchema = z.object({
  educatorId: z.string().min(5).max(30),
  title: z.string().min(3).max(30),
  content: z.string(),
  date: z.string(),
  read: z.boolean(),
}).strict("Se enviaron campos que no están permitidos")

export const addLabourSchema = z.object({
  educatorId: z.string().min(5).max(30),
  labours: z.string().min(5).max(30)
}).strict("Se enviaron campos que no están permitidos")
