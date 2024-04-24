import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/interfaces/interfaces"; 

// Step 1: Create a context
interface CheckoutAndOrderContextType {
  createCheckoutSession: () => Promise<void>;
  getUserOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Promise<void>;
  orders: Order[] | null;
  orderById: Order | null;
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateOrderStatus: (orderId: string) => Promise<void>;
}

export const CheckoutAndOrderContext =
  createContext<CheckoutAndOrderContextType | null>(null);

export const useCheckoutAndOrder = () => {
  const context = useContext(CheckoutAndOrderContext);
  if (!context) {
    throw new Error(
      "useCheckoutAndOrder must be used within a CheckoutAndOrderProvider"
    );
  }
  return context;
};

// Step 2: Create a provider component to wrap your components
export const CheckoutAndOrderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, token } = useAuth();

  const [orders, setOrders] = useState<Order[] | null>(null);
  const [orderById, setOrderById] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createCheckoutSession = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout/session/${user?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response, e.g., redirect user to Stripe checkout page
      window.location = response.data.session.url;
    } catch (error) {
      // Handle error
      console.error("Error creating checkout session:", error);
    }
  };

  const getUserOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response, e.g., store user orders in state
      console.log("User orders:", response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      // Handle error
      console.error("Error fetching user orders:", error);
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${user?.id}/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response, e.g., set specific order data
      console.log("User orders:", response.data);
      setOrderById(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching order by id:", error);
      throw error; // Rethrow the error to handle it at a higher level if needed
    }
  };

  // New method to update order status
  const updateOrderStatus = async (orderId: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${user?.id}/${orderId}/status`,
        { }, // Body containing the status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // If successful, update the order status locally or fetch updated orders
      await getUserOrders();
    } catch (error) {
      // Handle error
      console.error("Error updating order status:", error);
      throw error; // Rethrow the error to handle it at a higher level if needed
    }
  };

  return (
    <CheckoutAndOrderContext.Provider
      value={{ createCheckoutSession, getUserOrders, getOrderById, orders, isLoading, setIsLoading, orderById, updateOrderStatus }}
    >
      {children}
    </CheckoutAndOrderContext.Provider>
  );
};
