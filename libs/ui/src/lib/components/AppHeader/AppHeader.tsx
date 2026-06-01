import { type ReactNode } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';

export type AppHeaderVariant = 'primary' | 'plain' | 'transparent';

export interface AppHeaderProps {
  /** Title text (omit when the header only has a back/action button). */
  title?: string;
  /** Show the back button on the left. Requires `onBack`; the button is not rendered without it. */
  showBack?: boolean;
  /** Back button handler (passed by the route to keep this lib UI-only). Required when `showBack` is set. */
  onBack?: () => void;
  /** Right-aligned action content (e.g. a share or "..." button). */
  rightAction?: ReactNode;
  /**
   * - `primary`: pink background, white text, centered title (default).
   * - `plain`: light background, dark text, left-aligned title.
   * - `transparent`: no background, buttons floating over an image.
   *   Must be placed inside a `position: relative` container.
   */
  variant?: AppHeaderVariant;
}

export function AppHeader({
  title,
  showBack = false,
  onBack,
  rightAction,
  variant = 'primary',
}: AppHeaderProps) {
  const hasBack = showBack && Boolean(onBack);
  const backButton = hasBack ? (
    <IconButton
      edge={variant === 'transparent' ? false : 'start'}
      aria-label="Quay lại"
      onClick={onBack}
      sx={
        variant === 'transparent'
          ? { bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }
          : { color: 'inherit' }
      }
    >
      <ArrowBackRounded />
    </IconButton>
  ) : null;

  if (variant === 'transparent') {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        {backButton ?? <span />}
        {rightAction}
      </Box>
    );
  }

  const centered = variant === 'primary';

  return (
    <AppBar
      position="static"
      color={variant === 'primary' ? 'primary' : 'default'}
      elevation={1}
    >
      <Toolbar>
        {backButton}
        <Typography
          variant={centered ? 'subtitle1' : 'h4'}
          component="h1"
          noWrap
          sx={{ flex: 1, textAlign: centered ? 'center' : 'left' }}
        >
          {title}
        </Typography>
        {rightAction ??
          (hasBack && centered ? <Box sx={{ width: 40 }} /> : null)}
      </Toolbar>
    </AppBar>
  );
}
