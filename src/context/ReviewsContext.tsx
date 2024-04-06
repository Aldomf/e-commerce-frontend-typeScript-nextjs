import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Comment } from '@/interfaces/interfaces';

// Step 1: Create a context
interface ReviewsContextType {
    fetchProductComments: (productId: number) => Promise<Comment[]>;
    comments: Comment[]
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    averageRating: number | null;
    setAverageRating: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ReviewsContext = createContext<ReviewsContextType | null>(null);

export const useReviews = () => {
  const context = useContext(ReviewsContext)
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider")
  }
  return context
}

// Step 2: Create a provider component to wrap your components
export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [averageRating, setAverageRating] = useState<number | null>(null);
  

  // Function to fetch comments for a product by id
  const fetchProductComments = async (productId: number) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reviews/${productId}/comments`);
      console.log('Fetching product comments:', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching product comments:', error);
      return []; // Return an empty array in case of error
    }
  };

  

  return (
    <ReviewsContext.Provider value={{ fetchProductComments, comments, setComments, averageRating, setAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
};

