import express from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';
import roleRoutes from './roles/routes';

const app = express();

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/role', roleRoutes)

export default app;
