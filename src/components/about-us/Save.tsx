import Link from "next/link";
import React from "react";

function Save() {
  return (
    <div className="bg-[#FEEED4] my-10 p-8 md:p-16 lg:py-28 lg:mx-20 xl:mx-36 flex justify-center items-center">
      <div>
        <h2 className="font-bold text-4xl mb-2 lg:mb-6
        lg:text-7xl">Save every day!</h2>
        <p className="font-bold mb-4 lg:text-3xl lg:mb-8">
          Help lower the cost of your shopping cart with our daily specials
        </p>
        <Link
          href="subcategory/sale"
          className="bg-[#A3C9BC] text-white px-8 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:bg-white font-semibold"
        >
          Shop Deals
        </Link>
      </div>
    </div>
  );
}

export default Save;
