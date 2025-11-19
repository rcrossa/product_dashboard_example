import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaUserRepository } from '@/infrastructure/database/repositories/prisma-user.repository';
import { AuthenticateUserUseCase } from '@/domain/use-cases/auth/authenticate-user.use-case';

const userRepository = new PrismaUserRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await authenticateUserUseCase.execute({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
