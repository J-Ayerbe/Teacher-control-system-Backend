import dotenv from "dotenv"
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";


dotenv.config({ path: envFile });
import { autoEvaluationRoute } from './routes/autoEvaluationRoute';
import express from 'express';
import dbConnection from './config/dbConfig';
import { educatorRouter } from './routes/educatorRoute';
import cors from 'cors'

import { authRouter } from './routes/authRouter';
import { errorHandler } from './helpers/errorHandler';


const app = express();

dbConnection();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/educators', educatorRouter);
app.use('/api/autoEvaluations', autoEvaluationRoute)
app.use('/api/auth', authRouter);
app.use(errorHandler);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
