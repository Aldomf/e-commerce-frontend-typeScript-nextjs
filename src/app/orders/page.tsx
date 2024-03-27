"use client"
import React from 'react'
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import OrderCard from '@/components/orders/OrderCard';

function Orders() {
    const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <>
    {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] flex flex-col items-center md:items-stretch px-6 pb-6 ssm:px-10 md:px-20 border">
        <h2 className='text-3xl font-bold my-6 lg:text-5xl text-center'>My Orders</h2>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-1 lg:gap-3 xl:gap-10 lg:grid-cols-2">
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Orders