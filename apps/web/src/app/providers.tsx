import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@meli/ui';
import { profilesApi, supabase } from '@meli/api';
import { useAuthStore } from '../stores/auth.store';
import { router } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function withTimeout<T>(
  promise: PromiseLike<T>,
  timeoutMs: number,
): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) => {
      window.setTimeout(() => {
        reject(new Error('Profile request timed out'));
      }, timeoutMs);
    }),
  ]);
}

async function loadProfile(userId: string) {
  const { data: profile, error } = await withTimeout(
    profilesApi.get(userId),
    5000,
  );
  if (error) {
    console.error('Failed to load profile', error);
    useAuthStore.getState()._setProfile(null);
    return;
  }

  useAuthStore.getState()._setProfile(profile);
}

function AuthInitializer({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        useAuthStore.getState()._setSession(session);
        if (session) {
          await loadProfile(session.user.id);
        } else {
          useAuthStore.getState()._setProfile(null);
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to initialize auth', error);
        useAuthStore.getState()._setSession(null);
        useAuthStore.getState()._setProfile(null);
      })
      .finally(() => {
        setAuthReady(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      useAuthStore.getState()._setSession(session);
      if (session) {
        void loadProfile(session.user.id);
      } else {
        useAuthStore.getState()._setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!authReady) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
}

export function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          <RouterProvider router={router} />
        </AuthInitializer>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
