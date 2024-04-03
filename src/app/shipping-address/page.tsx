"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import ShippingAddressForm from "@/components/cartlist/ShippingAddressForm";

function ShippingAddress() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px]">
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="pt-16 pb-8 flex flex-col px-4 md:px-20 lg:px-32 xl:px-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Shipping Address</h2>
        <ShippingAddressForm />
      </div>
      <Footer />
    </div>
  );
}

export default ShippingAddress;
