import React, { useState, useEffect } from "react";
import { 
  Container, 
  Box, 
  Grid, 
  Typography,
  CircularProgress,
  Button
} from "@mui/material";
import axios from "axios";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistCars, setWishlistCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistCars = async () => {
      try {
        const wishlistIds = JSON.parse(localStorage.getItem('carWishlist')) || [];
        
        if (wishlistIds.length > 0) {
          const response = await axios.get('http://localhost:3001/cars');
          const filteredCars = response.data.filter(car => 
            wishlistIds.includes(car.id)
          );
          setWishlistCars(filteredCars);
        }
      } catch (error) {
        console.error("Error fetching wishlist cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistCars();
  }, []);

  const handleRemoveFromWishlist = (carId) => {
    const updatedWishlist = wishlistCars.filter(car => car.id !== carId);
    setWishlistCars(updatedWishlist);
    localStorage.setItem('carWishlist', JSON.stringify(updatedWishlist.map(car => car.id)));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Your Wishlist</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
      
      {wishlistCars.length > 0 ? (
        <Grid container spacing={3}>
          {wishlistCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <CarCard 
                car={car}
                isInWishlist={true}
                handleAction={() => handleRemoveFromWishlist(car.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Browse Cars
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Wishlist;