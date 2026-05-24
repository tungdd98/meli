import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { FormTextField, shape } from '@meli/ui';
import babyLogo from '../assets/baby.png';
import { useAuthStore } from '../stores/auth.store';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { session } = useAuthStore.getState();
    if (session) throw redirect({ to: '/' });
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
      await signIn(values.email, values.password);
      navigate({ to: '/' });
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
        bgcolor: '#FFF5F5',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#FFFFFF',
          border: '3px solid #FFE0E0',
          borderRadius: shape.xl,
          boxShadow: '0 10px 24px rgba(240, 129, 128, 0.16)',
          maxWidth: 390,
          p: 3,
          width: '100%',
        }}
      >
        <Stack alignItems="center" gap="22px">
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
              sx={{
                color: '#1A1A2E',
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Meli
            </Typography>
          </Stack>

          <Stack alignItems="center" gap={1} sx={{ width: '100%' }}>
            <Typography
              component="h1"
              sx={{
                color: '#1A1A2E',
                fontSize: 24,
                fontWeight: 700,
                lineHeight: 1.3,
                textAlign: 'center',
              }}
            >
              Đăng nhập
            </Typography>
            <Typography
              sx={{
                color: '#6B7280',
                fontSize: 14,
                lineHeight: 1.5,
                textAlign: 'center',
              }}
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
              sx={textFieldSx}
            />
            <FormTextField<LoginFormValues>
              name="password"
              control={control}
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              fullWidth
              sx={textFieldSx}
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
              disabled={isLoading}
              sx={{
                bgcolor: '#F08180',
                border: '3px solid rgba(0, 0, 0, 0.08)',
                borderRadius: shape.lg,
                boxShadow: '0 4px 0 #D45E5D',
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 600,
                height: 52,
                lineHeight: 1.75,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#E57373',
                  boxShadow: '0 4px 0 #D45E5D',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

const textFieldSx = {
  '& .MuiFormLabel-root': {
    color: '#1A1A2E',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.5,
    position: 'static',
    transform: 'none',
  },
  '& .MuiInputBase-root': {
    borderRadius: shape.lg,
    color: '#1A1A2E',
    fontSize: 16,
    height: 52,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FFE0E0',
    borderWidth: 3,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#F8B4B4',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#F08180',
    borderWidth: 3,
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#B0B0B0',
    opacity: 1,
  },
};
