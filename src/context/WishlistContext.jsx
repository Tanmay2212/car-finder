import { createContext, useContext, useState } from "react";

// Create the context
const WishlistContext = createContext();

// Create the provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (car) => {
    setWishlist((prev) => [...prev, car]);
  };

  const removeFromWishlist = (carId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== carId));
  };

  const isInWishlist = (carId) => {
    return wishlist.some((item) => item.id === carId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Create a custom hook for easy usage
export const useWishlist = () => useContext(WishlistContext);
