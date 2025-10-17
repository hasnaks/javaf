import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit() {
    if (!form.name || !form.email) {
      alert('Please fill out all required fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('ecosort_users') || '[]');
    const id = Date.now();
    users.push({ ...form, id, points: 0, carbonSaved: 0 });
    localStorage.setItem('ecosort_users', JSON.stringify(users));

    alert('🎉 Registered successfully! Bins will be installed soon.');
    navigate('/login');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 480,
          borderRadius: 4,
          bgcolor: '#ffffffcc',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <PersonAddAltIcon sx={{ fontSize: 48, color: '#2e7d32' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
            EcoSort Registration
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Join the green movement — register below 🌱
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={onChange}
            variant="outlined"
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={onChange}
            variant="outlined"
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={form.address}
            onChange={onChange}
            multiline
            rows={2}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Stack>

        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}
          sx={{
            mt: 3,
            py: 1.2,
            bgcolor: '#2e7d32',
            borderRadius: 2,
            fontWeight: 600,
            '&:hover': { bgcolor: '#1b5e20' },
          }}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
}
