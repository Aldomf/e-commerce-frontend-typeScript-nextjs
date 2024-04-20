import React from "react";
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
  // Check if products are available
  if (!products || products.length === 0) {
    return <div className="text-2xl flex justify-center">Wishlist empty</div>;
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
            <div className="relative h-72">
              {label && (
                <p className="bg-red-600 px-4 h-8 rounded-full text-white w-fit flex justify-center items-center absolute top-2 left-2">
                  {label}
                </p>
              )}
              <Image
                src={product.imageUrl} // Use product image URL
                width={1000}
                height={500}
                alt={product.name}
                className="h-full"
              />
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
                      <p className="line-through text-sm text-[#ADB5BD]">${product.price}</p>
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
                  <AddShoppingCartIcon className="w-5 h-5"/>
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
