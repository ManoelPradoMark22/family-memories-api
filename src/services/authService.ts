import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env'
import { getUserByEmail } from './userService';

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.getDataValue('password'))

  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.getDataValue('id') }, ENV.JWT_SECRET, { expiresIn: '1h' });

  return token;
};