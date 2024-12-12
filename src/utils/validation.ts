import { z } from 'zod';

const idValidation = (paramName: string) => z.number().int(`${paramName} must be a positive integer`).positive(`${paramName} must be a positive integer`)

export const createUserSchema = z.object({
  name: z.string().min(1),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  avatar: z.string().url().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  avatar: z.string().url('Invalid URL').optional(),
});

export const updateFamilySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export const createFamilySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export const addUserToFamilySchema = z.object({
  user_id: idValidation("user_id"),
});

export const createAlbumSchema = z.object({
  family_id: idValidation("family_id"),
  created_by: idValidation("created_by (user_id)"),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export const updateAlbumSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export const idParamSchema = (paramName: string) =>
  z.object({
    [paramName]: z.string().transform((val) => Number(val)),
  }).refine((data) => idValidation(paramName).safeParse(data[paramName]).success, {
    message: `${paramName} must be a positive integer`,
  });