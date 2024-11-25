'use client';

import { TokenDecoded } from '@/types/token.type';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

export const setToken = (token: string) => {
  const { exp }: TokenDecoded = decodeJwt(token);

  Cookies.set('token', token, { expires: exp });
};

export const getToken = () => {
  return Cookies.get('token');
};

export const getTokenDecoded = (): TokenDecoded | null => {
  const token = Cookies.get('token');

  return token ? decodeJwt(token) : null;
};

export const removeToken = () => {
  return Cookies.remove('token');
};

export const hasToken = () => {
  return Boolean(Cookies.get('token'));
};
