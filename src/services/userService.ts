import User from '../models/User';

export const createUser = async (data: any) => {
  return User.create(data);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll();
  return users;
};
