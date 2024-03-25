"use client";
import LaptopSidebar from "@/components/category/LaptopSideBar";
import MobileSidebar from "@/components/category/MobileSideBar";
import ProductCard from "@/components/homapage/ProductCard";
import React from "react";
import { useMediaQuery } from "react-responsive";

function Category() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });
  return (
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
      <div className="pb-12">
        <h2 className="font-bold text-3xl mb-4 mt-6 md:text-5xl lg:text-6xl xl:text-7xl lg:py-10 text-center md:mb-10">
          Category
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
            <div className="px-6 sm:grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-3 xl:gap-10 lg:grid-cols-4 xl:grid-cols-5">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
