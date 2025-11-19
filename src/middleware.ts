export { auth as middleware } from '@/infrastructure/auth/auth.config';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
};
