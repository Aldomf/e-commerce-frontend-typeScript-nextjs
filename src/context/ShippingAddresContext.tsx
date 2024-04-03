import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { ShippingAddress } from '@/interfaces/interfaces'; // Assuming you have a User interface
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Step 1: Create a context
interface ShippingAddressContextType {
    addShippingAddress: (addressData: ShippingAddress) => Promise<void>;
    updateShippingAddress: (addressData: Partial<ShippingAddress>) => Promise<void>;
    getShippingAddress: () => Promise<ShippingAddress | null>;
    shippingAddress: ShippingAddress | null
    setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress | null>>;
    shippingAddressError: string
}

export const ShippingAddressContext = createContext<ShippingAddressContextType | null>(null);

export const useShippingAddress = () => {
  const context = useContext(ShippingAddressContext);
  if (!context) {
    throw new Error("useShippingAddress must be used within a ShippingAddressProvider");
  }
  return context;
};

// Step 2: Create a provider component to wrap your components
export const ShippingAddressProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, token } = useAuth();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [shippingAddressError, setShippingAddressError] = useState<string>("");

  const addShippingAddress = async (addressData: ShippingAddress) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/shipping-address/${user?.id}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response if needed
      console.log("Shipping address added:", response.data);
      window.location.reload();
      toast.success("The shipping address has been registered successfully!", {
        duration: 3000,
      });
    } catch (error: any) {
      setShippingAddressError(error.response.data.message)
      console.error("Error adding shipping address:", error);
    }
  };

  const updateShippingAddress = async (addressData: Partial<ShippingAddress>) => {
    try {
        const { id, ...dataWithoutId } = addressData as { id?: any };
      const response = await axios.patch(
        `http://localhost:4000/api/shipping-address/${user?.id}`,
        dataWithoutId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response if needed
      console.log("Shipping address updated:", response.data);
      toast.success("The shipping address has been updated successfully!", {
        duration: 3000,
      });
    } catch (error: any) {
      setShippingAddressError(error.response.data.message)
      console.error("Error updating shipping address:", error);
    }
  };

  const getShippingAddress = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/shipping-address/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response if needed
      console.log("Shipping address fetched:", response.data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching shipping address:", error);
      return null;
    }
  };

  

  return (
    <ShippingAddressContext.Provider value={{ addShippingAddress, updateShippingAddress, getShippingAddress, shippingAddress, setShippingAddress, shippingAddressError }}>
      {children}
    </ShippingAddressContext.Provider>
  );
};
