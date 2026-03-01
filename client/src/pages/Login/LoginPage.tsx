import React from 'react';
import { Box, Typography, TextField, Button, Paper, Container, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import apiClient from '../../api/apiClient';

const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Login user
const loginUser = async (data: LoginFormValues) => {
    try {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    } catch (error: any) {
        if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail);
        }
        throw new Error('Failed to login');
    }
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data: any, variables: LoginFormValues) => {
            dispatch(login({ user: { name: 'User', email: variables.email }, token: data.access_token }));
            navigate('/products');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        loginMutation.mutate(data);
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd', p: 4, borderRadius: 4 }}>
            <Container maxWidth="xs">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={3} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Login to access your personalized shopping experience
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                margin="normal"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={{ mb: 3 }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                sx={{ py: 1.5, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link onClick={() => navigate('/signup')} underline="hover" sx={{ fontWeight: 600, cursor: 'pointer' }}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default LoginPage;
