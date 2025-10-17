import React from 'react';
import { Box, Paper, Typography, Divider, List, ListItem } from '@mui/material';

export default function Settings() {
  const user = JSON.parse(localStorage.getItem('ecosort_user') || 'null');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: '#2e7d32', mb: 2 }}>
        Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Account</Typography>
        <Divider sx={{ my: 1 }} />
        <List>
          <ListItem>
            <strong>Name:</strong>&nbsp;{user?.name || 'Not signed in'}
          </ListItem>
          <ListItem>
            <strong>Email:</strong>&nbsp;{user?.email || '—'}
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
