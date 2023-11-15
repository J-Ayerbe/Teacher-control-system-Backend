import { Educator } from "../models/educatorModel";

export const getUserFromDatabase = async (uid: string) => {
  try {
    return await Educator.findById(uid);
  } catch (error) {
    throw error;
  }
};
