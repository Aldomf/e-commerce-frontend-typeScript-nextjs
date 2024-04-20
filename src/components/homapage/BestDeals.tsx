import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";

function BestDeals() {
  const { products } = useProduct();
  console.log(products);

  // Filter out products with hot property set to true
  const onSaleProducts = products.filter((product) => product.sale);
  console.log(onSaleProducts);

  // Slice the hotProducts array to render only the first 5 products
  const limitedonSaleProducts = onSaleProducts.slice(0, 5);
  console.log(limitedonSaleProducts);

  return (
    <div className="flex flex-col items-center my-6 mb-12 px-8 ml:px-12 ssm:px-28 ssl:px-0 md:px-4 sm:px-16 lg:mb-16">
      <h2 className="font-bold text-3xl mb-6 lg:text-5xl">Best Deals</h2>
      <div className="ssl:grid ssl:grid-cols-2 ssll:gap-4 md:grid-cols-3 md:gap-2 lg:gap-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
        <ProductCard products={limitedonSaleProducts} label="Best deals" />
      </div>
      <Link
        href="/subcategory/sale"
        className="bg-[#A3C9BC] text-white px-10 py-2 mt-6 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 border-white hover:bg-white"
      >
        Shop Best Deals
      </Link>
    </div>
  );
}

export default BestDeals;
