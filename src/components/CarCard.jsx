import React from "react";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CarCard = ({ car, handleAction, isInWishlist }) => {
  return (
    <Card sx={{
      maxWidth: 300,
      margin: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: 6,
      },
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={car?.image || "https://via.placeholder.com/300x180?text=No+Image"}
          alt={car?.name || "Car Image"}
          sx={{ objectFit: "cover" }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: isInWishlist ? 'red' : 'rgba(255,255,255,0.7)',
            backgroundColor: 'rgba(0,0,0,0.2)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.3)',
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleAction(car);
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {car?.name || "Unnamed Car"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <strong>Brand:</strong> {car?.brand || "Unknown"} <br />
          <strong>Fuel:</strong> {car?.fuelType || "N/A"} <br />
          <strong>Seats:</strong> {car?.seatingCapacity || "-"} <br />
          <strong>Price:</strong> ₹{car?.price ? car.price.toLocaleString() : "N/A"}
        </Typography>
      </CardContent>

      <Box sx={{ p: 1 }}>
        <Button
          fullWidth
          variant={isInWishlist ? "outlined" : "contained"}
          color={isInWishlist ? "error" : "primary"}
          onClick={(e) => {
            e.stopPropagation();
            handleAction(car);
          }}
        >
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </Box>
    </Card>
  );
};

export default CarCard;