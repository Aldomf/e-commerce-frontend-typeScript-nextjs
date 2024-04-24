import Image from "next/image";
import Link from "next/link";
import React from "react";

function PopularCategories() {
  return (
    <div className="flex flex-col justify-center pb-12 sm:px-16">
      <h2 className="font-bold text-3xl my-6 lg:text-5xl text-center lg:pb-8">
        Most Popular Categories
      </h2>
      <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          href="/category/2"
          className="border-y border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-1.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Gaming</p>
        </Link>
        <Link
          href="/category/3"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-2.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Beauty</p>
        </Link>
        <Link
          href="/category/10"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-3.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Toys</p>
        </Link>
        <Link
          href="/category/9"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-4.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold  mt-8 text-3xl text-[#363F46]">Books</p>
        </Link>
        <Link
          href="/category/8"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-5.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Health</p>
        </Link>
        <Link
          href="/category/1"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-6.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Electronics</p>
        </Link>
        <Link
          href="/category/4"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-7.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Fashion</p>
        </Link>
        <Link
          href="/category/6"
          className="border-b border-2 w-full flex flex-col items-center py-10 md:border-2"
        >
          <div className="w-52 h-52 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform md:hover:scale-110">
            <Image
              src="/cat-8.jpg"
              width={1000}
              height={500}
              alt="Picture of the product"
              className="w-52 h-52 rounded-full border-4 border-[#a3c9bc]"
            />
          </div>
          <p className="font-bold mt-8 text-3xl text-[#363F46]">Sport</p>
        </Link>
      </div>
    </div>
  );
}

export default PopularCategories;
