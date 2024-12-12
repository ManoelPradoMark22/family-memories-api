import express from 'express';
import { ENV } from './config/env';
import userRouter from './routes/userRoutes'
import authRouter from './routes/authRoutes';

const app = express();

app.use(express.json());

app.use('/', userRouter, authRouter);
app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});

export default app;