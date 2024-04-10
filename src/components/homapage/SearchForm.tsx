"use client";
import React, { useState, useRef } from "react";
import { useProduct } from "@/context/ProductContext";
import Link from "next/link";
import Image from "next/image";
import { VscFlame } from "react-icons/vsc";

function SearchForm() {
  const { products } = useProduct();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const hotProducts = products.filter((product) => product.hot);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Check if the related target is contained within the search input or the expanded element
    if (
      searchRef.current && // Check if searchRef.current is not null
      !searchRef.current.contains(event.relatedTarget as Node) &&
      !event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      setIsExpanded(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Navigate to the first product link
      const firstProductLink = document.querySelector(".product-link") as HTMLAnchorElement | null;
      if (firstProductLink) {
        event.preventDefault(); // Prevent the default link behavior
        firstProductLink.click();
      }
    }
  };
  
  

  return (
    <form className="max-w-lg mx-auto">
      <div className="relative w-full" ref={searchRef}>
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 bg-[#a3c9bc] text-sm text-white rounded-full border-s-gray-50 border-s-2 border border-white focus:ring-white focus:border-white placeholder-white"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          required
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 w-12 text-sm font-medium h-full text-white bg-white rounded-r-full border border-white focus:ring-4 focus:outline-none focus:ring-white lg:hover:bg-[#363F46] transition duration-500 ease-in-out"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="#a3c9bc"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>

          <span className="sr-only">Search</span>
        </button>

        {isExpanded && (
          <div className="absolute top-full left-0 w-full bg-[#a3c9bc] text-white border border-gray-200 rounded-b-lg shadow-lg z-10">
            <h3 className="px-4 py-4 flex items-center">
              {" "}
              {searchQuery === "" ? "Trending Products" : "Products"}
              {searchQuery === "" ? <VscFlame className="ml-2" /> : ""}
            </h3>
            <div className="px-6">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  No products match your search.
                </p>
              ) : (
                filteredProducts.slice(0, 4).map((product, index) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className={`flex mb-4 ${index === 0 ? 'product-link' : ''}`}
                  >
                    <div className="w-20 h-20 mr-4">
                      <Image
                        src={product.imageUrl}
                        width={1000}
                        height={500}
                        alt={product.name}
                        className="h-full"
                      />
                    </div>
                    <div>
                      <p>
                        {product.name.length > 30
                          ? `${product.name.substring(0, 30)}...`
                          : product.name}
                      </p>
                      <p className="font-light text-sm">
                        {product.description.length > 30
                          ? `${product.description.substring(0, 30)}...`
                          : product.description}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchForm;

