import React from "react";

function ProductCart() {
  return (
    <div className="flex flex-col h-40 py-6 border-b border-black">
      <div className="flex h-full justify-between">
        <div className="flex">
          <div className="h-full w-28 border mr-4"></div>
          <div className="flex flex-col justify-between md:justify-start">
            <h3 className="md:mb-2">Hand Cream</h3>
            <p>$5.99</p>
            <div className="border w-20 h-10 md:hidden"></div>
          </div>
        </div>
        <div className="border w-20 h-10 hidden md:inline"></div>
        <div className="flex flex-col justify-between items-end md:flex-row-reverse md:items-start">
          <button className="md:ml-8 lg:ml-16 xl:ml-20">
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
          <p>$5.99</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
