import express from 'express';
import { createUserSchema } from '../utils/validation';
import { createUser, getAllUsers, getUserByEmail } from '../services/userService';
import { ZodError } from 'zod';

const userRouter = express.Router();

userRouter.get('/user', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? 'Error searching for users' });
  }
});

userRouter.post('/user', async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);

    const { email } = data;

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }
    
    const user = await createUser(data);
    res.status(201).json(user);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(400).json({ error: err?.message ?? 'Error registering user' });
  }
});

export default userRouter;
