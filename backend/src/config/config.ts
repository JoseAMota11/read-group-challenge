import { Env } from '../types/env.type';

export const config: Env = {
  SECRET_KEY: process.env.SECRET_KEY || 'READ_GROUP_PUBLIC',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
