"use client";
import ProductCart from "@/components/productCart/ProductCart";
import ShippingAddressForm from "@/components/cartlist/ShippingAddressForm";
import { LiaTagSolid } from "react-icons/lia";
import { PiNotepadLight } from "react-icons/pi";
import { IoLockClosed } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsCartX } from "react-icons/bs";
import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import { useAddProduct } from "@/context/AddProductContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useCheckoutAndOrder } from "@/context/CheckoutAndOrderContext";
import { useShippingAddress } from "@/context/ShippingAddresContext";

function CartList() {
  const { sumOfPrices } = useAddProduct();
  const { token } = useAuth();
  const {
    addShippingAddress,
    getShippingAddress,
    updateShippingAddress,
    shippingAddress,
    setShippingAddress,
    shippingAddressError,
    isDropdownOpen3,
    setIsDropdownOpen3,
    addressRequired,
    setAddressRequired,
  } = useShippingAddress();
  const { createCheckoutSession } = useCheckoutAndOrder();
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  //const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const shippingAddressFormRef = useRef<HTMLDivElement>(null);
  //const [addressRequired, setAddressRequired] = useState(false);

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

  const handleCheckout = () => {
    if (!shippingAddress) {
      setAddressRequired(true);
      scrollToShippingAddressForm();

      setTimeout(() => {
        setIsDropdownOpen3(true);
      }, 1000);
    } else {
      createCheckoutSession(); // Proceed with the checkout
    }
  };

  const scrollToShippingAddressForm = () => {
    // Scroll to the shipping address form section
    const shippingAddressForm = document.getElementById(
      "shipping-address-form"
    );
    shippingAddressForm?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] py-4 flex flex-col px-2 mm:px-4 md:flex-row md:justify-center lg:px-20 xl:px-64">
        <div className="md:mr-12 md:w-[70%]">
          <h2 className="font-bold text-2xl text-center border-b border-black py-4">
            My cart
          </h2>
          {token ? (
            // Render product cart if token exists
            <div className="px-2 mm:px-6">
              <ProductCart />
            </div>
          ) : (
            // Render message and login/signup button if token doesn't exist
            <div className="px-6 flex flex-col items-center">
              <div>
                <BsCartX className="text-9xl" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-2xl font-bold">Your cart is empty</p>
                <p className=" font-semibold mb-4 text-center">
                  Sign in to view your cart and start shopping
                </p>
              </div>
              <div className="w-48 space-y-2 flex flex-col">
                <Link
                  href="/login"
                  className="bg-[#6CA08E] text-white text-center font-semibold py-2 w-full text-base transition duration-500 ease-in-out hover:bg-[#A3C9BC]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-[#363F46] text-white text-center font-semibold py-2 text-base transition duration-500 ease-in-out hover:bg-[#53606A] hover:border-[#A3C9BC]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
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
              <p
                className="text-xl cursor-pointer"
                onClick={toggleDropdown3}
                id="shipping-address-form"
              >
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
              <p>${sumOfPrices}</p>
            </div>
          </div>
          <div className="flex flex-col py-4 ">
            <div className="flex justify-between text-2xl mb-4">
              <p>Total</p>
              <p>${sumOfPrices}</p>
            </div>
            <div className="flex flex-col items-center">
              {addressRequired && (
                <div className="text-red-500 font-semibold mb-4 text-center">
                  Please provide a shipping address to proceed with the payment.
                </div>
              )}
              <button
                className="text-white font-semibold text-lg flex items-center justify-center bg-[#6CA08E] w-full py-2 rounded-full transition duration-500 ease-in-out hover:bg-[#A3C9BC]"
                onClick={handleCheckout}
              >
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
