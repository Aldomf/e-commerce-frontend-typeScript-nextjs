import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";

function StartYourCart() {
  const { products } = useProduct();

  // Slice the hotProducts array to render only the first 5 products
  const limitedProducts = products.slice(15, 20);
  return (
    <div className="flex flex-col items-center my-6 mb-12 px-8 sm:px-16">
      <h2 className="font-bold text-3xl mb-6 lg:text-5xl">Start Your Cart</h2>
      <div className="ssm:grid ssm:grid-cols-2 ssm:gap-4 md:grid-cols-3 md:gap-2 lg:gap-10 lg:grid-cols-4 xl:grid-cols-5">
        <ProductCard products={limitedProducts} label=""/>
      </div>
      <Link href="/category/all" className="bg-[#A3C9BC] text-white px-10 py-2 mt-6 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 border-white hover:bg-white">
        Shop More Products
      </Link>
    </div>
  )
}

export default StartYourCart