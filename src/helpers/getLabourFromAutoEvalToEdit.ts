import { AutoEvaluation } from "../models/autoEvaluationModel";

export const getAutoEvaluationFromDatabase = async (id: string) => {
  try {
    const autoevaluation= await AutoEvaluation.findById(id).populate("labour")
       await AutoEvaluation.populate(autoevaluation, {
      path: "labour.labourType",
      select: " description",
    });

    return autoevaluation
  } catch (error) {
    console.log(error)
    throw error;
  }
};
