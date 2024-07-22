import React from "react";
import Image from "next/image";
import { useAddProduct } from "@/context/AddProductContext";
import Link from "next/link";

function ProductCart() {
  const {
    updatedCartList,
    handleDeleteFromCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    productQuantities,
    updateQuantity,
  } = useAddProduct();

  return (
    <div className="flex flex-col justify-between">
      {updatedCartList.length > 0 ? (
        updatedCartList.map((product) => (
          <div
            key={product.id}
            className="flex flex-col h-40 py-6 border-b border-black"
          >
            <div className="flex h-full justify-between">
              <div className="flex">
                <Link
                  href={`/product/${product.id}`}
                  className="h-full w-28 border mr-4"
                >
                  <Image
                    src={
                      product.imageUrls.length > 0
                        ? product.imageUrls[0]
                        : "/path/to/default-image.jpg"
                    } // Use the first image or a default image
                    width={1000}
                    height={500}
                    alt={product.name} // Use product name as alt text
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-col justify-between">
                  <h3 className="md:mb-2">{product.name}</h3>
                  <div className="flex items-center">
                    {product.discountActive ? (
                      <>
                        <p className="line-through text-sm text-[#ADB5BD] pr-1 mm:pr-2">{`$${product.price}`}</p>
                        <p>{`$${product.priceWithDiscount}`}</p>
                      </>
                    ) : (
                      <p>{`$${product.price}`}</p>
                    )}
                  </div>

                  <div className="flex items-center mt-2 border w-fit p-1">
                    <button
                      className="mr-2"
                      onClick={() => {
                        if ((productQuantities[product.id] || 0) > 1) {
                          // Check if counter is greater than 1
                          handleDecreaseQuantity(product.id);
                          updateQuantity(
                            product.id,
                            (productQuantities[product.id] || 0) - 1
                          );
                        }
                      }}
                      disabled={(productQuantities[product.id] || 0) <= 1} // Disable the button if counter is 1 or less
                    >
                      <svg
                        className="w-4 h-4 flex justify-center items-center"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 11H4v2h16z" />
                      </svg>
                    </button>
                    <p>{productQuantities[product.id] || 0}</p>
                    <button
                      className="ml-2"
                      onClick={() => {
                        handleIncreaseQuantity(product.id);
                        updateQuantity(
                          product.id,
                          (productQuantities[product.id] || 0) + 1
                        );
                      }}
                    >
                      <svg
                        className="w-4 h-4 flex justify-center items-center"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end md:flex-row-reverse md:items-start">
                <button
                  className="ml-4"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <p>{`$${(
                  parseFloat(product.priceWithDiscount) *
                  (productQuantities[product.id] || 0)
                ).toFixed(2)}`}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-2xl">No products in the cart</p>
      )}
    </div>
  );
}

export default ProductCart;
