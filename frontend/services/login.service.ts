import { Login } from '@/types/login.type';
import { URL } from '@/utils/constants';

export const loginUser = async (body: Login) => {
  const res = await fetch(`${URL}/login`, {
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

  const { token }: { token: string } = await res.json();
  return [undefined, token] as const;
};
