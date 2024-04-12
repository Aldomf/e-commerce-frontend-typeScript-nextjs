import { useProduct } from "@/context/ProductContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LaptopSidebar = () => {
  const pathname = usePathname();
  const { categories, maxPrice, inputMaxPrice, setInputMaxPrice, minPrice, setMaxPrice, products } =
    useProduct();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  useEffect(() => {
    // Find the highest price among all products
    const highestPrice = Math.max(
      ...products.map((product) =>
        parseFloat(product.priceWithDiscount ?? product.price)
      )
    );
    setMaxPrice(highestPrice);
    setInputMaxPrice(highestPrice); // Set inputMaxPrice to the initial maxPrice
  }, [products, maxPrice]);

  // useEffect(() => {
  //   // Reset inputMaxPrice when changing the page
  //   setInputMaxPrice(maxPrice);
  // }, [pathname, maxPrice, setInputMaxPrice]);

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
          className="text-xl flex justify-between items-center cursor-pointer"
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
          <Link
            href="/category/all"
            className={`mb-2 block transition duration-300 ease-in-out hover:text-[#a3c9bc] ${
              pathname === "/category/all" ? "text-[#a3c9bc]" : ""
            }`}
            onClick={handleLinkClick}
          >
            All products
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id} // Ensure each Link has a unique key
              href={`/category/${category.id}`} // Correct href to navigate to each category
              className={`mb-2 block transition duration-300 ease-in-out hover:text-[#a3c9bc] ${
                pathname === `/category/${category.id}` ? "text-[#a3c9bc]" : ""
              }`} // Add active class if the pathname matches the link
              onClick={handleLinkClick}
            >
              {category.name} {/* Display the category name as Link text */}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center cursor-pointer"
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
            <Link
              href="/subcategory/hot"
              className={`mb-2 block transition duration-300 ease-in-out hover:text-[#a3c9bc] ${
                pathname === "/subcategory/hot" ? "text-[#a3c9bc]" : ""
              }`}
              onClick={handleLinkClick}
            >
              Popular products
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/subcategory/new"
              className={`mb-2 block transition duration-300 ease-in-out hover:text-[#a3c9bc] ${
                pathname === "/subcategory/new" ? "text-[#a3c9bc]" : ""
              }`}
              onClick={handleLinkClick}
            >
              New arrivals
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/subcategory/sale"
              className={`mb-2 block transition duration-300 ease-in-out hover:text-[#a3c9bc] ${
                pathname === "/subcategory/sale" ? "text-[#a3c9bc]" : ""
              }`}
              onClick={handleLinkClick}
            >
              On sale
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col border-b-2 p-4">
        <div
          className="text-xl flex justify-between items-center cursor-pointer"
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
        <div
          className={`transition-all duration-300 ease-linear ${
            isDropdownOpen2 ? "max-h-96 mt-4" : "max-h-0 overflow-hidden"
          }`}
        >
          <div>
            {/* Your other JSX elements */}
            <input
              type="range"
              min={0}
              max={maxPrice} // Set max to maxPrice
              value={inputMaxPrice} // Use inputMaxPrice for the value
              onChange={(e) => setInputMaxPrice(parseFloat(e.target.value))}
              className="w-full"
            />
            {/* Show the current price range */}
            <div className="flex items-center justify-between">
              <span className="mr-2">${minPrice}</span>
              <span>${inputMaxPrice}</span> {/* Display inputMaxPrice */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopSidebar;
