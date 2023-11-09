import mongoose from "mongoose";

const dbConnection = async () => {
  const dbCcn: string | undefined = process.env.DB_CNN;

  if (!dbCcn) {
    throw new Error("Database connection string is missing. Check your environment variables.");
  }

  try {
    await mongoose.connect(dbCcn);
    console.log("DB Online");
  } catch (error) {
    throw new Error("Error a la hora de iniciar la base de datos. Ver logs.");
  }
};

export default dbConnection