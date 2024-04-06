import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "./UserContext";
import { Product, ProductQuantities } from "@/interfaces/interfaces";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

// Step 1: Create a context
interface AddProductContextType {
  addToCart: (productId: number) => Promise<void>;
  toggleSidebar: () => void;
  handleAddToCart: (productId: number) => Promise<void>;
  handleDeleteFromCart: (productId: number) => Promise<void>;
  isSidebarOpen: boolean;
  updatedCartList: Product[];
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sumOfPrices: number;
  handleIncreaseQuantity: (productId: number) => Promise<void>;
  handleDecreaseQuantity: (productId: number) => Promise<void>;
  productQuantities: ProductQuantities;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const AddProductContext = createContext<AddProductContextType | null>(
  null
);

export const useAddProduct = () => {
  const context = useContext(AddProductContext);
  if (!context) {
    throw new Error("useAddProduct must be used within a AddProductProvider");
  }
  return context;
};

// Step 2: Create a provider component to wrap your components
export const AddProductProvider = ({ children }: { children: ReactNode }) => {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  const router = useRouter();
  const { user, token } = useAuth();

  const { getUserCartlist, userCartList, deleteFromCart, setUserCartList  } = useUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [updatedCartList, setUpdatedCartList] = useState<Product[]>([]);

  const [sumOfPrices, setSumOfPrices] = useState(0);

  // Local state to keep track of quantity for each product
  const [productQuantities, setProductQuantities] = useState<ProductQuantities>({});

  // Function to handle adding product to cart
  const addToCart = async (productId: number) => {
    try {
      // Make a POST request to the endpoint
      const response = await axios.post(
        `http://localhost:4000/api/cart/${user?.id}/add-product-to-cartList/${productId}`,
        {},
        {
          headers: {
            "x-user-id": user?.id, // Replace with actual user ID
          },
        }
      );
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      if (!token) {
        // Redirect to login page if token doesn't exist
        router.push("/login");
        return; // Exit the function
    }
    
      if (isTabletOrLarger) {
        // Execute addToCart logic only if screen width > 768px
        await addToCart(productId);
        await getUserCartlist(); // Fetch the updated cart list after adding the product
        setIsSidebarOpen(true); // Open sidebar when a product is added to cart
      } else {
        await addToCart(productId);
        await getUserCartlist();
        // Navigate to "/cartlist" route if screen width <= 768px
        router.push("/cartlist");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    if (userCartList) {
      // Set the updated cart list to the state
      setUpdatedCartList(userCartList);
      console.log(updatedCartList);
    }
  }, [userCartList]);
  
  

  // Function to handle deletion of a product from the cart
  const handleDeleteFromCart = async (productId: number) => {
    try {
      // Delete the product from the cart
      await deleteFromCart(productId);
      // Update the cart list by filtering out the deleted product
      setUpdatedCartList(
        updatedCartList.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  // Function to increase the quantity of a product in the cart
const increaseQuantity = async (productId: number) => {
  try {
    // Make a PATCH request to the endpoint
    const response = await axios.patch(
      `http://localhost:4000/api/cart/${user?.id}/${productId}/increase-quantity`,
      {},
      {
        headers: {
          "x-user-id": user?.id, // Replace with actual user ID
        },
      }
    );
    console.log(response.data); // Log the response if needed
  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};

// Function to decrease the quantity of a product in the cart
const decreaseQuantity = async (productId: number) => {
  try {
    // Make a PATCH request to the endpoint
    const response = await axios.patch(
      `http://localhost:4000/api/cart/${user?.id}/${productId}/decrease-quantity`,
      {},
      {
        headers: {
          "x-user-id": user?.id, // Replace with actual user ID
        },
      }
    );
    console.log(response.data); // Log the response if needed
  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};

const handleIncreaseQuantity = async (productId: number) => {
  try {
    await increaseQuantity(productId);
    await getUserCartlist(); // Fetch the updated cart list after increasing quantity
  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};

// Function to handle decreasing the quantity of a product in the cart
const handleDecreaseQuantity = async (productId: number) => {
  try {
    await decreaseQuantity(productId);
    await getUserCartlist(); // Fetch the updated cart list after decreasing quantity
  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};

// Function to update the quantity of a product
const updateQuantity = (productId: number, quantity: number) => {
  setProductQuantities({
    ...productQuantities,
    [productId]: quantity,
  });
};

// Initialize product quantities when updatedCartList changes
useEffect(() => {
  // Initialize productQuantities object
  const initialQuantities: ProductQuantities = {};
  // Loop through updatedCartList and set initial quantity to 1 for each product
  updatedCartList.forEach((product) => {
    initialQuantities[product.id] = productQuantities[product.id] || 1;
  });
  // Set the initial state
  setProductQuantities(initialQuantities);
}, [updatedCartList]);

useEffect(() => {
  if (updatedCartList) {
    const sum: number = updatedCartList.reduce(
      (total: number, product: Product) =>
        total + parseFloat(product.priceWithDiscount) * (productQuantities[product.id] || 1),
      0
    );
    const roundedSum: number = parseFloat(sum.toFixed(2));
    setSumOfPrices(roundedSum);
  }
}, [updatedCartList, productQuantities]);


  return (
    <AddProductContext.Provider
      value={{
        addToCart,
        toggleSidebar,
        handleAddToCart,
        handleDeleteFromCart,
        updatedCartList,
        isSidebarOpen,
        setIsSidebarOpen,
        sumOfPrices,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        productQuantities,
        updateQuantity,
      }}
    >
      {children}
    </AddProductContext.Provider>
  );
};
