import React, { useState, useEffect } from "react";
import { ArrowUpward } from "@mui/icons-material";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1000);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => setIsVisible(false), 3000);
      setTimeoutId(newTimeoutId);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      className="fixed bottom-5 right-5 bg-red-700 hover:bg-red-600 text-white w-12 h-12 rounded-full flex justify-center items-center"
      onClick={scrollToTop}
    >
      <ArrowUpward />
    </button>
  );
};

export default BackToTopButton;
