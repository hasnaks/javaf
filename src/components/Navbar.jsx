import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ImageIcon from '@mui/icons-material/Image';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('ecosort_role'));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ecosort_user') || 'null')
  );
  const [displayName, setDisplayName] = useState(
    localStorage.getItem('ecosort_displayName') || null
  );

  useEffect(() => {
    // Keep navbar reactive to changes in localStorage from other tabs or login/logout actions
    function handleStorage() {
      setRole(localStorage.getItem('ecosort_role'));
      setUser(JSON.parse(localStorage.getItem('ecosort_user') || 'null'));
      setDisplayName(localStorage.getItem('ecosort_displayName') || null);
    }

    window.addEventListener('storage', handleStorage);

    // Also poll on mount in case role was changed within same tab
    const timeout = setTimeout(handleStorage, 50);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearTimeout(timeout);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('ecosort_role');
    localStorage.removeItem('ecosort_user');
    localStorage.removeItem('ecosort_token');
    localStorage.removeItem('ecosort_displayName');
    setRole(null);
    setUser(null);
    setDisplayName(null);
    navigate('/');
  }

  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#2e7d32' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}>
          EcoSort
        </Typography>

        {/* Always visible links */}
        <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/bins" startIcon={<InfoIcon />}>
          Bins Info
        </Button>
        <Button color="inherit" component={Link} to="/coupons" startIcon={<LocalOfferIcon />}>
          Coupons
        </Button>
        <Button color="inherit" component={Link} to="/gallery" startIcon={<ImageIcon />}>
          Gallery
        </Button>

        {/* If not logged in show Register / Login */}
        {!isUser && !isAdmin && (
          <>
            <Button color="inherit" component={Link} to="/register" startIcon={<PersonAddIcon />}>
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
              Login
            </Button>
          </>
        )}

        {/* Logged-in links */}
        {(isUser || isAdmin) && (
          <>
            <Button color="inherit" component={Link} to="/settings" startIcon={<SettingsIcon />}>
              Settings
            </Button>
            <Typography sx={{ ml: 1, mr: 1 }}>
              Hi, {displayName || (user && user.name) || 'User'}
            </Typography>
            {isUser && (
              <Button color="inherit" component={Link} to="/user" startIcon={<DashboardIcon />}>
                User
              </Button>
            )}
            {isAdmin && (
              <Button color="inherit" component={Link} to="/admin" startIcon={<DashboardIcon />}>
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
