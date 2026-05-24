import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@meli/ui';
import { supabase } from '@meli/api';
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

function AuthInitializer({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.getState()._setSession(session);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      useAuthStore.getState()._setSession(session);
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
