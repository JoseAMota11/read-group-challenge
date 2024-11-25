import { Register } from '../types/register.type';
import { URL } from '../utils/constants';

export const registerUser = async (body: Register) => {
  const res = await fetch(`${URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const { error }: { error: string } = await res.json();
    return [error, undefined] as const;
  }

  const { message }: { message: string } = await res.json();
  return [undefined, message] as const;
};
