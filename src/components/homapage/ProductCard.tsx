import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import { Product } from "@/interfaces/interfaces";
import { useAddProduct } from "@/context/AddProductContext";
import Link from "next/link";

interface ProductCardProps {
  products: Product[] | null; // Specify that the products prop is an array of Product
  label?: string;
}

function ProductCard({ products, label }: ProductCardProps) {
  const { handleAddToCart } = useAddProduct();

  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(
    null
  );

  const handleMouseEnter = (roomIndex: number, imageIndex: number) => {
    setHoveredProductIndex(roomIndex);
    setHoveredImageIndex(imageIndex);
  };

  const handleMouseLeave = () => {
    setHoveredProductIndex(null);
    setHoveredImageIndex(null);
  };

  // Check if products are available
  if (!products || products.length === 0) {
    return (
      <>
        <div className="text-2xl flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-2"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          Loading products
        </div>
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Please note that the backend may take up to a minute to respond due
            to the use of a free domain. We appreciate your patience during this
            time. Thank you!
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="ssm:border-2 w-60"
        >
          <div className="mb-8 border-2 ssm:border-0 ssm:mb-0">
            <div
              className="relative h-80"
              onMouseEnter={() => handleMouseEnter(product.id, 0)}
              onMouseLeave={handleMouseLeave}
            >
              {label && (
                <p className="bg-red-600 px-4 h-8 rounded-full text-white w-fit flex justify-center items-center absolute top-2 left-2 z-10">
                  {label}
                </p>
              )}
              {product.imageUrls && product.imageUrls.length > 0 && (
                <Image
                  src={
                    product.imageUrls[
                      hoveredProductIndex === product.id &&
                      hoveredImageIndex !== null
                        ? (hoveredImageIndex + 1) % product.imageUrls.length
                        : 0
                    ]
                  } // Use the first image URL from the imageUrls array
                  width={1000}
                  height={500}
                  alt={product.name} // Use product name as alt text
                  className="h-full"
                />
              )}
            </div>
            <div className="px-2 h-fit">
              <div>
                <h3 className="text-[#a3c9bc] font-semibold text-xl my-2">
                  {product && product.name && (
                    <p className="leading-none mb-2">
                      {product.name.length > 23
                        ? product.name.substring(0, 23) + "..."
                        : product.name}
                    </p>
                  )}
                </h3>
                {/* {product && product.description && (
                  <p className="leading-none mb-2">
                    {product.description.length > 80
                      ? product.description.substring(0, 80) + "..."
                      : product.description}
                  </p>
                )} */}

                {/* Render product description */}
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="text-lg mr-1 font-semibold text-green-500">
                    ${product.priceWithDiscount}
                  </p>{" "}
                  {product.discountActive && (
                    <p className="line-through text-sm text-[#ADB5BD]">
                      ${product.price}
                    </p>
                  )}
                  {product.discountActive && (
                    <div className="ml-2 text-sm text-green-500 border border-green-500 px-1">
                      -{product.discountPercentage}%{" "}
                      {/* Render product discount percentage */}
                    </div>
                  )}
                </div>
                <button
                  className="px-2 py-1 rounded-full border-2 border-black flex justify-center items-center hover:bg-[#a3c9bc] transition duration-300 ease-in-out"
                  onClick={(event) => {
                    event.preventDefault(); // Stop propagation of the click event
                    handleAddToCart(product.id);
                  }}
                >
                  <AddShoppingCartIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ProductCard;
