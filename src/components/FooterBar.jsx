import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Chip } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';

export default function FooterBar() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1b5e20', color: 'white', mt: 4, py: 3 }}>
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              EcoSort
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.9)' }}>
              EcoSort is a community-driven smart waste management initiative that helps
              households segregate waste, earn eco-points, and keep neighborhoods cleaner.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip label="Green Valley Panchayath" color="success" size="small" />
              <Chip label="Smart Bins" color="default" size="small" />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              <Typography variant="body2"><Phone sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} /> +91 9446 123 456</Typography>
              <Typography variant="body2"><Email sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} /> ecosort@greenvalley.gov.in</Typography>
              <Typography variant="body2"><LocationOn sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} /> Ward No. 12, Eco Nagar</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} textAlign={{ xs: 'left', md: 'right' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' }, mt: 1 }}>
              <IconButton aria-label="facebook" size="small" sx={{ color: 'white' }} component={Link} href="#">
                <Facebook />
              </IconButton>
              <IconButton aria-label="twitter" size="small" sx={{ color: 'white' }} component={Link} href="#">
                <Twitter />
              </IconButton>
              <IconButton aria-label="instagram" size="small" sx={{ color: 'white' }} component={Link} href="#">
                <Instagram />
              </IconButton>
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
              © {new Date().getFullYear()} EcoSort — All rights reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
