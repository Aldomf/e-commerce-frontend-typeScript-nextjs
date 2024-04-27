import React, { useState, useEffect } from "react";
import { ArrowUpward } from "@mui/icons-material";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to check if user has scrolled down enough to show the button
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1000);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => setIsVisible(false), 3000); // Hides the button after 3 seconds of no scrolling
      setTimeoutId(newTimeoutId);
    };

    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]); // Include timeoutId in the dependency array

  // Function to scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling behavior
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-5 right-5 bg-red-700 hover:bg-red-600 text-white w-12 h-12 rounded-full flex justify-center items-center"
          onClick={scrollToTop}
        >
          <ArrowUpward />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
