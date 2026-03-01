import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Button, Container } from '@mui/material';
import { Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_USERS = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin', status: 'active', avatar: 'AS' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'active', avatar: 'BJ' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'inactive', avatar: 'CB' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'user', status: 'active', avatar: 'DR' },
];

const AdminPage: React.FC = () => {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: <Users size={24} />, color: '#6366f1' },
        { label: 'Total Orders', value: '856', icon: <ShoppingBag size={24} />, color: '#ec4899' },
        { label: 'Revenue', value: '$45,200', icon: <TrendingUp size={24} />, color: '#10b981' },
        { label: 'Pending Issues', value: '12', icon: <AlertCircle size={24} />, color: '#f59e0b' },
    ];

    return (
        <Box sx={{ bgcolor: '#ede7f6', minHeight: '100%', py: 4, flexGrow: 1 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage users, products, and analyze performance data.
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 4 }}>
                                    <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${stat.color}15`, color: stat.color }}>
                                        {stat.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                            {stat.label}
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    User Management
                </Typography>

                <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(99, 102, 241, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MOCK_USERS.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: user.role === 'admin' ? 'primary.main' : 'secondary.main', width: 32, height: 32, fontSize: '0.8rem' }}>
                                                {user.avatar}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.status}
                                            size="small"
                                            color={user.status === 'active' ? 'success' : 'default'}
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default AdminPage;
