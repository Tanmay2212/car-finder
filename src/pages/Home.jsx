import React, { useState, useEffect } from "react";
import {
  Container, Box, Grid, TextField, MenuItem, Typography, IconButton, Badge,
  CircularProgress, FormControl, InputLabel, Select, Pagination
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CarCard from "../components/CarCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('carWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const limit = 10;

  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetchCars();
  }, [searchInput, brand, fuel, priceSort, page]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:3001/cars?`;
      
      const params = new URLSearchParams({
        _page: page,
        _limit: limit,
        ...(searchInput && { name_like: searchInput.trim() }),
        ...(brand && { brand }),
        ...(fuel && { fuelType: fuel }),
        ...(priceSort && { _sort: "price", _order: priceSort })
      });

      const res = await axios.get(`${url}${params.toString()}`);
      
      const total = parseInt(res.headers['x-total-count'], 10) || 0;
      
      setCars(res.data);
      setTotalCount(total);
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistAction = (car) => {
    setWishlist(prev => 
      prev.includes(car.id) 
        ? prev.filter(id => id !== car.id)
        : [...prev, car.id]
    );
  };

  // Keep all existing handlers
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  const handleFuelChange = (e) => {
    setFuel(e.target.value);
    setPage(1);
  };

  const handlePriceSortChange = (e) => {
    setPriceSort(e.target.value);
    setPage(1);
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search Car Name"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </Grid>

          {/* Brand Filter */}
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                value={brand}
                label="Brand"
                onChange={handleBrandChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Toyota">Toyota</MenuItem>
                <MenuItem value="Honda">Honda</MenuItem>
                <MenuItem value="Ford">Ford</MenuItem>
                <MenuItem value="Tesla">Tesla</MenuItem>
                <MenuItem value="BMW">BMW</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Fuel Filter */}
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                value={fuel}
                label="Fuel"
                onChange={handleFuelChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Price Sort */}
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort Price</InputLabel>
              <Select
                value={priceSort}
                label="Sort"
                onChange={handlePriceSortChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Wishlist Icon */}
          <Grid item>
            <IconButton component={Link} to="/wishlist">
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box textAlign="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cars.length > 0 ? (
            cars.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <CarCard 
                  car={car}
                  handleAction={handleWishlistAction}
                  isInWishlist={wishlist.includes(car.id)}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" textAlign="center" width="100%">
              No cars found
            </Typography>
          )}
        </Grid>
      )}

      <Box my={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalCount / limit)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Home;