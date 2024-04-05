import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/interfaces/interfaces';
import { Categories } from '@/interfaces/interfaces';

// Step 1: Create a context
interface ProductContextType {
  products: Product[]; // Define the type of products
  categories: Categories[];
  productById: Product | undefined;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>
  //fetchProducts: () => Promise<void>; // Update the return type of fetchProducts to Promise<void>
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}

// Step 2: Create a provider component to wrap your components
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize products state with an empty array
  const [categories, setCategories] = useState<Categories[]>([]);
  const [productById, setProductById] = useState<Product | undefined>();

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product');
      setProducts(response.data); // Update products state with fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to fetch products
  const fetchProductById = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/product/${id}`);
      setProductById(response.data); // Update products state with fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to fetch products
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, fetchCategories, productById, fetchProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

