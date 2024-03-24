"use client"
import MobileSidebar from "@/components/category/MobileSideBar";
import ProductCard from "@/components/homapage/ProductCard";
import React from "react";
import { useMediaQuery } from "react-responsive";

function Category() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
      <div className="border-2 border-red-600 pb-12">
        <h2 className="font-bold text-3xl mb-4 mt-6 md:text-5xl lg:text-6xl xl:text-7xl text-center md:mb-10 lg:my-20">Category</h2>
        {isTabletOrMobile ? <MobileSidebar /> : ''}
        <div className="px-6 sm:grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-10 lg:grid-cols-4 xl:grid-cols-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

export default Category;
