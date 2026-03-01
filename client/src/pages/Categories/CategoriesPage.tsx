import React from 'react';
import { Box, Typography, Grid, Paper, CardActionArea, Container } from '@mui/material';
import { Smartphone, Laptop, Shirt, Home, Camera, Watch } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { name: 'Electronics', icon: <Smartphone size={40} />, count: '450+ Products', color: '#6366f1' },
    { name: 'Computing', icon: <Laptop size={40} />, count: '120+ Products', color: '#ef4444' },
    { name: 'Fashion', icon: <Shirt size={40} />, count: '1.2k+ Products', color: '#ec4899' },
    { name: 'Home & Living', icon: <Home size={40} />, count: '800+ Products', color: '#10b981' },
    { name: 'Photography', icon: <Camera size={40} />, count: '85+ Products', color: '#f59e0b' },
    { name: 'Accessories', icon: <Watch size={40} />, count: '300+ Products', color: '#8b5cf6' },
];

const CategoriesPage: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#fff3e0', minHeight: '100%', py: 4, flexGrow: 1 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        Browse Categories
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Find exactly what you're looking for by exploring our diverse categories.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {CATEGORIES.map((cat, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.name}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                            >
                                <Paper
                                    sx={{
                                        borderRadius: 6,
                                        overflow: 'hidden',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: '0.3s',
                                        '&:hover': {
                                            borderColor: cat.color,
                                            boxShadow: `0 20px 25px -5px ${cat.color}20`,
                                        }
                                    }}
                                >
                                    <CardActionArea sx={{ p: 5, textAlign: 'center' }}>
                                        <Box sx={{ color: cat.color, mb: 2, display: 'flex', justifyContent: 'center' }}>
                                            {cat.icon}
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                                            {cat.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                            {cat.count}
                                        </Typography>
                                    </CardActionArea>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default CategoriesPage;
