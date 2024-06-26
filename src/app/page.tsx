"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import SectionOne from "@/components/homapage/SectionOne";
import BestDeals from "@/components/homapage/BestDeals";
import SectionTwo from "@/components/homapage/SectionTwo";
import PopularCategories from "@/components/homapage/PopularCategories";
import StartYourCart from "@/components/homapage/StartYourCart";
import MostPopular from "@/components/homapage/MostPopular";
import SectionFour from "@/components/homapage/SectionFour";
import NewProducts from "@/components/homapage/NewProducts";
import NewsLetter from "@/components/homapage/NewsLetter";
import SectionThree2 from "@/components/homapage/SectionThree2";
// import HeroMobile from '@/components/homapage/HeroMobile';
// import HeroLaptop from '@/components/homapage/HeroLaptop';
import { useMediaQuery } from "react-responsive";
// import MobileHeader from '@/components/layouts/MobileHeader';
// import LaptopHeader from '@/components/layouts/LaptopHeader';
import Footer from "@/components/layouts/Footer";
import { Toaster } from "react-hot-toast";
//import CartListSideBar from '@/components/homapage/CartListSideBar';
import { useAddProduct } from "@/context/AddProductContext";

const LaptopHeader = dynamic(
  () => import("../components/layouts/LaptopHeader")
);
const MobileHeader = dynamic(
  () => import("../components/layouts/MobileHeader")
);
const HeroLaptop = dynamic(() => import("../components/homapage/HeroLaptop"));
const HeroMobile = dynamic(() => import("../components/homapage/HeroMobile"));
const CartListSideBar = dynamic(
  () => import("../components/homapage/CartListSideBar")
);

function HomePage() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const { toggleSidebar, isSidebarOpen } = useAddProduct();

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash.substring(1);

    // Check if there's a hash in the URL
    if (hash) {
      // Find the element with the corresponding id
      const element = document.getElementById(hash);

      // If the element exists, scroll to it with an offset to account for the header height
      if (element) {
        const offset = 10; // Adjust this value according to your header height
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      {isTabletOrLarger ? <HeroLaptop /> : <HeroMobile />}
      <SectionOne />
      <BestDeals />
      <SectionTwo />
      <PopularCategories />
      <StartYourCart />
      <div id="app">
        <SectionThree2 />
      </div>
      <MostPopular />
      <SectionFour />
      <NewProducts />
      <NewsLetter />
      <Footer />
      <CartListSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Toaster />
    </>
  );
}

export default HomePage;
