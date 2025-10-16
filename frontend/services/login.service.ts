import { Login } from '@/types/login.type';
import { API_URL } from '@/utils/constants';

export const loginUser = async (body: Login) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const { message }: { message: string } = await res.json();
    return [message, undefined] as const;
  }

  const { token }: { token: string } = await res.json();
  return [undefined, token] as const;
};
