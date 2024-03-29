import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy';
import { useForm } from 'react-hook-form';

import { signIn } from '../../services/auth.service';
import { useAuth } from '../../contexts/AuthProvider';
import { ROUTES } from '../../constants';

export interface FormData {
  username: string;
  password: string;
}

export default function SignIn() {
  const { register, handleSubmit } = useForm<FormData>();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.DASHBOARD);
  });

  const onSubmit = handleSubmit(async (data) => {
    if (data.username && data.password) {
      try {
        const { access_token: token } = await signIn(data);
        await login(token);
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        console.log('incorrect username or password');
      }
    }
  });

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mt: 8 }}>
        <Typography level="h3" textAlign="center">
          🔐 Sign In
        </Typography>
        <Grid component="form" sx={{ mt: 4 }} onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input {...register('username')} placeholder="Username" />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ mt: 1 }}>Password</FormLabel>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
            />
          </FormControl>
          <Button type="submit" sx={{ width: '100%', mt: 3 }}>
            Sign In
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
