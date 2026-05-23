import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Box from '@mui/material/Box';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Box>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </Box>
  );
}
