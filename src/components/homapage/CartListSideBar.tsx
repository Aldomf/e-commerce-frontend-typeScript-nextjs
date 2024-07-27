"use client";
import React, { forwardRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useAddProduct } from "@/context/AddProductContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { BsCartX } from "react-icons/bs";
import ProductCartSideBar from "../cartlist/ProductCartSideBar";
import { useAuth } from "@/context/AuthContext";

interface CartListSideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const CartListSideBar = forwardRef<HTMLDivElement, CartListSideBarProps>(
  function CartListSideBar({ isOpen, toggleSidebar }, ref) {
    const { updatedCartList, setIsSidebarOpen, sumOfPrices } = useAddProduct();
    const { token } = useAuth();

    const handleCloseSidebar = () => {
      toggleSidebar(); // Close sidebar when arrow right icon is clicked
    };

    return (
      <div
        ref={ref}
        className={`fixed z-50 top-0 right-0 h-screen bg-white md:w-[45%] lg:w-[35%] xl:w-[25%] overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-500`}
        id="sidebar"
      >
        <div className="flex flex-col">
          <div className="sticky top-0 right-0 left-0 z-10 flex flex-col text-white shadow-lg">
            <div className="flex items-center justify-between w-full bg-[#a3c9bc] h-28 xl:h-32 px-4">
              <MdKeyboardArrowRight
                className="text-4xl cursor-pointer"
                onClick={handleCloseSidebar}
              />
              <h2 className="font-semibold text-3xl">Cart</h2>
              <div className="flex justify-center items-center">
                <ShoppingCartOutlinedIcon className="text-white w-7 h-7" />
                <span className="w-4 h-4 bg-white text-[#a3c9bc] flex items-center justify-center rounded-full p-3">
                  {updatedCartList.length}
                </span>
              </div>
            </div>
            <div className="h-6 bg-white"></div>
          </div>
          {token ? (
            // Render product cart if token exists
            <div className="px-6">
              <ProductCartSideBar />
            </div>
          ) : (
            // Render message and login/signup button if token doesn't exist
            <div className="px-6 flex flex-col items-center justify-center h-full">
              <div>
                <BsCartX className="text-9xl"/>
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
          {updatedCartList.length > 0 ? (
            <div className="w-full pt-4 flex flex-col px-6 pb-6 bottom-0 sticky bg-white">
              <div className="text-2xl">
                <p>Subtotal</p>
                <p>${sumOfPrices}</p>
              </div>
              <Link
                href="/cartlist"
                onClick={() => setIsSidebarOpen(false)}
                className="bg-[#A3C9BC] text-white mt-4 text-center font-semibold w-full py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 border-white hover:bg-white"
              >
                View Cart
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);

CartListSideBar.displayName = "CartListSideBar";

export default CartListSideBar;
