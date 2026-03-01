import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Badge, useTheme, useMediaQuery } from '@mui/material';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, LogOut, Menu as MenuIcon, Package, LayoutGrid, ListChecks, ShieldCheck, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/authSlice';
import { ThemeModeContext } from '../theme/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const { mode, toggleColorMode } = React.useContext(ThemeModeContext);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { label: 'Products', path: '/products', icon: <Package size={20} /> },
        { label: 'Categories', path: '/categories', icon: <LayoutGrid size={20} /> },
        { label: 'Orders', path: '/orders', icon: <ListChecks size={20} /> },
        { label: 'Wishlist', path: '/wishlist', icon: <Heart size={20} /> },
        { label: 'Admin', path: '/admin', icon: <ShieldCheck size={20} /> },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 30, 30, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    color: 'text.primary'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
                    <Typography
                        variant="h5"
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            cursor: 'pointer',
                            letterSpacing: '-0.5px'
                        }}
                        onClick={() => navigate('/')}
                    >
                        NANO ECOM
                    </Typography>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={NavLink}
                                    to={item.path}
                                    startIcon={item.icon}
                                    sx={{
                                        px: 2,
                                        color: 'text.secondary',
                                        '&.active': {
                                            color: 'primary.main',
                                            fontWeight: 700,
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        <IconButton color="inherit" onClick={toggleColorMode}>
                            {mode === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                        </IconButton>
                        <IconButton color="inherit" component={NavLink} to="/wishlist">
                            <Badge badgeContent={0} color="secondary">
                                <Heart size={22} />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={cart.items.length} color="primary">
                                <ShoppingCart size={22} />
                            </Badge>
                        </IconButton>

                        {isAuthenticated ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
                                    {user?.name || "User"}
                                </Typography>
                                <IconButton color="inherit" onClick={handleLogout}>
                                    <LogOut size={22} />
                                </IconButton>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => navigate('/login')}
                                sx={{ ml: 1 }}
                            >
                                Login
                            </Button>
                        )}

                        {isMobile && (
                            <IconButton color="inherit">
                                <MenuIcon size={24} />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </Box>

            <Box
                component="footer"
                sx={{
                    py: 4,
                    textAlign: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    mt: 'auto',
                    bgcolor: 'background.paper'
                }}
            >
                <Typography variant="overline" color="text.secondary">
                    © 2026 STORE MANAGEMENT • BUILT WITH REACT & MUI
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;
