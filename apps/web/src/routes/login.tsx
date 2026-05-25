import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { FormTextField } from '@meli/ui';
import babyLogo from '../assets/baby.png';
import { useAuthStore } from '../stores/auth.store';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { profile, session } = useAuthStore.getState();
    if (!session) return;
    if (profile && !profile.onboarding_completed) {
      throw redirect({ to: '/onboarding/due-date' });
    }
    throw redirect({ to: '/' });
  },
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuthStore();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      const profile = await signIn(values.email, values.password);
      navigate({
        to: profile?.onboarding_completed ? '/' : '/onboarding/due-date',
      });
    } catch (err) {
      const message =
        err instanceof Error &&
        err.message.includes('Invalid login credentials')
          ? 'Email hoặc mật khẩu không đúng'
          : 'Không thể kết nối. Vui lòng thử lại';
      setError(message);
    }
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 390,
          width: '100%',
        }}
      >
        <CardContent>
          <Stack alignItems="center" gap={3}>
            <Stack alignItems="center" gap="10px" sx={{ width: '100%' }}>
              <Box
                component="img"
                src={babyLogo}
                alt="Meli"
                sx={{
                  display: 'block',
                  height: 124,
                  objectFit: 'contain',
                  width: 124,
                }}
              />
              <Typography
                variant="h4"
                color="text.primary"
                sx={{ fontWeight: 700 }}
              >
                Meli
              </Typography>
            </Stack>

            <Stack alignItems="center" gap={1} sx={{ width: '100%' }}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                textAlign="center"
              >
                Đăng nhập
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Sử dụng email và mật khẩu được cấp để vào hệ thống.
              </Typography>
            </Stack>

            <Stack
              component="form"
              gap={2}
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: '100%' }}
            >
              <FormTextField<LoginFormValues>
                name="email"
                control={control}
                label="Email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                fullWidth
              />
              <FormTextField<LoginFormValues>
                name="password"
                control={control}
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
                        }
                        edge="end"
                        onClick={() => setShowPassword((current) => !current)}
                      >
                        {showPassword ? (
                          <VisibilityOffRounded />
                        ) : (
                          <VisibilityRounded />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Đăng nhập'
                )}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
