import Link from "next/link";
import React from "react";

function OrderCard() {
  return (
    <div className="bg-[#F8F8F8] p-4 w-full flex flex-col rounded-md mb-8 sm:mb-0">
      <div className="flex flex-col">
        <p className="mb-2">
          Status: <span className="font-semibold">Pending</span>
        </p>
        <p className="mb-2">
          Order Number: <span>T789654236</span>
        </p>
        <p className="mb-2">
          Order Date: <span>November 27, 2023</span>
        </p>
        <div className="mb-6 flex justify-between">
          <p className="">
            Articles: <span>6</span>
          </p>
          <p className="font-bold">
            Total: <span>$11.30</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
        <div className="w-20 h-20 border-2 border-black mb-2 mr-2"></div>
        <div className="w-20 h-20 border-2 border-black mb-2 mr-2"></div>
        <div className="w-20 h-20 border-2 border-black mb-2 mr-2"></div>
      </div>
      <div className="flex">
        <Link
          href="/order-detail/1"
          className="w-1/2 py-4 font-bold mr-2 bg-[#6CA08E] hover:bg-[#A3C9BC] text-white flex justify-center items-center rounded-md"
        >
          Order Details
        </Link>
        <button className="w-1/2 py-4 font-bold bg-[#363F46] hover:bg-[#4B565E] text-white flex justify-center items-center rounded-md">
          Recieved
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
