import React, { useState, useEffect } from "react";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";
import AboveHeaderLaptop from "@/components/AboveHeaderLaptop";
import SubHeaderLaptop from "@/components/SubHeaderLaptop";

function LaptopHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 700 && currentScrollY > prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-10 transition-opacity duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
        <AboveHeaderLaptop />
        <div className="flex justify-between items-center w-full bg-[#a3c9bc] py-6 px-4 lg:px-10 xl:px-16">
          <Link href="/" className="flex justify-center items-center">
            <h1 className="mr-1 roboto font-semibold text-xl lg:text-2xl xl:text-3xl text-[#363f46]">
              ShipShop
            </h1>
            <Image
              src="/extra-logo.svg"
              alt="Logo"
              className="dark:invert lg:w-16 lg:h-16 xl:w-20 xl:h-20"
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
            <Link href="" className="mr-4 lg:mr-6 xl:mr-8">
              <FavoriteIcon className="text-white w-7 h-7"/>
            </Link>
            <Link href="" className="flex justify-center items-center">
              <AddShoppingCartIcon className="text-white w-7 h-7" />
              <div className="w-4 h-4 bg-white text-[#a3c9bc] flex items-center justify-center rounded-full p-3">
                0
              </div>
            </Link>
          </div>
        </div>
        <SubHeaderLaptop/>
      </div>
    </>
  );
}

export default LaptopHeader;
