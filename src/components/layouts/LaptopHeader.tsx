import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchForm from "@/components/homapage/SearchForm";
import Link from "next/link";
import AboveHeaderLaptop from "@/components/homapage/AboveHeaderLaptop";
import SubHeaderLaptop from "@/components/homapage/SubHeaderLaptop";
import { FaLocationDot } from "react-icons/fa6";
import CartListSideBar from "../homapage/CartListSideBar";
import { useAddProduct } from "@/context/AddProductContext";

function LaptopHeader() {
  const { updatedCartList } = useAddProduct();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 400 && currentScrollY > prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        !sidebarRef.current?.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-10 transition-opacity duration-500 ${
          isScrolled
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <AboveHeaderLaptop />
        <div className="flex justify-between items-center w-full bg-[#a3c9bc] py-6 px-4 lg:px-10 xl:px-16">
          <Link href="/" className="flex justify-center items-center">
            <h1 className="mr-1 roboto font-semibold text-xl lg:text-2xl xl:text-3xl text-[#363f46]">
              ShipShop
            </h1>
            <Image
              src="/extra-logo.svg"
              alt="Logo"
              className="lg:w-16 lg:h-16 xl:w-20 xl:h-20"
              width={50}
              height={50}
              priority
            />
          </Link>
          <div className="flex justify-center items-center w-80 lg:w-[500px] xl:w-[520px]">
            <div className="w-full">
              <SearchForm />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/customer-support#locations" className="mr-4 lg:mr-6 xl:mr-8">
              <FaLocationDot className="text-white w-7 h-7 hover:text-[#363F46] transition duration-500 ease-in-out" />
            </Link>
            <Link href="/wishlist" className=" mr-4 lg:mr-6 xl:mr-8">
              <FavoriteIcon className="text-white w-7 h-7 hover:text-[#363F46] transition duration-500 ease-in-out" />
            </Link>
            <button
              ref={buttonRef}
              className="flex justify-center items-center"
              onClick={toggleSidebar}
            >
              <ShoppingCartOutlinedIcon className="text-white w-7 h-7 hover:text-[#363F46] transition duration-500 ease-in-out" />
              <span className="w-4 h-4 bg-white text-[#a3c9bc] flex items-center justify-center rounded-full p-3">
                {updatedCartList.length}
              </span>
            </button>
          </div>
        </div>
        <SubHeaderLaptop />
      </div>
      <CartListSideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        ref={sidebarRef}
      />
    </>
  );
}

export default LaptopHeader;
