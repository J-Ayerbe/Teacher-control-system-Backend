import express from 'express';
import { userRouter } from './routes/userRoute';
import { periodRouter } from './routes/periodRoute';


const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/periods', periodRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
