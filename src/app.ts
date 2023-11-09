import { autoEvaluationRoute } from './routes/autoEvaluationRoute';
import express from 'express';
import { educatorRouter } from './routes/educatorRoute';
import { labourRouter } from './routes/labourRoute';
import { periodRouter } from './routes/periodRoute';
import { notificationRouter } from './routes/notificationRoute';
import cors from 'cors'
import { authRouter } from './routes/authRouter';

const app = express();
//TODO: inicializar conexion a mongoDB

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/labours',labourRouter);
app.use('/api/educators', educatorRouter);
app.use('/api/periods', periodRouter);
app.use('/api/notifications', notificationRouter)
app.use('/api/autoEvaluations', autoEvaluationRoute)
app.use('/api/auth', authRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
