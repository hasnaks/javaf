import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  Grid,
  LinearProgress,
  Button,
  Chip,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

// Public image for the bin (replace with your own asset if desired)
const BIN_IMAGE = 'https://i0.wp.com/lesoft.com/wp-content/uploads/2025/03/blog-70.jpg?resize=980%2C675&ssl=1';

export default function BinsInfo() {
  // Mock sensor data (in a real system this would come from an API)
  const mockBin = {
    id: 'BIN-4521',
    type: 'Organic',
    location: 'Household - Block A, Eco Nagar',
    fillPercentage: 72, // percent full
    lastCollected: '2025-10-10 07:30',
    estimatedCollectionCost: 12.5, // ₹ per pickup (example)
    maintenanceEstimatePerYear: 150, // ₹ per year
    sensorType: 'Ultrasonic (distance) + Weight sensor',
  };

  const currency = (n) => `₹${n.toFixed(2)}`;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0b5f3b', fontWeight: 700 }}>
        Smart Bin — Technical & Operational Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardMedia component="img" height="260" image={BIN_IMAGE} alt="Smart bin" />
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1b5e20', fontWeight: 700 }}>
                {mockBin.type} Bin — {mockBin.id}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>{mockBin.location}</Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Fill level</Typography>
                  <LinearProgress variant="determinate" value={mockBin.fillPercentage} sx={{ height: 10, borderRadius: 2, mt: 1 }} />
                  <Typography sx={{ mt: 1 }}>{mockBin.fillPercentage}%</Typography>
                </Box>

                <Chip
                  label={mockBin.fillPercentage > 80 ? 'Needs Pickup' : 'Operational'}
                  color={mockBin.fillPercentage > 80 ? 'error' : 'success'}
                  sx={{ fontWeight: 700 }}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Sensors: {mockBin.sensorType}. The system combines distance and weight readings
                  to compute a confidence score for the fill level. If confidence & fill exceed a
                  threshold (e.g., 80%), the bin is scheduled for collection.
                </Typography>
              </Box>

              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button variant="contained" color="primary" size="small">Mark as Collected</Button>
                <Button variant="outlined" size="small" href="/gallery">View Gallery</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }} elevation={1}>
                <Typography variant="h6" sx={{ color: '#1b5e20', fontWeight: 700 }}>Usage Guidelines</Typography>
                <List sx={{ mt: 1 }}>
                  <ListItem sx={{ py: 0.5 }}>• Organic waste only: food scraps, tea/coffee, garden clippings.</ListItem>
                  <ListItem sx={{ py: 0.5 }}>• Use compostable liners where available; avoid pouring liquids directly into the bin.</ListItem>
                  <ListItem sx={{ py: 0.5 }}>• Do not place hazardous materials, batteries, or heavy construction debris in this bin.</ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }} elevation={1}>
                <Typography variant="h6" sx={{ color: '#1b5e20', fontWeight: 700 }}>Cost & Maintenance (Est.)</Typography>
                <Table sx={{ mt: 1 }} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Unit cost (one-time)</TableCell>
                      <TableCell align="right">{currency(250)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Smart tag & sensors</TableCell>
                      <TableCell align="right">{currency(150)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Collection (per pickup)</TableCell>
                      <TableCell align="right">{currency(mockBin.estimatedCollectionCost)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Maintenance (annual estimate)</TableCell>
                      <TableCell align="right">{currency(mockBin.maintenanceEstimatePerYear)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Total initial outlay</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>{currency(250 + 150)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  The Panchayath may amortize these costs over the expected service life (e.g., 5 years)
                  and include ongoing maintenance costs in municipal budgets or recovery schemes.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }} elevation={1}>
                <Typography variant="h6" sx={{ color: '#1b5e20', fontWeight: 700 }}>Fill Detection Methods</Typography>
                <List sx={{ mt: 1 }}>
                  <ListItem sx={{ py: 0.5 }}>Ultrasonic distance sensor — primary indicator of fill height.</ListItem>
                  <ListItem sx={{ py: 0.5 }}>Load cell / weight sensor — validates the presence of compacted waste.</ListItem>
                  <ListItem sx={{ py: 0.5 }}>Camera-based image analysis (optional) — helps detect contamination or overfilling at the mouth.</ListItem>
                  <ListItem sx={{ py: 0.5 }}>Confidence scoring — combine sensors + time-based heuristics to reduce false positives.</ListItem>
                </List>

                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Operational rule: when combined confidence {'&'} fill percentage {'>'} 80%, the bin is flagged
                  for collection and added to the next optimized collection route.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
