import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

export default function Login() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function doLogin() {
    if (role === 'admin') {
      // set a simple token + display name for admin
      localStorage.setItem('ecosort_role', 'admin');
      localStorage.setItem('ecosort_token', 'admintoken-' + Date.now());
      if (!localStorage.getItem('ecosort_admin')) {
        localStorage.setItem('ecosort_admin', JSON.stringify({ name: 'Authority' }));
      }
      // store a display name used by the navbar
      localStorage.setItem('ecosort_displayName', 'Authority');
      navigate('/admin');
    } else {
      const users = JSON.parse(localStorage.getItem('ecosort_users') || '[]');
      let user = users.find((u) => u.email === email) || users[0];
      if (!user) {
        alert('No users found. Please register first.');
        return;
      }
      localStorage.setItem('ecosort_role', 'user');
      localStorage.setItem('ecosort_user', JSON.stringify(user));
      localStorage.setItem('ecosort_token', 'usertoken-' + Date.now());
      localStorage.setItem('ecosort_displayName', user.name || user.email);
      navigate('/user');
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          textAlign: 'center',
          bgcolor: '#ffffffcc',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#2e7d32' }}>
          EcoSort Login 🌱
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Choose your role and log in to continue
        </Typography>

        {/* Role Selection */}
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(e, newRole) => newRole && setRole(newRole)}
          fullWidth
          sx={{
            mb: 3,
            '& .MuiToggleButton-root': {
              borderRadius: 2,
              textTransform: 'none',
              py: 1,
            },
          }}
        >
          <ToggleButton value="user" color="success">
            <PersonIcon sx={{ mr: 1 }} /> User
          </ToggleButton>
          <ToggleButton value="admin" color="success">
            <AdminPanelSettingsIcon sx={{ mr: 1 }} /> Admin
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Email Input */}
        {role === 'user' && (
          <TextField
            fullWidth
            label="Registered Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        )}

        {/* Login Button */}
        <Stack direction="column" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={doLogin}
            sx={{
              py: 1.2,
              bgcolor: '#2e7d32',
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': { bgcolor: '#1b5e20' },
            }}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
