import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Button,
    Container,
    TextField,
    TablePagination,
    CircularProgress,
} from '@mui/material';
import { Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/users';
import type { User } from '../../types/user';

const AdminPage: React.FC = () => {
    const { data: users, isLoading, isError } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter(user =>
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const paginatedUsers = useMemo(() => {
        return filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredUsers, page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const stats = [
        { label: 'Total Users', value: users?.length ?? '...', icon: <Users size={24} />, color: '#6366f1' },
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
                        <Grid size={{ sm: 6, md: 3 }} key={stat.label}>
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

                <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: 'rgba(99, 102, 241, 0.05)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : isError ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <Typography color="error">Error fetching users.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedUsers.map((user) => (
                                        <TableRow key={user.id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.8rem' }}>
                                                        {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
                                                    </Avatar>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {`${user.first_name} ${user.last_name}`}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone_number}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={user.is_active ? 'Active' : 'Inactive'}
                                                    size="small"
                                                    color={user.is_active ? 'success' : 'default'}
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={user.is_admin ? 'Admin' : 'User'}
                                                    size="small"
                                                    color={user.is_admin ? 'primary' : 'default'}
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button size="small">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminPage;
