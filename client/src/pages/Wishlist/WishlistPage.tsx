import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, Container } from '@mui/material';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';
import { Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_WISHLIST = [
    { id: '1', name: 'Premium Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000' },
    { id: '2', name: 'Minimalist Watch', price: 150, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000' },
];

const WishlistPage: React.FC = () => {
    const [deleteItem, setDeleteItem] = useState<string | null>(null);

    const handleDelete = () => {
        // Mock deletion logic here
        console.log("Deleted item", deleteItem);
        setDeleteItem(null);
    };
    return (
        <Box sx={{ bgcolor: '#ffebee', minHeight: '100%', py: 4, flexGrow: 1 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        My Wishlist
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Products you've saved for later.
                    </Typography>
                </Box>

                {MOCK_WISHLIST.length > 0 ? (
                    <Grid container spacing={4}>
                        {MOCK_WISHLIST.map((product, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={product.image}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 2 }}>
                                                ${product.price}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    startIcon={<ShoppingCart size={18} />}
                                                >
                                                    Buy Now
                                                </Button>
                                                <IconButton color="error" onClick={() => setDeleteItem(product.id)} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                                    <Trash2 size={20} />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h5" color="text.secondary">
                            Your wishlist is empty.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }} href="/products">
                            Go Shopping
                        </Button>
                    </Box>
                )}

                <ConfirmDeleteDialog
                    open={!!deleteItem}
                    title="Remove from Wishlist"
                    description="Are you sure you want to remove this item from your wishlist? This action cannot be undone."
                    onClose={() => setDeleteItem(null)}
                    onConfirm={handleDelete}
                />
            </Container>
        </Box>
    );
};

export default WishlistPage;
