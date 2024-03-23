import Image from "next/image";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";

function ProductCard() {
  return (
    <div className="border-2 pb-2 mb-8 md:mb-0">
      <div className="relative">
        <p className="bg-[#a3c9bc] px-4 h-8 rounded-full text-white w-fit flex justify-center items-center absolute top-2 left-2">
          Best Deal
        </p>
        <Image
          src="/shoes-nike-1.jpg"
          width={1000}
          height={500}
          alt="Picture of the product"
        />
      </div>
      <div className="px-2">
        <div>
          <h3 className="text-[#a3c9bc] font-semibold text-xl my-2">
            Shoes Nikes Red
          </h3>
          <p className="leading-none mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid
            placeat, ab suscipit esse ipsum!
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <p className="line-through">$999,99</p>
              <p className="text-xl font-semibold text-green-500">$599,99</p>
            </div>
            <div className="ml-2 text-green-500 border border-green-500 px-1">
              -50%
            </div>
          </div>
          <button
            className="w-10 h-10 rounded-full border-2 border-black flex justify-center items-center hover:bg-[#a3c9bc] transition duration-300 ease-in-out"
          >
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
