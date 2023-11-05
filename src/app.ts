import express from 'express';
import { userRouter } from './routes/userRoute';


const app = express();
app.use(express.json());
app.use('/api', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


