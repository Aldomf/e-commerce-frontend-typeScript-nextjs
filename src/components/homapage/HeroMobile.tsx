"use client";
import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface CustomImageGalleryItem {
  original: string;
  description: JSX.Element;
  button: string;
}

interface ReactImageGalleryItem {
  original: string;
  description: string;
  button: string;
}

function HeroMobile() {
  const slides: CustomImageGalleryItem[] = [
    {
      original: "/background3.jpg",
      description: (
        <div className="flex flex-col justify-start items-start text-black font-bold">
          <span className="text-lg">Easy, Fresh & Convenient</span>
          <br />
          <span className="text-4xl mb-2">Stock Up on</span>
          <span className="text-4xl">Daily Essentials</span>
          <br />
          <span className="text-2xl mb-2">Save Big on Your</span>
          <span className="text-2xl">Favorite Brands</span>
        </div>
      ),
      button: "Shop Now",
    },
    {
      original: "/back-5.jpg",
      description: (
        <div className="flex flex-col justify-start items-start text-black font-bold">
          <span className="text-lg">Easy, Fresh & Convenient</span>
          <br />
          <span className="text-4xl mb-2">Stock Up on</span>
          <span className="text-4xl">Daily Essentials</span>
          <br />
          <span className="text-2xl mb-2">Save Big on Your</span>
          <span className="text-2xl">Favorite Brands</span>
        </div>
      ),
      button: "Shop Now",
    },
    {
      original: "/back-1.jpg",
      description: (
        <div className="flex flex-col justify-start items-start text-black font-bold">
          <span className="text-lg">Easy, Fresh & Convenient</span>
          <br />
          <span className="text-4xl mb-2">Stock Up on</span>
          <span className="text-4xl">Daily Essentials</span>
          <br />
          <span className="text-2xl mb-2">Save Big on Your</span>
          <span className="text-2xl">Favorite Brands</span>
        </div>
      ),
      button: "Shop Now",
    },
    {
      original: "/back-55.jpg",
      description: (
        <div className="flex flex-col justify-start items-start text-black font-bold">
          <span className="text-lg">Easy, Fresh & Convenient</span>
          <br />
          <span className="text-4xl mb-2">Stock Up on</span>
          <span className="text-4xl">Daily Essentials</span>
          <br />
          <span className="text-2xl mb-2">Save Big on Your</span>
          <span className="text-2xl">Favorite Brands</span>
        </div>
      ),
      button: "Shop Now",
    },
  ];

  const convertedSlides: ReactImageGalleryItem[] = slides.map((slide) => ({
    original: slide.original,
    description: slide.description.toString(), // Convert JSX element to string
    button: slide.button,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative">
      <ImageGallery
        items={convertedSlides}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        showNav={false}
        autoPlay={true}
        slideInterval={10000}
        slideDuration={1000}
        onSlide={(currentIndex) => setCurrentIndex(currentIndex)}
        renderItem={(item) => (
          <div className="relative h-[400px]">
            <div className="absolute top-0 left-0 w-full h-full bg-[#FEEED2] opacity-20"></div>
            <img
              src={item.original}
              alt={item.description}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-20 left-8 text-white flex flex-col items-start">
              <p className="text-xs mb-2 text-center md:mb-6 md:text-xl">
                {slides[currentIndex].description}
              </p>
              <button className="bg-[#A3C9BC] text-white px-10 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 hover:bg-white">
                {slides[currentIndex].button}
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default HeroMobile;
