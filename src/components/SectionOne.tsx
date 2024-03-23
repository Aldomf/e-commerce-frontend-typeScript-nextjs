import React from "react";
import Link from "next/link";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";

function SectionOne() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center md:py-10">
      <div className="flex items-center py-3 pl-4 border-y border-black md:border-r md:border-y-0 md:h-20 lg:pr-8 xl:h-fit xl:pr-12">
        <div className="mr-4">
          <LocalShippingOutlinedIcon className="w-12 h-12 xl:w-14 xl:h-14 text-[#a3c9bc]" />
        </div>
        <div>
          <p className="font-bold text-lg xl:text-2xl">Free Delivery</p>
          <p className="font-light">To Your Door</p>
        </div>
      </div>
      <div className="flex items-center py-3 pl-4 border-b border-black md:border-r md:border-y-0 md:h-20 lg:pr-8 xl:h-fit xl:px-12">
        <div className="mr-4">
          <InventoryOutlinedIcon className="w-12 h-12 xl:w-14 xl:h-14 text-[#a3c9bc]" />
        </div>
        <div>
          <p className="font-bold text-lg xl:text-2xl">Local Pickup</p>
          <p className="font-light">
            Ckeck Out{" "}
            <Link
              href=""
              className="border-b border-black border-solid border-b-0.5"
            >
              Locations
            </Link>
          </p>
        </div>
      </div>
      <div className="flex items-center py-3 pl-4 border-b border-black md:border-r md:border-y-0 md:h-20 lg:pr-8 xl:h-fit xl:px-12">
        <div className="mr-4">
          <SupportAgentOutlinedIcon className="w-12 h-12 xl:w-14 xl:h-14 text-[#a3c9bc]" />
        </div>
        <div>
          <p className="font-bold text-lg xl:text-2xl">Available for You</p>
          <p className="font-light">
            {" "}
            <Link
              href=""
              className="border-b border-black border-solid border-b-0.5"
            >
              Online Support
            </Link>{" "}
            24/7
          </p>
        </div>
      </div>
      <div className="flex items-center py-3 pl-4 border-b border-black md:border-y-0 md:h-20 xl:h-fit xl:pl-12">
        <div className="mr-4">
          <PhoneAndroidOutlinedIcon className="w-12 h-12 xl:w-14 xl:h-14 text-[#a3c9bc]" />
        </div>
        <div>
          <p className="font-bold text-lg xl:text-2xl">Order on the Go</p>
          <p className="font-light">
            Download Our{" "}
            <Link
              href=""
              className="border-b border-black border-solid border-b-0.5"
            >
              App
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SectionOne;
