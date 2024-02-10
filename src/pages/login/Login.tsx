import { FormProvider, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAuthenticated } from '@/lib/utils';
import { type LoginFormData, LoginSchema } from '@/models';
import { Box, Card, Stack } from '@mui/material';
import { LoadingButton } from '@/components';
import { useLogin } from './hooks';
import { PasswordField, UsernameField } from './components';

export function LoginPage() {
  const zodFormMethods = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = zodFormMethods;

  const [handleLogin, isLoggingIn] = useLogin();

  if (isAuthenticated()) return <Navigate to="/" replace />;

  const isLoading = isLoggingIn || isSubmitting;

  const onSubmit = (data: LoginFormData) => {
    void handleLogin(data);
  };

  return (
    <FormProvider {...zodFormMethods}>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          minHeight: 'calc(100vh - 65.6px)',
          background: '#f4eeed',
        }}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card
          component={Stack}
          elevation={0}
          gap={4}
          sx={{
            width: '500px',
            p: 4,
          }}
        >
          <UsernameField />
          <PasswordField />

          <Box>
            <LoadingButton type="submit" variant="contained" isLoading={isLoading} disabled={isLoading}>
              Log in
            </LoadingButton>
          </Box>
        </Card>
      </Box>
    </FormProvider>
  );
}
