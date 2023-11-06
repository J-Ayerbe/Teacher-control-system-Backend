import express from 'express';
import { userRouter } from './routes/userRoute';
import { workRouter } from './routes/workRoute';
import { periodRouter } from './routes/periodRoute';
import { notificationRouter } from './routes/notificationRoute';

const app = express();
app.use(express.json());
app.use('/apiWork',workRouter);
app.use('/api/users', userRouter);
app.use('/api/periods', periodRouter);
app.use('/api/notification', notificationRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
