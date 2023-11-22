import { z } from "zod";

const labourTypechema=z.object({
    idLabourType:z.number().int().gte(1).lte(14),
    code:z.string(),
    description:z.string(),
}).strict("Se enviaron campos que no están permitidos")

export default labourTypechema;