import express from 'express';
import { userRouter } from './routes/userRoute';
import { workRouter } from './routes/workRoute';


const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/apiWork',workRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


