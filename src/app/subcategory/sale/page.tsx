"use client";
import LaptopSidebar from "@/components/category/LaptopSideBar";
import MobileSidebar from "@/components/category/MobileSideBar";
import ProductCard from "@/components/homapage/ProductCard";
import React from "react";
import { useProduct } from "@/context/ProductContext";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import { useAddProduct } from "@/context/AddProductContext";
import CartListSideBar from "@/components/homapage/CartListSideBar";

function Sale() {
  const { toggleSidebar, isSidebarOpen } = useAddProduct();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const { filteredProducts } = useProduct();

  const saleProducts = filteredProducts.filter((product) => product.sale);

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
        <div className="pb-12 px-6 mm:px-12">
          <h2 className="font-bold text-3xl mb-4 mt-6 md:text-5xl lg:text-6xl xl:text-7xl lg:py-10 text-center md:mb-10">
            Best Deals
          </h2>
          <div className="">{isTabletOrMobile ? <MobileSidebar /> : ""}</div>
          <div className="lg:flex">
            {!isTabletOrMobile ? (
              <div className="w-[20%] lg:pr-4 xl:pl-14">
                <LaptopSidebar />
              </div>
            ) : (
              ""
            )}
            <div className="lg:w-[80%]">
            <div
                className={
                  saleProducts && saleProducts.length > 0
                    ? "ssll:grid ssll:grid-cols-2 ssll:gap-2 lg:gap-3 xl:gap-10 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex justify-center items-center"
                }
              >
                {saleProducts && saleProducts.length > 0 ? (
                  <ProductCard products={saleProducts} label="On Sale"/>
                ) : (
                  <p className="text-4xl font-semibold">There are no products in this price range</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CartListSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Sale;
