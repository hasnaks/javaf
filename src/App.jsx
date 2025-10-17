import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';

// ✅ Components
import Navbar from './components/Navbar';
import FooterBar from './components/FooterBar';
import Registration from './components/Registration';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Settings from './components/Settings';
import RequireAuth from './components/RequireAuth';

// ✅ Pages
import Home from './pages/Home';
import BinsInfo from './pages/BinsInfo';
import Coupons from './pages/Coupons';
import Gallery from './pages/Gallery';

export default function App() {
  const [role, setRole] = useState(localStorage.getItem('ecosort_role'));

  useEffect(() => {
    function handleStorage() {
      setRole(localStorage.getItem('ecosort_role'));
    }
    window.addEventListener('storage', handleStorage);
    const t = setTimeout(handleStorage, 50);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearTimeout(t);
    };
  }, []);

  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* 🌱 Navbar displayed on all pages */}
      <Navbar />

      {/* 🌍 Page Container */}
      <Container sx={{ py: 6 }}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/bins" element={<BinsInfo />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/settings"
            element={
              <RequireAuth allowedRoles={["user", "admin"]}>
                <Settings />
              </RequireAuth>
            }
          />

          {/* Protected Pages */}
          <Route
            path="/user"
            element={
              <RequireAuth allowedRoles={["user"]}>
                <UserDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      {/* Persistent footer / bottom bar with company details */}
      <FooterBar />
    </Box>
  );
}
