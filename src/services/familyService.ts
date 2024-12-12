import Family from '../models/Family';
import UserFamily from '../models/UserFamily';
import User from '../models/User';
import { getUserById } from './userService';

export const createFamily = async (data: any) => {
  const createFamily = await Family.create(data)
  return createFamily;
};

export const getAllFamilies = async () => {
  const families = await Family.findAll({ include: User });
  return families;
};

export const getFamilyById = async (id: number) => {
  const family = await Family.findByPk(id, { include: User });

  return family;
};

export const isUserInFamily = async (userId: number, familyId: number) => {
  const member = await UserFamily.findOne({
    where: { user_id: userId, family_id: familyId },
  });
  return !!member;
};

export const addUserToFamily = async (familyId: number, userId: number) => {
  const existingFamily = await getFamilyById(familyId);

  if(!existingFamily) {
    throw new Error('Family not found');
  }

  const existingUser = await getUserById(userId);

  if(!existingUser) {
    throw new Error('User not found');
  }

  const existingRelation = await isUserInFamily(familyId, userId);

  if (existingRelation) {
    throw new Error('User already belongs to this family');
  }

  return UserFamily.create({ family_id: familyId, user_id: userId });
};