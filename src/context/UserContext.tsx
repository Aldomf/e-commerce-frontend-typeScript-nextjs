import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Product, User } from '@/interfaces/interfaces'; // Assuming you have a User interface

// Step 1: Create a context
interface UserContextType {
  userCartList: Product[] | null;
  setUserCartList: React.Dispatch<React.SetStateAction<Product[] | null>>;
  getUserCartlist: () => Promise<void>; // Function to fetch user info
  deleteFromCart: (productId: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Step 2: Create a provider component to wrap your components
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [userCartList, setUserCartList] = useState<Product[] | null>(null);

  // Function to fetch user info
  const getUserCartlist = async () => {
    try {
      if (user && user.id) { // Check if user object and user id are available
        // Make a GET request to the endpoint
        const response = await axios.get<User>(
          `http://localhost:4000/api/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserCartList(response.data.cartList); // Set user info in state
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Function to handle deleting product from cart
  const deleteFromCart = async (productId: number) => {
    try {
      // Make a DELETE request to remove product from cart
      const response = await axios.delete(
        `http://localhost:4000/api/cart/${user?.id}/delete-product-from-cartList/${productId}`,
        {
          headers: {
            "x-user-id": user?.id // Replace with actual user ID
          }
        }
      );
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  // Fetch user info on component mount
  useEffect(() => {
    if (user) {
      getUserCartlist();
    }
  }, [user]); // Fetch user info whenever user changes

  return (
    <UserContext.Provider value={{ userCartList, getUserCartlist, deleteFromCart, setUserCartList }}>
      {children}
    </UserContext.Provider>
  );
};
