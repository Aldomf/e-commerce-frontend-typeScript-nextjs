"use client";
import Footer from "@/components/layouts/Footer";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useAddProduct } from "@/context/AddProductContext";
import { useParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext";
//import CartListSideBar from "@/components/homapage/CartListSideBar";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import Reviews from "@/components/reviews/Reviews";

const LaptopHeader = dynamic(
  () => import("../../../components/layouts/LaptopHeader")
);
const MobileHeader = dynamic(
  () => import("../../../components/layouts/MobileHeader")
);
const CartListSideBar = dynamic(
  () => import("../../../components/homapage/CartListSideBar")
);

function Product() {
  const {
    handleAddToCart,
    toggleSidebar,
    isSidebarOpen,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    updateQuantity,
    productQuantities,
  } = useAddProduct();
  const {
    addProductToWishlist,
    deleteProductFromWishlist,
    checkIsInWishlist,
    getUserWishlist,
  } = useWishlist();
  const { token, user } = useAuth();
  const { productById, fetchProductById } = useProduct();
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const [isInWishlist, setIsInWishlist] = useState(false);

  const [mainImage, setMainImage] = useState(productById?.imageUrls[0] || "");

  // Function to handle adding or deleting a product from the wishlist
  const handleToggleWishlist = () => {
    if (isInWishlist) {
      // If already in wishlist, delete it
      deleteProductFromWishlist(parseInt(productId));
    } else {
      // If not in wishlist, add it
      addProductToWishlist(parseInt(productId));
    }
    // Toggle the state
    setIsInWishlist(!isInWishlist);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  useEffect(() => {
    // Fetch user's wishlist only if the user object is available
    if (user?.id) {
      getUserWishlist();
    }
  }, [user]);

  useEffect(() => {
    fetchProductById(parseInt(productId));
    if (checkIsInWishlist(parseInt(productId))) {
      setIsInWishlist(true);
    }
  }, [productId, checkIsInWishlist]);

  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[230px] lg:mt-[240px] xl:mt-[260px] md:px-10 lg:px-20 xl:px-48 flex flex-col items-center md:items-start">
        <div className="flex flex-col items-center pb-6 ssm:px-10 md:flex-row md:items-start md:space-x-4 lg:space-x-6 xl:space-x-8">
          <div className="flex flex-col mt-10 w-[90%] ml:w-[80%] md:mt-0 lg:flex-row-reverse">
            <div className="w-full h-80 md:h-96 ssm2:h-[500px] xl:h-[500px] lg:ml-4">
              <Image
                src={mainImage}
                alt="Product Image"
                className="w-full h-full"
                width={500}
                height={500}
              />
            </div>
            <div className="flex lg:flex-col lg:space-y-4 space-x-4 lg:space-x-0 md:mb-0 mb-4 mt-4 lg:mt-0">
              {productById?.imageUrls &&
                productById.imageUrls.map((url, index) => (
                  <div key={index} onMouseEnter={() => setMainImage(url)}>
                    <Image
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-20 border rounded cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-75"
                      width={64}
                      height={64}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="w-[80%]">
            <h2 className="font-bold text-2xl">{productById?.name}</h2>
            <div className="flex">
              {productById?.discountActive && (
                <p className="line-through mr-2">{productById?.price}</p>
              )}
              <p className="font-bold text-xl text-[#A3C9BC]">
                {productById?.priceWithDiscount}
              </p>
              {productById?.discountActive && (
                <div className="ml-2 text-green-500 border border-green-500 px-1">
                  -{productById?.discountPercentage}%{" "}
                  {/* Render product discount percentage */}
                </div>
              )}
            </div>
            <div>
              <p className="font-light text-sm mt-2 mb-2">Quantity</p>
              <div className="flex items-center  border w-fit p-1">
                <button
                  className="mr-2"
                  // onClick={() => {
                  //   if ((productQuantities[parseInt(productId)] || 0) > 1) {
                  //     // Check if counter is greater than 1
                  //     updateQuantity(
                  //       parseInt(productId),
                  //       (productQuantities[parseInt(productId)] || 0) - 1
                  //     );
                  //   }
                  // }}
                  disabled={(productQuantities[parseInt(productId)] || 0) <= 1} // Disable the button if counter is 1 or less
                >
                  <svg
                    className="w-4 h-4 flex justify-center items-center"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 11H4v2h16z" />
                  </svg>
                </button>
                <p>{productQuantities[parseInt(productId)] || 0}</p>
                <button
                  className="ml-2"
                  // onClick={() => {
                  //   updateQuantity(
                  //     parseInt(productId),
                  //     (productQuantities[parseInt(productId)] || 0) + 1
                  //   );
                  // }}
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
            <div className="mt-8 flex items-center">
              <button
                className="bg-[#6CA08E] lg:hover:bg-[#A3C9BC] text-lg w-full py-2 text-white font-light rounded-3xl mr-2 transition duration-500 ease-in-out"
                onClick={() => handleAddToCart(parseInt(productId))}
              >
                Add to Cart
              </button>
              <button
                className="border-2 border-[#A3C9BC] p-2 rounded-full text-[#A3C9BC] "
                onClick={handleToggleWishlist}
              >
                {isInWishlist ? (
                  <IoMdHeart className="w-6 h-6 xl:w-7 xl:h-7" /> // Display filled heart icon if in wishlist
                ) : (
                  <IoMdHeartEmpty className="w-6 h-6 xl:w-7 xl:h-7" /> // Display empty heart icon if not in wishlist
                )}
              </button>
            </div>
            <div className="mt-6">
              <p className="font-light">{productById?.description}</p>
              <div className="flex flex-col mt-4 py-5 border-b border-black">
                <div
                  className="text-xl flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <h3 className="font-bold">Product Info</h3>
                  {isDropdownOpen ? (
                    <svg
                      className="w-6 h-6 flex justify-center items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 11H4v2h16z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 flex justify-center items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                  )}
                </div>

                <ul
                  className={`transition-all duration-300 ease-linear ${
                    isDropdownOpen ? "max-h-96 mt-1" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p
                    className={`mb-2 block transition font-light duration-300 ease-in-out`}
                  >
                    I’m a product detail. I’m a great place to add more
                    information about your product such as sizing, material,
                    care and cleaning instructions. This is also a great space
                    to write what makes this product special and how your
                    customers can benefit from this item.
                  </p>
                </ul>
              </div>
              <div className="flex flex-col mt-4 py-5 border-b border-black">
                <div
                  className="text-xl flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdown2}
                >
                  <h3 className="font-bold">Return & Refund Policy</h3>
                  {isDropdownOpen2 ? (
                    <svg
                      className="w-6 h-6 flex justify-center items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 11H4v2h16z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 flex justify-center items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                  )}
                </div>

                <ul
                  className={`transition-all duration-300 ease-linear ${
                    isDropdownOpen2
                      ? "max-h-96 mt-1"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p
                    className={`mb-2 block transition font-light duration-300 ease-in-out`}
                  >
                    I’m a Return and Refund policy. I’m a great place to let
                    your customers know what to do in case they are dissatisfied
                    with their purchase. Having a straightforward refund or
                    exchange policy is a great way to build trust and reassure
                    your customers that they can buy with confidence.
                  </p>
                </ul>
              </div>
              <div className="flex flex-col mt-4 py-5">
                <div
                  className="text-xl flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdown3}
                >
                  <h3 className="font-bold">Shipping Info</h3>
                  {isDropdownOpen3 ? (
                    <svg
                      className="w-6 h-6 flex justify-center items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 11H4v2h16z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 flex justify-center items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 11H13V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                  )}
                </div>

                <ul
                  className={`transition-all duration-300 ease-linear ${
                    isDropdownOpen3
                      ? "max-h-96 mt-1"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p
                    className={`mb-2 block transition font-light duration-300 ease-in-out`}
                  >
                    I’m a shipping policy. I’m a great place to add more
                    information about your shipping methods, packaging and cost.
                    Providing straightforward information about your shipping
                    policy is a great way to build trust and reassure your
                    customers that they can buy from you with confidence.
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Reviews productId={parseInt(productId)} />
      </div>
      <Footer />
      <CartListSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Product;
