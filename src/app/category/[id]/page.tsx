import ProductCard from "@/components/homapage/ProductCard";
import React from "react";

function page() {
  return (
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
      <div className="border-2 border-red-600 ">
        <h2 className="font-bold text-3xl mb-6 lg:text-5xl text-center">Category</h2>
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

export default page;
