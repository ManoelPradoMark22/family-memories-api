import express from 'express';
import { ENV } from './config/env';
import userRouter from './routes/userRoutes'
import authRouter from './routes/authRoutes';
import familyRouter from './routes/familyRoutes';
import albumRouter from './routes/albumRoutes';
import sequelize from './config/database';
import './models/initModels';

const app = express();

app.use(express.json());

app.use('/', userRouter, authRouter, familyRouter, albumRouter);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully.');
  app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

export default app;