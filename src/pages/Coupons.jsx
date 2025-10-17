import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Paper,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function Coupons() {
  const [user, setUser] = useState(null);
  const [coupons] = useState([
    {
      id: 1,
      title: "10% Off Grocery Purchase",
      description: "Use your eco-points to get discounts on sustainable grocery brands.",
      points: 100,
      img: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    },
    {
      id: 2,
      title: "Free Eco-Friendly Bag",
      description: "Redeem 150 points to receive a reusable shopping bag.",
      points: 150,
      img: "https://cdn-icons-png.flaticon.com/512/2906/2906840.png",
    },
    {
      id: 3,
      title: "25% Off Compost Bin",
      description: "Help reduce waste with a home compost bin at a discounted rate.",
      points: 200,
      img: "https://cdn-icons-png.flaticon.com/512/3211/3211363.png",
    },
    {
      id: 4,
      title: "Tree Planting Contribution",
      description: "Contribute to planting a tree by redeeming 300 points.",
      points: 300,
      img: "https://cdn-icons-png.flaticon.com/512/4151/4151037.png",
    },
  ]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("ecosort_user"));
    setUser(u);
  }, []);

  const redeemCoupon = (coupon) => {
    if (!user) {
      alert("Please log in as a user to redeem coupons.");
      return;
    }
    if ((user.points || 0) < coupon.points) {
      alert(`You need ${coupon.points} points to redeem this coupon.`);
      return;
    }
    const updatedUser = {
      ...user,
      points: user.points - coupon.points,
    };
    localStorage.setItem("ecosort_user", JSON.stringify(updatedUser));
    localStorage.setItem(
      "ecosort_users",
      JSON.stringify(
        JSON.parse(localStorage.getItem("ecosort_users") || "[]").map((u) =>
          u.id === user.id ? updatedUser : u
        )
      )
    );
    setUser(updatedUser);
    alert(`🎉 Coupon redeemed: ${coupon.title}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: "#1b5e20", fontWeight: "bold" }}>
        🎁 EcoSort Coupons & Rewards
      </Typography>

      <Paper sx={{ p: 2, mt: 2, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h6" sx={{ color: "#2e7d32", display: "flex", alignItems: "center" }}>
          <EmojiEventsIcon sx={{ mr: 1 }} /> Your Eco-Points: {user?.points || 0}
        </Typography>
        <Typography sx={{ mt: 1, color: "#4b4b4b" }}>
          Redeem your eco-points for exciting eco-friendly rewards. The more you recycle, the more you earn!
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {coupons.map((coupon) => (
          <Grid item xs={12} sm={6} md={3} key={coupon.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={coupon.img}
                alt={coupon.title}
                sx={{ objectFit: "contain", p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2e7d32" }}>
                  <LocalOfferIcon sx={{ mr: 1, color: "#43a047" }} />
                  {coupon.title}
                </Typography>
                <Typography sx={{ mt: 1, color: "#555" }}>{coupon.description}</Typography>
                <Typography sx={{ mt: 1, fontWeight: "bold", color: "#1b5e20" }}>
                  Required Points: {coupon.points}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#2e7d32",
                    "&:hover": { backgroundColor: "#1b5e20" },
                    borderRadius: 2,
                  }}
                  onClick={() => redeemCoupon(coupon)}
                >
                  Redeem
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
