import { SignInCredentials } from '../store/auth/types';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}

export const signIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new AuthError(error.message);
  }

  return response.json();
};
