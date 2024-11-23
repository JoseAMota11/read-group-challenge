import { Env } from '../types/env.type';

export const config: Env = {
  SECRET_KEY: process.env.SECRET_KEY || 'default_secret_key',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
