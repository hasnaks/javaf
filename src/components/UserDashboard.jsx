import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GrassIcon from '@mui/icons-material/Grass';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('ecosort_user'));
    setUser(u);
  }, []);

  function notifyAuthority(type, subtype) {
    const records = JSON.parse(localStorage.getItem('ecosort_records') || '[]');
    const rec = {
      id: Date.now(),
      userId: user.id,
      type,
      subtype: subtype || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    records.push(rec);
    localStorage.setItem('ecosort_records', JSON.stringify(records));
    alert('Notified authority about full bin. Collection will be scheduled.');
  }

  function submitWeighed() {
    const users = JSON.parse(localStorage.getItem('ecosort_users') || '[]');
    const idx = users.findIndex((x) => x.id === user.id);
    if (idx === -1) return;
    const points = 10;
    users[idx].points = (users[idx].points || 0) + points;
    users[idx].carbonSaved = (users[idx].carbonSaved || 0) + 0.5;
    localStorage.setItem('ecosort_users', JSON.stringify(users));
    localStorage.setItem('ecosort_user', JSON.stringify(users[idx]));
    setUser(users[idx]);
    alert(`Weighing verified ✅\nEco-points awarded: ${points}`);
  }

  if (!user) return null;

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
        minHeight: '90vh',
        py: 4,
        px: { xs: 2, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: '#2e7d32', mb: 3, textAlign: 'center' }}
      >
        Welcome, {user.name} 🌿
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, bgcolor: '#ffffff', textAlign: 'center', boxShadow: 3 }}>
            <CardContent>
              <EmojiEventsIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Typography variant="h6">Eco Points</Typography>
              <Typography variant="h4" color="primary">{user.points || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, bgcolor: '#ffffff', textAlign: 'center', boxShadow: 3 }}>
            <CardContent>
              <RecyclingIcon sx={{ fontSize: 40, color: '#388e3c' }} />
              <Typography variant="h6">Carbon Saved (kg)</Typography>
              <Typography variant="h4" color="primary">
                {user.carbonSaved || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, bgcolor: '#ffffff', textAlign: 'center', boxShadow: 3 }}>
            <CardContent>
              <DeleteOutlineIcon sx={{ fontSize: 40, color: '#4caf50' }} />
              <Typography variant="h6">Total Reports</Typography>
              <Typography variant="h4" color="primary">
                {JSON.parse(localStorage.getItem('ecosort_records') || '[]').filter(
                  (r) => r.userId === user.id
                ).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Section */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 3,
          bgcolor: '#ffffffcc',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography variant="h6" sx={{ color: '#2e7d32', mb: 2 }}>
          Notify Authority — Bin is Full ♻️
        </Typography>

        <Stack direction="row" flexWrap="wrap" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<RecyclingIcon />}
            onClick={() => notifyAuthority('Plastic', 'Decomposable')}
            sx={{
              borderColor: '#2e7d32',
              color: '#2e7d32',
              '&:hover': { bgcolor: '#e8f5e9' },
            }}
          >
            Plastic (Decomposable)
          </Button>
          <Button
            variant="outlined"
            startIcon={<RecyclingIcon />}
            onClick={() => notifyAuthority('Plastic', 'Partially Decomposable')}
            sx={{
              borderColor: '#388e3c',
              color: '#388e3c',
              '&:hover': { bgcolor: '#e8f5e9' },
            }}
          >
            Plastic (Partially)
          </Button>
          <Button
            variant="outlined"
            startIcon={<RecyclingIcon />}
            onClick={() => notifyAuthority('Plastic', 'Non-Decomposable')}
            sx={{
              borderColor: '#1b5e20',
              color: '#1b5e20',
              '&:hover': { bgcolor: '#e8f5e9' },
            }}
          >
            Plastic (Non-Decomposable)
          </Button>
          <Button
            variant="outlined"
            startIcon={<GrassIcon />}
            onClick={() => notifyAuthority('Organic')}
            sx={{
              borderColor: '#66bb6a',
              color: '#2e7d32',
              '&:hover': { bgcolor: '#f1f8e9' },
            }}
          >
            Organic Waste
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => notifyAuthority('General')}
            sx={{
              borderColor: '#81c784',
              color: '#2e7d32',
              '&:hover': { bgcolor: '#f1f8e9' },
            }}
          >
            General Waste
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ color: '#2e7d32' }}>
          Simulate Weighing & Reward
        </Typography>
        <Button
          variant="contained"
          onClick={submitWeighed}
          sx={{
            mt: 2,
            bgcolor: '#2e7d32',
            borderRadius: 2,
            '&:hover': { bgcolor: '#1b5e20' },
          }}
        >
          Simulate Weigh & Reward
        </Button>
      </Paper>
    </Box>
  );
}
