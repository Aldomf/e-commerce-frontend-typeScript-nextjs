import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "@/interfaces/interfaces";
import { Categories } from "@/interfaces/interfaces";

// Step 1: Create a context
interface ProductContextType {
  products: Product[]; // Define the type of products
  categories: Categories[];
  productById: Product | undefined;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  //fetchProducts: () => Promise<void>; // Update the return type of fetchProducts to Promise<void>
  minPrice: number;
  maxPrice: number;
  inputMaxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setInputMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  filteredProducts: Product[];
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

// Step 2: Create a provider component to wrap your components
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize products state with an empty array
  const [categories, setCategories] = useState<Categories[]>([]);
  const [productById, setProductById] = useState<Product | undefined>();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [inputMaxPrice, setInputMaxPrice] = useState(100);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product");
      setProducts(response.data); // Update products state with fetched data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to fetch products
  const fetchProductById = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/${id}`
      );
      setProductById(response.data); // Update products state with fetched data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to fetch products
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   // Find the highest price among all products
  //   const highestPrice = Math.max(
  //     ...products.map((product) =>
  //       parseFloat(product.priceWithDiscount ?? product.price)
  //     )
  //   );
  //   setMaxPrice(highestPrice);
  //   setInputMaxPrice(highestPrice); // Set inputMaxPrice to the initial maxPrice
  // }, [products, maxPrice]);

  const filteredProducts = products.filter((product) => {
    // Check if discount is active and if priceWithDiscount exists
    if (product.discountActive && product.priceWithDiscount) {
      const discountedPrice = parseFloat(product.priceWithDiscount);
      return discountedPrice >= minPrice && discountedPrice <= inputMaxPrice; // Use inputMaxPrice for filtering
    } else {
      const regularPrice = parseFloat(product.price);
      return regularPrice >= minPrice && regularPrice <= inputMaxPrice; // Use inputMaxPrice for filtering
    }
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        fetchCategories,
        productById,
        fetchProductById,
        minPrice,
        maxPrice,
        inputMaxPrice,
        setMinPrice,
        setMaxPrice,
        setInputMaxPrice,
        filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
