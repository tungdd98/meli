import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth.store';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { profile, session } = useAuthStore.getState();
    if (!session) throw redirect({ to: '/login' });
    if (profile && !profile.onboarding_completed) {
      throw redirect({ to: '/onboarding/due-date' });
    }
  },
  component: () => <Outlet />,
});
