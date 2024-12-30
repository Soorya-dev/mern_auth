import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/UserRoutes/userRoutes.js';
import userAuthRouter from './Routes/UserRoutes/userAuthRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

 

const app = express();   

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(3000, ()=>{
    console.log('server is running on port NO 3000');
});

app.use('/api/profile', userRouter);
app.use('/api/auth', userAuthRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});
