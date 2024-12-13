import User from '../models/User';
import { UserCreationAttributes } from '../models/types';

export const createUser = async (data: any) => {
  const createUser = await User.create(data);

  const { password, ...userWithoutPassword } = createUser.get({ plain: true });

  return userWithoutPassword;
};

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  return user;
};

export const getUserProfileById = async (id: number) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'birthday', 'avatar'],
  });
  return user;
};

export const updateUser = async (user: User, updateData: Partial<UserCreationAttributes>) => {
  const updatedUser = await user.update(updateData);

  const { password, ...userWithoutPassword } = updatedUser.get({ plain: true });

  return userWithoutPassword;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll();
  return users;
};
