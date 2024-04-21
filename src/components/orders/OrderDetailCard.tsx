import { useAddProduct } from "@/context/AddProductContext";
import { Product } from "@/interfaces/interfaces";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";
import CartListSideBar from "../homapage/CartListSideBar";

function OrderDetailCard({ products = [] }: { products?: Product[] }) {
  const { handleAddToCart, toggleSidebar, isSidebarOpen } = useAddProduct();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  if (!products) {
    return <div>No products available</div>;
  }
  return (
    <div className="px-2 mm:px-4 ml:px-8 md:px-0">
      {products.map((product) => (
        <div key={product.id} className="w-full my-6">
          <div className="flex justify-between h-32">
            <div className="flex w-[80%]">
              <div className="w-[50%] ml:w-[45%] md:w-[25%] lg:w-[20%] xl:w-[15%] h-full mr-2">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between w-[50%] ml:w-[55%] md:w-[75%] lg:w-[80%] xl:w-[85%]">
                <div className="mb-2 w-full">
                  <p className="mb-2">{product.name}</p>
                  <p className="text-sm w-full">
                    {!isMediumScreen && product.description.length > 15
                      ? `${product.description.substring(0, 15)}...`
                      : product.description.length > 15
                      ? `${product.description.substring(0, 80)}`
                      : product.description}
                  </p>
                </div>
                <button
                  className="border-2 flex justify-center items-center font-semibold w-fit px-2 py-1"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Repurchase
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {product.discountActive ? (
                <>
                  <p className="font-semibold text-[#A3C9BC]">
                    ${product.priceWithDiscount}
                  </p>
                  <p className="line-through text-sm text-[#7C7C7C]">
                    ${product.price}
                  </p>
                </>
              ) : (
                <p className="font-semibold text-[#A3C9BC]">${product.price}</p>
              )}
              <p className="text-sm">x1</p>
            </div>
          </div>
        </div>
      ))}
      <CartListSideBar isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}/>
    </div>
  );
}

export default OrderDetailCard;
