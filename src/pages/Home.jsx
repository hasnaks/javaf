import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Divider,
} from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import ParkIcon from "@mui/icons-material/Park";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalGovernmentIcon from "@mui/icons-material/AccountBalance"; // Panchayat icon
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "#f9fbe7", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581574209943-ec47d0d3d3f5?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          py: { xs: 10, md: 16 },
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            Welcome to EcoSort 🌿
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              mb: 4,
              maxWidth: 700,
              mx: "auto",
              textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
            }}
          >
            Smart waste segregation, eco-points, and sustainable living.
            Together, let’s build a cleaner and greener tomorrow.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#2e7d32",
              "&:hover": { backgroundColor: "#1b5e20" },
              borderRadius: 4,
              px: 5,
              py: 1.2,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
            href="/register"
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* How EcoSort Works */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#2e7d32", fontWeight: "bold", mb: 4 }}
        >
          How EcoSort Works
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, textAlign: "center", boxShadow: 3 }}>
              <ParkIcon sx={{ fontSize: 50, color: "#2e7d32" }} />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#1b5e20", mb: 1 }}>
                  Smart Segregation
                </Typography>
                <Typography variant="body2">
                  Users dispose of waste responsibly using color-coded smart bins connected to EcoSort for automatic tracking and sorting.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, textAlign: "center", boxShadow: 3 }}>
              <RecyclingIcon sx={{ fontSize: 50, color: "#388e3c" }} />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#1b5e20", mb: 1 }}>
                  Recycling & Tracking
                </Typography>
                <Typography variant="body2">
                  Waste collection is monitored, and users earn eco-points for verified recycling actions. Data syncs with the EcoSort dashboard.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, textAlign: "center", boxShadow: 3 }}>
              <GroupsIcon sx={{ fontSize: 50, color: "#43a047" }} />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#1b5e20", mb: 1 }}>
                  Community Rewards
                </Typography>
                <Typography variant="body2">
                  Eco-points can be redeemed for local discounts, coupons, or green initiatives organized by the Panchayat.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Gallery Preview */}
      <Box sx={{ py: 8, backgroundColor: "#e8f5e9" }}>
        <Container sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
          >
            EcoSort in Action
          </Typography>
          <Typography sx={{ mb: 4, color: "#4e614e" }}>
            Explore images of our smart bins, community drives, and recycling events.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<PhotoLibraryIcon />}
            sx={{
              borderColor: "#2e7d32",
              color: "#2e7d32",
              "&:hover": {
                backgroundColor: "#2e7d32",
                color: "white",
              },
            }}
            href="/gallery"
          >
            View Gallery
          </Button>
        </Container>
      </Box>

      {/* Panchayat / Authority Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#2e7d32", fontWeight: "bold", mb: 4 }}
          >
            Panchayat & Authority Partnership
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ color: "#4e614e", mb: 2 }}>
                EcoSort works in collaboration with local Panchayats and municipal authorities to ensure efficient waste management.
                Each household is provided with smart bins, and tracking data helps authorities plan better waste disposal routes.
              </Typography>
              <Typography variant="body1" sx={{ color: "#4e614e" }}>
                The Panchayat also oversees maintenance, reward distribution, and sustainability awareness programs.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign="center">
              <LocalGovernmentIcon sx={{ fontSize: 100, color: "#43a047" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1b5e20",
          color: "white",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EcoSort | Smart Waste Management
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Supported by Local Panchayaths & Municipal Authorities | © 2025 EcoSort
        </Typography>
      </Box>
    </Box>
  );
}
