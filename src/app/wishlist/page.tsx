"use client"
import React from 'react'
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import ProductCard from '@/components/homapage/ProductCard';

function Wishlist() {
    const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <>
    {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] flex flex-col items-center px-6 pb-6 ssm:px-10">
        <h2 className='text-3xl font-bold my-6'>My Wishlist</h2>
        <div className="ssm:grid ssm:grid-cols-2 ssm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-3 xl:gap-10 lg:grid-cols-4 xl:grid-cols-5">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Wishlist