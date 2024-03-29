import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import { Product } from '@/interfaces/interfaces';

interface ProductCardProps {
  products: Product[]; // Specify that the products prop is an array of Product
  label?: string;
}

function ProductCard({ products, label }: ProductCardProps) {
  // Check if products are available
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="border-2 pb-2 mb-8 md:mb-0">
          <div className="relative">
          {label && (
              <p className="bg-red-600 px-4 h-8 rounded-full text-white w-fit flex justify-center items-center absolute top-2 left-2">
                {label}
              </p>
            )}
            <Image
              src={product.imageUrl} // Use product image URL
              width={1000}
              height={500}
              alt={product.name} // Use product name as alt text
            />
          </div>
          <div className="px-2">
            <div>
              <h3 className="text-[#a3c9bc] font-semibold text-xl my-2">
                {product.name} {/* Render product name */}
              </h3>
              <p className="leading-none mb-2">
                {product.description.length > 80
                  ? product.description.substring(0, 80) + "..."
                  : product.description}
              </p>

              {/* Render product description */}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div>
                  {product.discountActive && (
                    <p className="line-through">${product.price}</p>
                  )}
                  {/* Render product price */}
                  <p className="text-xl font-semibold text-green-500">
                    ${product.priceWithDiscount}
                  </p>{" "}
                  {/* Render product discounted price */}
                </div>
                {product.discountActive && (
                  <div className="ml-2 text-green-500 border border-green-500 px-1">
                    {product.discountPercentage}%{" "}
                    {/* Render product discount percentage */}
                  </div>
                )}
              </div>
              <button className="w-10 h-10 rounded-full border-2 border-black flex justify-center items-center hover:bg-[#a3c9bc] transition duration-300 ease-in-out">
                <AddShoppingCartIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
