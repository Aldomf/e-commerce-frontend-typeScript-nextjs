import Image from "next/image";
import React from "react";
import HambuerguerIcon from "@/components/homapage/HambuergerIcon";
import SearchForm from "@/components/homapage/SearchForm";
import AboveHeaderMobile from "@/components/homapage/AboveHeaderMobile";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useAddProduct } from "@/context/AddProductContext";

function MobileHeader() {
  const { toggleSidebar, updatedCartList } = useAddProduct();
  return (
    <>
      <AboveHeaderMobile />
      <div className="bg-[#a3c9bc] flex-col pt-4 pb-2">
        <div className="flex justify-between px-4 md:px-10">
          <Link href="/" className="flex justify-center items-center">
            <h1 className="mr-1 roboto font-semibold text-xl text-[#363f46]">
              ShipShop
            </h1>
            <Image
              src="/extra-logo.svg"
              alt="Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
            />
          </Link>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <Link
                href="/cartlist"
                className="flex justify-center items-center"
              >
                <ShoppingCartOutlinedIcon className="text-white w-7 h-7" />
                <div className="w-4 h-4 bg-white text-[#a3c9bc] flex items-center justify-center rounded-full p-3">
                  {updatedCartList.length}
                </div>
              </Link>
            </div>
            <div className="ml-8">
              <HambuerguerIcon />
            </div>
          </div>
        </div>
        <div className="px-4 pt-6">
          <SearchForm />
        </div>
      </div>
    </>
  );
}

export default MobileHeader;
