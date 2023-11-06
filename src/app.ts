import express from 'express';
import { userRouter } from './routes/userRoute';
import { workRouter } from './routes/workRoute';
import { periodRouter } from './routes/periodRoute';
import { notificationRouter } from './routes/notificationRoute';
import cors from 'cors'
import { authRouter } from './routes/authRouter';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/works',workRouter);
app.use('/api/users', userRouter);
app.use('/api/periods', periodRouter);
app.use('/api/notification', notificationRouter)
app.use('/api/auth', authRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
