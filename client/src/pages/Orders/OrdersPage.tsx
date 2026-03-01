import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Button, Chip, Container } from '@mui/material';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
    { id: 'ORD-12345', date: 'Feb 24, 2026', total: 449, status: 'delivered', items: 2 },
    { id: 'ORD-67890', date: 'Feb 26, 2026', total: 120.5, status: 'shipped', items: 1 },
    { id: 'ORD-11223', date: 'Feb 28, 2026', total: 55, status: 'pending', items: 1 },
];

const OrdersPage: React.FC = () => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle size={18} color="#10b981" />;
            case 'shipped': return <Truck size={18} color="#6366f1" />;
            default: return <Clock size={18} color="#f59e0b" />;
        }
    };

    const getStatusColor = (status: string) => {
        if (status === 'delivered') return 'success';
        if (status === 'shipped') return 'primary';
        return 'warning';
    };

    return (
        <Box sx={{ bgcolor: '#e8f5e9', minHeight: '100%', py: 4, flexGrow: 1 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        Your Orders
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Track your shipments and view your purchase history.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {MOCK_ORDERS.map((order, index) => (
                        <Grid size={{ xs: 12 }} key={order.id}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Paper sx={{ p: 4, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Box>
                                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block' }}>
                                                Order ID
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                #{order.id}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block' }}>
                                                Date Placed
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {order.date}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                                            <Chip
                                                icon={getStatusIcon(order.status)}
                                                label={order.status.toUpperCase()}
                                                sx={{ fontWeight: 700, px: 1, textTransform: 'uppercase' }}
                                                color={getStatusColor(order.status)}
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mb: 3 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ p: 1.5, bgcolor: 'primary.light', color: 'primary.main', borderRadius: 2, opacity: 0.1 }}>
                                                <Package size={24} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                    {order.items} Items
                                                </Typography>
                                                <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                                                    ${order.total.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button variant="outlined" sx={{ fontWeight: 700 }}>
                                            View Details
                                        </Button>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default OrdersPage;
