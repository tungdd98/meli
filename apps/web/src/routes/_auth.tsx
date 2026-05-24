import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth.store';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { session } = useAuthStore.getState();
    if (!session) throw redirect({ to: '/login' });
  },
  component: () => <Outlet />,
});
