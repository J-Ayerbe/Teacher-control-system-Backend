import { NextFunction, Response } from "express";
import { ZodObject } from "zod";
import { fromZodError } from "zod-validation-error";
import z from "zod";

type ValidationSchema = InstanceType<typeof ZodObject>;

const roleSchemas: Record<string, ValidationSchema> = {
  Coordinador: z
    .object({ state: z.string(), observation: z.string().optional() })
    .strict(),
  Docente: z.object({
    puntuation: z.number(),
    suggestions: z.string(),
  }).strict(),
};

const teacherTypesSchemas: Record<string, ValidationSchema> = {
  Cátedra: z.object({
    results: z.string(),
    puntuation: z.number(),
    suggestions: z.string().optional(),
  }).strict(),
  "Tiempo Completo": z.object({
    results: z.string().optional(),
    evidencesLink: z.string().optional(),
    puntuation: z.number(),
    suggestions: z.string().optional(),
  }).strict(),
  Planta: z.object({
    results: z.string().optional(),
    evidencesLink: z.string().optional(),
    puntuation: z.number(),
    suggestions: z.string().optional(),
  }).strict(),
};

const validateAutoEvalSchema = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;
  const docentType = req.teacherType;
  const labourType=req.labourType.description;

  let schema = roleSchemas[role];
  if (role === "Docente" && docentType) {
    schema = teacherTypesSchemas[docentType];
    if (docentType !== 'Cátedra' && labourType !== 'Docencia') {
      schema = schema.omit({results: true}).extend({
        evidencesLink: z.string(),
      }).strict();
    } else if (docentType !== 'Cátedra' && labourType === 'Docencia') {
      schema = schema.omit({evidencesLink: true}).strict();
    }
  }
  if (!schema) {
    return res.status(400).json({
      error: `No validation schema for role: ${role} and teacher type: ${docentType}`,
    });
  }
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error: any) {
    const validationError = fromZodError(error);
    return res.status(400).json({ error: validationError.message });
  }
};

export default validateAutoEvalSchema;
