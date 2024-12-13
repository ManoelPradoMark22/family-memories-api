import express from 'express';
import { createUserSchema, idParamSchema, updateUserSchema } from '../utils/validation';
import { createUser, getAllUsers, getUserByEmail, getUserById, getUserProfileById } from '../services/userService';
import { ZodError } from 'zod';

const userRouter = express.Router();

userRouter.get('/user/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);

    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? 'Error searching for users' });
  }
});

userRouter.get('/user/profile/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);

    const user = await getUserProfileById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? 'Error fetching user profile' });
  }
});

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
    res.status(500).json({ error: err?.message ?? 'Error registering user' });
  }
});

userRouter.put('/user/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);

    const data = updateUserSchema.parse(req.body);

    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updatedUser = await user.update(data);
    res.status(200).json(updatedUser);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err?.message ?? 'Error updating user' });
  }
});

export default userRouter;
