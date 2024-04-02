import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';
import { useProduct } from "@/context/ProductContext"; 

function SubHeaderLaptop() {
  const pathname = usePathname()
  const { categories } = useProduct();

  return (
    <div className="py-4 flex justify-center items-center bg-white font-light lg:font-normal">
      {categories.map((category) => (
        <Link
          key={category.id} // Ensure each Link has a unique key
          href={`/category/${category.id}`} // Correct href to navigate to each category
          className={`mr-4 lg:mr-6 xl:mr-10 text-lg transition duration-300 ease-in-out hover:text-[#a3c9bc] ${
            pathname === `/category/${category.id}` ? "text-[#a3c9bc]" : ""
          }`} // Add active class if the pathname matches the link
        >
          {category.name} {/* Display the category name as Link text */}
        </Link>
      ))}
    </div>
  );
}

export default SubHeaderLaptop;



