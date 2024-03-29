"use client";
import LaptopSidebar from "@/components/category/LaptopSideBar";
import MobileSidebar from "@/components/category/MobileSideBar";
import ProductCard from "@/components/homapage/ProductCard";
import React from "react";
import { useProduct } from "@/context/productContext"; 
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";

function Sale() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const { products } = useProduct();

  const saleProducts = products.filter((product) => product.sale);

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
        <div className="pb-12">
          <h2 className="font-bold text-3xl mb-4 mt-6 md:text-5xl lg:text-6xl xl:text-7xl lg:py-10 text-center md:mb-10">
            Best Deals
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
                <ProductCard products={saleProducts} label="On Sale"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Sale;
