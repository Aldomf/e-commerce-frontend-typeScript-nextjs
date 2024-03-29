"use client";
import LaptopSidebar from "@/components/category/LaptopSideBar";
import MobileSidebar from "@/components/category/MobileSideBar";
import ProductCard from "@/components/homapage/ProductCard";
import React from "react";
import { useParams } from "next/navigation";
import { useProduct } from "@/context/productContext"; 
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";

function All() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const { products } = useProduct();

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
        <div className="pb-12">
          <h2 className="font-bold text-3xl mb-4 mt-6 md:text-5xl lg:text-6xl xl:text-7xl lg:py-10 text-center md:mb-10">
            All Products
          </h2>
          {isTabletOrMobile ? <MobileSidebar /> : ""}
          <div className="lg:flex">
            {!isTabletOrMobile ? (
              <div className="w-[20%] lg:pl-8 xl:pl-14">
                <LaptopSidebar />
              </div>
            ) : (
              ""
            )}
            <div className="lg:w-[80%]">
              <div className="px-6 ssm:grid ssm:grid-cols-2 ssm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-3 xl:gap-10 lg:grid-cols-4 xl:grid-cols-5">
                <ProductCard products={products}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default All;
