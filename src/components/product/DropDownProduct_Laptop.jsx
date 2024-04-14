import Link from "next/link";
import React, { useState } from "react";

const LaptopSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  return (
    <div className="sticky top-[244px] overflow-y-auto lg:h-[400px] xl:h-[500px]">
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center"
          onClick={toggleDropdown3}
        >
          <h3 className="font-bold">Product Info</h3>
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
            isDropdownOpen3 ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
          }`}
        >
          <li className="mb-2">
            <p className="block text-sm font-extralight">
              I'm a product detail. I'm a great place to add more information
              about your product such as sizing, material, care and cleaning
              instructions. This is also a great space to write what makes this
              product special and how your customers can benefit from this item.
              Buyers like to know what they’re getting before they purchase, so
              give them as much information as possible so they can buy with
              confidence and certainty.
            </p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center"
          onClick={toggleDropdown}
        >
          <h3 className="font-bold">Return & Refund Policy</h3>
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
            isDropdownOpen ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
          }`}
        >
          <li className="mb-2">
            <p className="block text-sm font-extralight">
              I’m a Return and Refund policy. I’m a great place to let your
              customers know what to do in case they are dissatisfied with their
              purchase. Having a straightforward refund or exchange policy is a
              great way to build trust and reassure your customers that they can
              buy with confidence.
            </p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center"
          onClick={toggleDropdown2}
        >
          <h3 className="font-bold">Shipping Info</h3>
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
            isDropdownOpen2 ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
          }`}
        >
          <li className="mb-2">
            <p className="block text-sm font-extralight">
              I'm a shipping policy. I'm a great place to add more information
              about your shipping methods, packaging and cost. Providing
              straightforward information about your shipping policy is a great
              way to build trust and reassure your customers that they can buy
              from you with confidence.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LaptopSidebar;
