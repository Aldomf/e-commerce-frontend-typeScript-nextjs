import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Product, User } from "@/interfaces/interfaces"; // Assuming you have a User interface
import { useRouter } from "next/navigation";

// Step 1: Create a context
interface WishlistContextType {
  addProductToWishlist: (productId: number) => Promise<void>;
  deleteProductFromWishlist: (productId: number) => Promise<void>;
  getUserWishlist: () => Promise<void>;
  userWishlist: Product[] | null;
  checkIsInWishlist: (productId: number) => boolean;
  isInWishlist: boolean;
  setIsInWishlist: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

// Step 2: Create a provider component to wrap your components
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, token } = useAuth();

  const [userWishlist, setUserWishlist] = useState<Product[] | null>(null);

  const [isInWishlist, setIsInWishlist] = useState(false);

  const addProductToWishlist = async (productId: number) => {
    try {
      if (!token) {
        // Redirect to login page if token doesn't exist
        router.push("/login");
        return; // Exit the function
      }

      const response = await axios.post(
        `http://localhost:4000/api/wishlist/${user?.id}/add-product-to-wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response if needed
      console.log("Product added to wishlist:", response.data);
      setIsInWishlist(true);
      setUserWishlist([...userWishlist!, response.data]);
    } catch (error) {
      // Handle error
      console.error("Error adding product to wishlist:", error);
    }
  };

  const deleteProductFromWishlist = async (productId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/wishlist/${user?.id}/delete-product-from-wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response if needed
      console.log("Product deleted from wishlist:", response.data);
      setIsInWishlist(false);
      setUserWishlist(userWishlist!.filter(product => product.id !== productId));
      
    } catch (error) {
      // Handle error
      console.error("Error deleting product from wishlist:", error);
    }
  };

  const getUserWishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/wishlist/user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response if needed
      console.log("User wishlist:", response.data.wishlist);
      setUserWishlist(response.data.wishlist);
    } catch (error) {
      // Handle error
      console.error("Error fetching user wishlist:", error);
    }
  };

  // Function to check if a product is in the wishlist
  const checkIsInWishlist = (productId: number): boolean => {
    if (!userWishlist) return false;
    return userWishlist.some(product => product.id === productId);
  };

  

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        deleteProductFromWishlist,
        getUserWishlist,
        userWishlist,
        checkIsInWishlist,
        isInWishlist,
        setIsInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
