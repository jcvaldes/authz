import express from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';

const app = express();

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

export default app;
