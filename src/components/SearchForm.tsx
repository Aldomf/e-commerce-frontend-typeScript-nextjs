"use client"
import React from "react";

function SearchForm() {
  return (
    <form className="max-w-lg mx-auto">
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-white bg-gray-50 rounded-full border-s-gray-50 border-s-2 border border-white focus:ring-white focus:border-white dark:bg-wborder-white dark:border-s-wborder-white dark:border-white dark:placeholder-wborder-white dark:text-white dark:focus:border-white placeholder-white"
          placeholder="Search products"
          required
          style={{ backgroundColor: "#a3c9bc" }} // Set background color directly
        />
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 w-12 text-sm font-medium h-full text-white bg-white rounded-r-full border border-white focus:ring-4 focus:outline-none focus:ring-white dark:bg-white dark:hover:bg-white dark:focus:ring-whibg-white lg:hover:bg-[#363F46] transition duration-500 ease-in-out"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="#a3c9bc">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>

          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;



