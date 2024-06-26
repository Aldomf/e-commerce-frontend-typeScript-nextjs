"use client";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "@/components/layouts/MobileHeader";
import LaptopHeader from "@/components/layouts/LaptopHeader";
import Footer from "@/components/layouts/Footer";
import ProductCard from "@/components/homapage/ProductCard";
import CartListSideBar from "@/components/homapage/CartListSideBar";
import { PiHeartStraightBreakThin } from "react-icons/pi";
import { useAddProduct } from "@/context/AddProductContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function Wishlist() {
  const { userWishlist, getUserWishlist } = useWishlist();
  const { token, user } = useAuth();

  const { toggleSidebar, isSidebarOpen } = useAddProduct();
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    // Fetch user's wishlist only if the user object is available
    if (user?.id) {
      getUserWishlist();
    }
  }, [user]);
  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[214px] lg:mt-[228px] xl:mt-[244px] flex flex-col items-center px-6 pb-6 ssm:px-10 ssll:px-0">
        <h2 className="text-3xl font-bold my-6 lg:text-5xl">
          My Wishlist {token ? `(${userWishlist?.length})` : ""}
        </h2>

        {token ? (
          // Render product cart if token exists
          <div className="pb-12 px-6 mm:px-12">
            {userWishlist && userWishlist.length > 0 ? (
              <div className="ssll:grid ssll:grid-cols-2 ssll:gap-8 lg:gap-3 xl:gap-10 lg:grid-cols-3 xl:grid-cols-4">
                <ProductCard products={userWishlist} />
              </div>
            ) : (
              <div className="text-2xl flex flex-col justify-center items-center">
                Wishlist empty
                <PiHeartStraightBreakThin className="text-9xl" />
              </div>
            )}
          </div>
        ) : (
          // Render message and login/signup button if token doesn't exist
          <div className="px-6 flex flex-col items-center justify-center h-full">
            <div>
              <PiHeartStraightBreakThin className="text-9xl" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-bold text-center">
                Your wishlist is empty
              </p>
              <p className=" font-semibold mb-4 text-center">
                Sign in to personalize your shopping experience with your
                Wishlist.
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
      </div>
      <Footer />
      <CartListSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Wishlist;
