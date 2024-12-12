import express from 'express';
import { loginSchema } from '../utils/validation';
import { ZodError } from 'zod';
import { loginUser } from '../services/authService';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const { email, password } = data;

    const tokenJwt = await loginUser(email, password);
    
    res.status(200).json(tokenJwt);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(400).json({ error: err?.message ?? 'Error when trying to log in' });
  }
});

export default authRouter;
