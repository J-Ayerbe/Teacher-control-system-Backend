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
  role: z.enum(["Coordinador", "Decano", "Docente"]),
});

export const updateEducatorSchema = z.object({
  educatorId: z.string(),
  email: z.string().email("Not a valid email"),
  docentType:z.enum(["Tiempo Completo", "Planta", "Cátedra"]),
  idType: z.string().min(2).max(10),
  title: z.string(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(3).max(50),
  role: z.enum(["Coordinador", "Decano", "Docente"]),
  evaluated: z.object({
    idEvaluated: z.string().min(5).max(30),
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email("Not a valid email"),
    role: z.enum(["Coordinador", "Decano", "Docente"]),
  }), 
});

export const toggleEducatorSchema = z.object({
    isActive: z.boolean()
});

export const addAutoEvalSchema = z.object({
  educatorId: z.string().min(5).max(30),
  state: z.enum(["Aprobado", "Rechazado", "Pendiente"]),
  puntuation: z.number().int().gte(0).lte(100),
  period: z.object({
    idPeriod: z.string(),
    name: z.string().min(5).max(30),
    year: z.string().min(4).max(4),
    semester:   z.enum(["1", "2"]),
    startDate:  z.string(),
    endDate:  z.string()
  }),
  date: z.string(),
  evaluator: z.object({
    idEvaluator: z.string().min(5).max(30),
    firstName:  z.string().min(3).max(50),
    lastName:   z.string().min(3).max(50),
    email: z.string().email("Not a valid email"),  
    role: z.enum(["Coordinador", "Decano", "Docente"]),
  }),
  evaluated: z.object({
    idEvaluated: z.string().min(5).max(30),
    firstName:  z.string().min(3).max(50),
    lastName:  z.string().min(3).max(50),
    email: z.string().email("Not a valid email"),
    role: z.enum(["Coordinador", "Decano", "Docente"]),
  }),
  act: z.boolean(),
  labour: z.object({ 
    idLabour: z.string().min(5).max(30),
    nameWork: z.string().min(3).max(30),
    isActive: z.boolean(),
    labourType: z.object({ 
      idlabourType: z.number().int().gte(1).lte(14),
      code: z.string().min(1).max(10),
      description: z.string(),
    }),
    assignedHours: z.number().int().gte(1).lte(200),
  })
});

export const addNotificationSchema = z.object({
  educatorId: z.string().min(5).max(30),
  title: z.string().min(3).max(30),
  content: z.string(),
  date: z.string(),
  read: z.boolean(),
});

export const addLabourSchema = z.object({
  educatorId: z.string().min(5).max(30),
  labours: z.string().min(5).max(30)
});



