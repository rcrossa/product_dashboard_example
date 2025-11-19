import { redirect } from 'next/navigation';
import { auth } from '@/infrastructure/auth/auth.config';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
