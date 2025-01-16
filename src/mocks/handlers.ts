import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
});

const MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'Password123',
    name: 'Test User',
  },
];

export const handlers = [
  http.post('/api/auth/sign-in', async ({ request }) => {
    await delay(1500);

    const input = await request.json();
    const result = credentialsSchema.safeParse(input);

    if (!result.success) {
      return HttpResponse.json({ message: result.error.errors }, { status: 400 });
    }

    const credentials = result.data;
    const user = MOCK_USERS.find((u) => u.email === credentials.email);

    if (!user || user.password !== credentials.password) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return HttpResponse.json(
      {
        user: userData,
        token: 'mock-jwt-token',
      },
      { status: 200 },
    );
  }),
];
