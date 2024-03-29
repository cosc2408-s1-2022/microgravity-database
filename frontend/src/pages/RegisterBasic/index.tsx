import * as React from 'react';
import { useState } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import FormField from '../../components/FormField';
import { AuthenticationResponse, UserRole } from '../../util/types';
import { Navigate } from 'react-router-dom';
import api from '../../util/api';
import LoadingButton from '../../components/LoadingButton';

export default function RegisterBasic() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsMatchingError = password && password !== confirmPassword && 'Passwords must match.';
  const passLengthValidation = (value: string) => {
    // TODO Show strength but do not force.
    // const re = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`);
    // return re.test(value);
    return value.length >= 8;
  };
  const passwordRegex =
    password &&
    !passLengthValidation(password) &&
    // 'Password has to have at least 8 characters with one special character eg. !@#$%*';
    'Password has to have at least 8 characters';

  const { data, error, isSuccess, isLoading, mutate } = useMutation<AxiosResponse<AuthenticationResponse>, AxiosError>(
    'register',
    () => {
      return api.post(`/users/register/basic`, {
        username: username,
        password: password,
        role: UserRole.ROLE_USER,
      });
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  if (isSuccess && data) {
    // Add token to localstorage for persistence
    const authToken: string = data?.data.jwt;
    localStorage.setItem('authToken', authToken);
    return <Navigate to='/home' />;
  }

  return (
    <Grid container height='100%' alignItems='center' justifyContent='center'>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          outline: 'none',
          zIndex: '-1',
        }}
      >
        <source src={'/space.mp4'} type='video/mp4' />
      </video>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(8px)',
          zIndex: '-1',
        }}
      />
      <div>
        <Container maxWidth='xs'>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 'auto',
              width: 'auto',
              bgcolor: '#FAEBEFFF',
              p: 3,
              borderRadius: '16px',
            }}
          >
            <Typography variant='h4' fontWeight='bold'>
              Register User
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormField
                    required
                    name='username'
                    label='Username'
                    autoComplete='username'
                    errors={error?.response?.data}
                    onChange={setUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    required
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='new-password'
                    errors={
                      passwordRegex
                        ? {
                            password: passwordRegex,
                          }
                        : undefined
                    }
                    onChange={setPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    required
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    autoComplete='new-password'
                    errors={
                      passwordsMatchingError
                        ? {
                            confirmPassword: passwordsMatchingError,
                          }
                        : undefined
                    }
                    onChange={setConfirmPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    color='error'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ my: 1 }}
                    loading={isLoading}
                  >
                    Register
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Link href={'/login'} color='text.primary' sx={{ textDecoration: 'underline' }}>
                    Already have an account? Login
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href={'/register'} color='text.primary' sx={{ textDecoration: 'underline' }}>
                    Register as a researcher instead?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </Grid>
  );
}
