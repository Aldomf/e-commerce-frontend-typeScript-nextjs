"use client";
import ProductCart from "@/components/productCart/ProductCart";
import ShippingAddressForm from "@/components/cartlist/ShippingAddressForm";
import { LiaTagSolid } from "react-icons/lia";
import { PiNotepadLight } from "react-icons/pi";
import { IoLockClosed } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";

function CartList() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stop event propagation
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stop event propagation
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stop event propagation
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] py-4 flex flex-col px-4 md:flex-row md:justify-center lg:px-20 xl:px-64">
        <div className="md:mr-12 md:w-[70%]">
          <h2 className="font-bold text-2xl border-b border-black py-4">
            My cart
          </h2>
          <div>
            <ProductCart />
            <ProductCart />
          </div>
          <div className="flex flex-col text-[#EC1C1C] font-light border-b border-black py-4 md:border-none">
            <div className="flex items-center">
              <LiaTagSolid className="mr-2 text-2xl" />
              <p className="text-xl cursor-pointer" onClick={toggleDropdown}>
                Enter a promo code
              </p>
            </div>
            <div
              className={`transition-all duration-300 ease-linear ${
                isDropdownOpen ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Enter a promo code"
                className="py-2 px-2 border-black border"
              />
              <button className="py-2 px-7 border-[#EC1C1C] border font-normal">
                Apply
              </button>
            </div>
          </div>
          <div className="flex flex-col text-[#EC1C1C] font-light border-b border-black py-4 md:border-none">
            <div className="flex items-center">
              <PiNotepadLight className="mr-2 text-2xl" />
              <p className="text-xl cursor-pointer" onClick={toggleDropdown2}>
                Add a note
              </p>
            </div>
            <div
              className={`transition-all duration-300 ease-linear ${
                isDropdownOpen2 ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
              }`}
            >
              <textarea
                cols={30}
                rows={3}
                placeholder="Instructions? Special request? Add them here."
                className="py-2 px-2 border-black border w-full"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col border-b border-black py-4 md:border-none">
            <div className="flex items-center text-[#EC1C1C] font-light">
              <LiaShippingFastSolid className="mr-2 text-2xl" />
              <p className="text-xl cursor-pointer" onClick={toggleDropdown3}>
                Shipping Address
              </p>
            </div>
            <div
              className={`transition-all duration-300 ease-linear ${
                isDropdownOpen3
                  ? "max-h-[1000px] mt-4"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              <ShippingAddressForm />
            </div>
          </div>
        </div>
        <div className="md:w-[30%]">
          <h2 className="font-bold text-2xl border-b border-black py-4">
            Order summary
          </h2>
          <div className="flex flex-col border-b border-black py-4 ">
            <div className="flex justify-between text-xl mb-4">
              <p>Subtotal</p>
              <p>$5.99</p>
            </div>
          </div>
          <div className="flex flex-col py-4 ">
            <div className="flex justify-between text-2xl mb-4">
              <p>Total</p>
              <p>$5.99</p>
            </div>
            <div className="flex flex-col items-center">
              <button className="text-white font-semibold text-lg flex items-center justify-center bg-[#a3c9bc] w-full py-2 rounded-full">
                Checkout
              </button>
              <div className="flex items-center justify-center mt-4 mb-6">
                <IoLockClosed className="mr-2 justify-center items-center" />
                <p>Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartList;
