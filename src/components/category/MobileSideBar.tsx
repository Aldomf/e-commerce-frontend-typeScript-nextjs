"use client";
import React, { useState, useEffect } from "react";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stop event propagation
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stop event propagation
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling of background content when sidebar is open
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeSidebar = (e: MouseEvent) => {
    if (
      !document.getElementById("sidebar")!.contains(e.target as Node) &&
      !document.getElementById("open-sidebar")!.contains(e.target as Node)
    ) {
      setIsOpen(false);
      // Restore scrolling of background content when sidebar is closed
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSidebar);
    return () => {
      document.removeEventListener("click", closeSidebar);
    };
  }, []);

  const applyFilters = () => {
    // Apply filters logic here, e.g., filtering data based on selected minPrice and maxPrice
    console.log("Applied filters: ", minPrice, maxPrice);
  };

  const clearFilters = () => {
    // Clear filters logic here, e.g., resetting minPrice and maxPrice to default values
    setMinPrice(0);
    setMaxPrice(100);
  };

  return (
    <div className="bg-gray-100">
      <div
        className={`fixed z-10 top-0 right-0 h-screen bg-white w-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300`}
        id="sidebar"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="">
            <div className="flex justify-between items-center border-b-2 p-4">
              <h2 className="text-2xl">Filter by</h2>
              <button className="" onClick={toggleSidebar}>
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
            </div>
            <div className="flex flex-col border-b-2 p-4">
              <div
                className="text-xl flex justify-between items-center"
                onClick={toggleDropdown}
              >
                <h3 className="font-light">Category</h3>
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
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-indigo-400">
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-indigo-400">
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-indigo-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col border-b-2 p-4">
              <div
                className="text-xl flex justify-between items-center"
                onClick={toggleDropdown2}
              >
                <h3 className="font-light">Price ($0.99 - $5.99)</h3>
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
            <div className="flex justify-between px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow">
          <div className="container px-6">
            <div className="flex justify-between items-center py-4">
              <button
                className="text-gray-500 hover:text-gray-600 border-2 w-full py-2"
                id="open-sidebar"
                onClick={toggleSidebar}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
