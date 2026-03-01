import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Button, Box, Chip, Rating, IconButton, Paper, Container } from '@mui/material';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_PRODUCTS = [
    { id: '1', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000' },
    { id: '2', name: 'Minimalist Watch', price: 150, category: 'Fashion', rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000' },
    { id: '3', name: 'Smart Home Speaker', price: 120, category: 'Electronics', rating: 4.7, image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=1000' },
    { id: '4', name: 'Ergonomic Desk Chair', price: 450, category: 'Home', rating: 4.9, image: 'https://images.unsplash.com/photo-1505798517567-3a9d202771e7?auto=format&fit=crop&q=80&w=1000' },
    { id: '5', name: 'Eco-friendly Yoga Mat', price: 55, category: 'Sports', rating: 4.6, image: 'https://images.unsplash.com/photo-1592432678894-3a2b70f03114?auto=format&fit=crop&q=80&w=1000' },
    { id: '6', name: 'Leather Travel Bag', price: 195, category: 'Travel', rating: 4.4, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1000' },
];

const ProductsPage: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#fce4ec', minHeight: '100%', py: 4, flexGrow: 1 }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Paper
                        sx={{
                            height: '400px',
                            borderRadius: 8,
                            overflow: 'hidden',
                            position: 'relative',
                            mb: 8,
                            display: 'flex',
                            alignItems: 'center',
                            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/ecommerce_hero_banner.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'white',
                            px: { xs: 4, md: 8 }
                        }}
                    >
                        <Box sx={{ maxWidth: '600px' }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                Next Gen Shopping
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                Experience the future of ecommerce with our premium curated collections and seamless experience.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    fontWeight: 800,
                                    '&:hover': { bgcolor: '#f0f0f0' }
                                }}
                            >
                                Shop Collections
                            </Button>
                        </Box>
                    </Paper>
                </motion.div>

                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                        Our Products
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Explore our curated collection of premium products for your lifestyle.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {MOCK_PRODUCTS.map((product, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            bgcolor: 'rgba(255,255,255,0.8)',
                                            '&:hover': { bgcolor: 'white' }
                                        }}
                                    >
                                        <Heart size={20} color="#ec4899" />
                                    </IconButton>
                                    <CardMedia
                                        component="img"
                                        height="260"
                                        image={product.image}
                                        alt={product.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ mb: 1 }}>
                                            <Chip label={product.category} size="small" color="primary" variant="outlined" />
                                        </Box>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700 }}>
                                            {product.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                ({product.rating})
                                            </Typography>
                                        </Box>
                                        <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
                                            ${product.price}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<ShoppingCart size={18} />}
                                            sx={{ py: 1.5 }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ProductsPage;
