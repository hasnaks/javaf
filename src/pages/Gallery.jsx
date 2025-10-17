import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Container,
  Paper,
} from "@mui/material";

export default function Gallery() {
  const images = [
    "https://www.nobrokerhood.com/blog/wp-content/uploads/2025/07/apartment-waste-management-practice-min-scaled.webp",
    "https://res.cloudinary.com/pillarshotels/image/upload/f_auto/web/cms/resources/sustainability/waste-w1800h1360.jpg",
    "https://dialogue.earth/content/uploads/2022/12/Residents-put-kitchen-waste-into-composting-bins-in-Shangdong-China_2EK0KPH.jpg",
    "https://www.lanecove.nsw.gov.au/files/assets/public/v/1/council-services/waste-and-recycling/new-folder/19.png?dimension=largethumbnail&w=480&h=263",
    "https://litterbug.ca/wp-content/uploads/2024/07/Efficient-Waste-Disposal-at-Home-scaled.jpg",
    "https://clhgroup.co.uk/storage/uploads/recycling-bins-legislation-march-2025.jpg",
  ];

  return (
    <Box sx={{ backgroundColor: "#f1f8e9", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography
          variant="h4"
          sx={{
            color: "#2e7d32",
            fontWeight: "bold",
            mb: 3,
            textAlign: "center",
          }}
        >
          EcoSort Gallery 📸
        </Typography>
        <Typography align="center" sx={{ mb: 4, color: "#4b4b4b" }}>
          Glimpses of our smart waste collection and green initiatives.
        </Typography>

        <Grid container spacing={3}>
          {images.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={`${img}?auto=format&fit=crop&w=800&q=80`}
                  alt={`EcoSort image ${i + 1}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper
          sx={{
            p: 3,
            mt: 5,
            textAlign: "center",
            backgroundColor: "#c8e6c9",
          }}
        >
          <Typography variant="h6" sx={{ color: "#1b5e20" }}>
            Managed by Local Panchayat & EcoSort Authority 🌍
          </Typography>
          <Typography sx={{ mt: 1 }}>
            The EcoSort project is implemented in collaboration with local
            panchayats to promote sustainable waste management at the community
            level. Every neighborhood can become a model green zone!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
