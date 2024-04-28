import Image from "next/image";
import Link from "next/link";
import React from "react";

function SectionTwo() {
  return (
    <div className="flex flex-col lg:flex-row sm:px-16 lg:mb-16">
      <div className="relative flex flex-col h-[400px] md:mb-8 lg:mb-0 lg:w-[55%] lg:mr-2 lg:h-[530px] xl:w-[65%] xl:mr-6">
        {/* Use Next.js Image Component */}
        <Image src="/back-2.jpg" alt="Background Image 1" layout="fill" objectFit="cover" />
        {/* <div className="absolute inset-0 bg-[#B1EFEC] opacity-60"></div> */}
        <div className="flex flex-col justify-start items-start text-black p-8 relative md:pl-24 lg:pt-28 lg:pl-24 xl:pt-28 xl:pl-24">
          <span className="font-bold text-lg md:text-2xl lg:text-2xl">
            It’s Makeup time!
          </span>
          <span className="font-bold text-2xl mb-2 md:text-3xl lg:text-4xl xl:text-4xl">
            Great Deals on
          </span>
          <span className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
            Selected <br className="lg:hidden" /> Makeup
          </span>
          <br />
          <span className="text-lg mb-4 md:mb-8">
            Lorem ipsum dolor, sit amet <br className="lg:hidden" /> <span className="lg:hidden xl:inline">consectetur
            adipisicing elit.</span>
          </span>

          <Link
            href="category/3"
            className="bg-[#A3C9BC] text-white px-10 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 hover:bg-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div
        className="relative flex flex-col h-[400px] lg:w-[45%] lg:ml-2 lg:h-[530px] xl:w-[35%]"
      >
        <Image src="/back-3.jpg" alt="Background Image 1" layout="fill" objectFit="cover" />
        {/* <div className="absolute inset-0 bg-[#B1EFEC] opacity-60"></div> */}
        <div className="flex flex-col justify-start items-start text-black p-8 pt-20 relative md:pl-24 lg:pt-28 lg:pl-24 xl:pt-28 xl:pl-16">
          <span className="font-bold text-lg md:text-2xl lg:text-2xl mb-6 xl:mb-0 xl:text-2xl">
            Deal of the Week
          </span>
          <div className="flex">
            <span className="font-bold mb-2 text-8xl lg:text-9xl xl:text-9xl">40%</span>
            <span className="font-bold mt-4 text-2xl">off</span>
          </div>
          <br />
          <span className="text-lg mb-4 md:mb-8 md:text-2xl">Lorem ipsum dolor sit amet</span>
          <Link
            href="category/8"
            className="bg-[#A3C9BC] text-white px-10 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 hover:bg-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SectionTwo;
