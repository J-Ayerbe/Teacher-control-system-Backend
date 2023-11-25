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
import { notificationRouter } from './routes/notificationRouter';
import cookieParser  from "cookie-parser";
import { authRouter } from './routes/authRouter';
import { errorHandler } from './helpers/errorHandler';
import helmet from "helmet";
import { server }from './webSocket';

const app = express();
dbConnection();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());


app.use('/api/educators', educatorRouter);
app.use('/api/autoEvaluations', autoEvaluationRoute)
app.use('/api/notification', notificationRouter );
app.use('/api/auth', authRouter);
app.use(errorHandler);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
