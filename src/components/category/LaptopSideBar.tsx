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
      <div className="flex justify-between items-center border-b-2 p-4">
        <h2 className="text-2xl">Filter by</h2>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center"
          onClick={toggleDropdown3}
        >
          <h3 className="font-light">Category</h3>
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
            <Link href="#" className="block hover:text-indigo-400">
              Electronics
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Games
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Health
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Fashion
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Beauty
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Accessories
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Toys
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Office
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Pets
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Books
            </Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block hover:text-indigo-400">
              Sport
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center"
          onClick={toggleDropdown}
        >
          <h3 className="font-light">Subcategory</h3>
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
            <a href="#" className="block hover:text-indigo-400">
              Popular products
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block hover:text-indigo-400">
              New arrivals
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block hover:text-indigo-400">
              On sale
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center"
          onClick={toggleDropdown2}
        >
          <h3 className="font-light">Price</h3>
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

        <input
          type="range"
          min="0"
          max="100"
          // value={minPrice}
          // onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          // onMouseUp={() => setMinPrice(parseFloat(minPrice))}
          className={`transition-all duration-300 ease-linear ${
            isDropdownOpen2 ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default LaptopSidebar;
