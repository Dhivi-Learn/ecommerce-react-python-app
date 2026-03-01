import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeContextProvider } from './theme/ThemeContext';
import Layout from './components/Layout';

// Eager imports
import ProductsPage from './pages/Products/ProductsPage';
import OrdersPage from './pages/Orders/OrdersPage';
import CategoriesPage from './pages/Categories/CategoriesPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import AdminPage from './pages/Admin/AdminPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<Navigate to="/products" />} />
              </Routes>
            </Layout>
            <Toaster position="top-right" />
          </Router>
        </ThemeContextProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
