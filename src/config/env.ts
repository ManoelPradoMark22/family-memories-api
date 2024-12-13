import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.DATABASE_URL || !process.env.PORT || !process.env.JWT_SECRET || !process.env.ENABLE_CORS_URL) {
  throw new Error('Environment variables not set correctly');
}

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ENABLE_CORS_URL: process.env.ENABLE_CORS_URL
};
