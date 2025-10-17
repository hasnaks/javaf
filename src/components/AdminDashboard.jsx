import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Grid,
  Box,
  Chip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { IconButton } from '@mui/material';
import {
  People as PeopleIcon,
  Recycling as RecyclingIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Gavel as GavelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('ecosort_users') || '[]'));
    setRecords(JSON.parse(localStorage.getItem('ecosort_records') || '[]'));
  }, []);

  function refresh() {
    setUsers(JSON.parse(localStorage.getItem('ecosort_users') || '[]'));
    setRecords(JSON.parse(localStorage.getItem('ecosort_records') || '[]'));
  }

  function markCollected(id) {
    const recs = JSON.parse(localStorage.getItem('ecosort_records') || '[]');
    const idx = recs.findIndex((r) => r.id === id);
    if (idx === -1) return;
    recs[idx].status = 'Collected';
    localStorage.setItem('ecosort_records', JSON.stringify(recs));
    setRecords(recs);
    alert('Marked as collected.');
  }

  function addFine(userId) {
    const fines = JSON.parse(localStorage.getItem('ecosort_fines') || '[]');
    fines.push({ id: Date.now(), userId, amount: 50, reason: 'Missed handover' });
    localStorage.setItem('ecosort_fines', JSON.stringify(fines));
    alert('Fine added.');
  }

  function deleteUser(userId) {
    if (!confirm('Delete this user? This action cannot be undone.')) return;
    const us = JSON.parse(localStorage.getItem('ecosort_users') || '[]');
    const remaining = us.filter((u) => u.id !== userId);
    localStorage.setItem('ecosort_users', JSON.stringify(remaining));
    setUsers(remaining);
    alert('User deleted.');
  }

  function editUser(user) {
    const newName = prompt('Edit name', user.name || '');
    if (newName === null) return; // cancelled
    const newEmail = prompt('Edit email', user.email || '');
    if (newEmail === null) return;
    const us = JSON.parse(localStorage.getItem('ecosort_users') || '[]');
    const idx = us.findIndex((u) => u.id === user.id);
    if (idx === -1) return alert('User not found');
    us[idx] = { ...us[idx], name: newName, email: newEmail };
    localStorage.setItem('ecosort_users', JSON.stringify(us));
    setUsers(us);
    alert('User updated.');
  }

  function deleteRecord(id) {
    if (!confirm('Delete this record?')) return;
    const recs = JSON.parse(localStorage.getItem('ecosort_records') || '[]');
    const remaining = recs.filter((r) => r.id !== id);
    localStorage.setItem('ecosort_records', JSON.stringify(remaining));
    setRecords(remaining);
    alert('Record deleted.');
  }

  function handleLogout() {
    // Clear auth-related localStorage keys
    localStorage.removeItem('ecosort_role');
    localStorage.removeItem('ecosort_user');
    localStorage.removeItem('ecosort_token');
    localStorage.removeItem('ecosort_displayName');
    navigate('/');
  }

  function editRecord(record) {
    const newStatus = prompt('Edit status (Pending / Collected)', record.status || 'Pending');
    if (newStatus === null) return;
    const recs = JSON.parse(localStorage.getItem('ecosort_records') || '[]');
    const idx = recs.findIndex((r) => r.id === record.id);
    if (idx === -1) return alert('Record not found');
    recs[idx] = { ...recs[idx], status: newStatus };
    localStorage.setItem('ecosort_records', JSON.stringify(recs));
    setRecords(recs);
    alert('Record updated.');
  }

  const totalPending = records.filter((r) => r.status === 'Pending').length;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#2e7d32' }}>
        Admin Dashboard 🌍
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* ================= Summary Cards ================= */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#e8f5e9',
              borderLeft: '6px solid #2e7d32',
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <PeopleIcon sx={{ color: '#2e7d32', fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {users.length}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#fff3e0',
              borderLeft: '6px solid #ff9800',
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <RecyclingIcon sx={{ color: '#ff9800', fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Pending Waste Records</Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {totalPending}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= Waste Records ================= */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
          Waste Records
        </Typography>
        <Divider sx={{ my: 2 }} />

        {records.length === 0 ? (
          <Typography color="text.secondary">No waste records available.</Typography>
        ) : (
          <List>
            {records.map((r) => (
              <ListItem
                key={r.id}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  bgcolor: '#fafafa',
                  borderRadius: 2,
                  mb: 1,
                  p: 2,
                  boxShadow: 1,
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {r.type} {r.subtype && `- ${r.subtype}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    User ID: {r.userId} | Created: {new Date(r.createdAt).toLocaleString()}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Chip
                      label={r.status}
                      color={r.status === 'Collected' ? 'success' : 'warning'}
                      size="small"
                      icon={
                        r.status === 'Collected' ? <CheckCircleIcon /> : <WarningIcon />
                      }
                    />
                    {r.status !== 'Collected' && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={() => markCollected(r.id)}
                      >
                        Mark Collected
                      </Button>
                    )}
                    <IconButton size="small" onClick={() => editRecord(r)} title="Edit record">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => deleteRecord(r.id)} title="Delete record">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* ================= Manage Users ================= */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
          Manage Users
        </Typography>
        <Divider sx={{ my: 2 }} />

        {users.length === 0 ? (
          <Typography color="text.secondary">No registered users.</Typography>
        ) : (
          <List>
            {users.map((u) => (
              <ListItem
                key={u.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: '#fafafa',
                  borderRadius: 2,
                  mb: 1,
                  p: 2,
                  boxShadow: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {u.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {u.email} — Points: {u.points || 0}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: { xs: 1, sm: 0 } }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<GavelIcon />}
                    onClick={() => addFine(u.id)}
                  >
                    Add Fine
                  </Button>
                  <IconButton size="small" onClick={() => editUser(u)} title="Edit user">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => deleteUser(u.id)} title="Delete user">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        )}
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={refresh}
          sx={{ mt: 2, bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          Refresh Data
        </Button>
      </Paper>
    </Box>
  );
}
