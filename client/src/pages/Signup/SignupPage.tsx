import React from 'react';
import { Box, Typography, TextField, Button, Paper, Container, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signupSchema = z.object({
    fullName: z.string().min(2, 'Full name is required and must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { fullName: '', email: '', password: '' },
    });

    const onSubmit = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: '#e0f2f1', p: 4, borderRadius: 4 }}>
            <Container maxWidth="xs">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={3} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                                Join Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Create an account to start your shopping journey
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                variant="outlined"
                                margin="normal"
                                {...register('fullName')}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                                sx={{ mb: 2 }}
                            />
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
                                Sign Up
                            </Button>
                        </form>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link onClick={() => navigate('/login')} underline="hover" sx={{ fontWeight: 600, cursor: 'pointer' }}>
                                    Log In
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default SignupPage;
