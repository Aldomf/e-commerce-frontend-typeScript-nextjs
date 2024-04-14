"use client";
import dynamic from "next/dynamic";
import React from "react";
import Footer from "@/components/layouts/Footer";
import { useMediaQuery } from "react-responsive";

const LaptopHeader = dynamic(
  () => import("../../components/layouts/LaptopHeader")
);
const MobileHeader = dynamic(
  () => import("../../components/layouts/MobileHeader")
);

function ShippingReturns() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[230px] lg:mt-[240px] xl:mt-[260px] flex flex-col">
        <h1 className="font-bold mt-8 md:mt-0 text-4xl lg:text-7xl mb-10 text-center">
          Shipping & Returns
        </h1>
        <div className="mb-6 lg:mx-20 xl:mx-36 lg:mb-28">
          <div className="grid grid-cols-1 md:flex justify-center border">
            <div className="flex flex-col justify-start font-thin border-black px-4 border-y-2 space-y-2 py-4 md:border md:px-20 lg:py-14 w-[100%]">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Shipping Policy
              </h3>
              <p>
                I’m a Shipping Policy section. I’m a great place to update your
                customers about your shipping methods, packaging and costs. Use
                plain, straightforward language to build trust and make sure
                that your customers stay loyal!
              </p>
              <p>
                I&apos;m the second paragraph in your Shipping Policy section.
                Click here to add your own text and edit me. It’s easy. Just
                click “Edit Text” or double click me to add details about your
                policy and make changes to the font. I’m a great place for you
                to tell a story and let your users know a little more about you.
              </p>
            </div>
            <div className="flex flex-col justify-start font-thin border-black px-4 border-b-2 space-y-2 py-4 md:border md:px-20 lg:py-14 w-[100%]">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Return & Exchange Policy
              </h3>
              <p>
                I’m a return policy section. I’m a great place to let your
                customers know what to do in case they’ve changed their mind
                about their purchase, or if they’re dissatisfied with a product.
                Having a straightforward refund or exchange policy is a great
                way to build trust and reassure your customers that they can buy
                with confidence.
              </p>
              <p>
                I&apos;m the second paragraph in your Return & Exchange policy.
                Click here to add your own text and edit me. It’s easy. Just
                click “Edit Text” or double click me to add details about your
                policy and make changes to the font. I’m a great place for you
                to tell a story and let your users know a little more about you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShippingReturns;
