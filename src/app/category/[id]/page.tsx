"use client";
import LaptopSidebar from "@/components/category/LaptopSideBar";
import MobileSidebar from "@/components/category/MobileSideBar";
import ProductCard from "@/components/homapage/ProductCard";
import React from "react";
import { useParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext"; 
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import { useAddProduct } from "@/context/AddProductContext";
import CartListSideBar from "@/components/homapage/CartListSideBar";

function Category() {
  const { toggleSidebar, isSidebarOpen } = useAddProduct();
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const categoryIdNumber = parseInt(categoryId, 10);
  console.log(categoryId)

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const { products, categories } = useProduct();

  const category = categories.find(cat => cat.id === categoryIdNumber);

  const categoryName = category ? category.name : 'Category';

  const productsCategory = products.filter((product) => product.category.id === categoryIdNumber);

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
        <div className="pb-12">
          <h2 className="font-bold text-3xl mb-4 mt-6 md:text-5xl lg:text-6xl xl:text-7xl lg:py-10 text-center md:mb-10">
            {categoryName}
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
                <ProductCard products={productsCategory}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CartListSideBar isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}/>
    </>
  );
}

export default Category;
