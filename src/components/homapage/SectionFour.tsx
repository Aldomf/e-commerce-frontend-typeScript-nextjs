import Link from 'next/link';
import React from 'react'

function SectionFour() {
    return (
        <div className="flex flex-col lg:flex-row sm:px-16 lg:mt-16 lg:mb-16">
          <div
            className="relative flex flex-col bg-cover bg-center h-[400px] md:mb-8 lg:mb-0 lg:w-[50%] lg:mr-2 lg:h-[530px] xl:mr-6"
            style={{ backgroundImage: 'url("v.jpg")' }}
          >
            {/* <div className="absolute inset-0 bg-[#B1EFEC] opacity-60"></div> */}
            <div className="flex flex-col justify-start items-start text-black p-8 pt-16 relative md:pl-24 md:pt-20 lg:pt-28 xl:pt-28 xl:pl-24">
              <span className="font-bold mb-4 text-lg md:text-2xl">
                It’s Sport time!
              </span>
              <span className="font-bold text-2xl mb-2 md:text-3xl lg:text-4xl">
                Great Deals on
              </span>
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
                Selected <br /> Sports
              </span>
              <br />
              <Link
                href="category/6"
                className="bg-[#A3C9BC] text-white px-10 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 hover:bg-white"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div
            className="relative flex flex-col bg-cover bg-center h-[400px] lg:w-[50%] lg:ml-2 lg:h-[530px]"
            style={{ backgroundImage: 'url("a.jpg")' }}
          >
            {/* <div className="absolute inset-0 bg-[#B1EFEC] opacity-60"></div> */}
            <div className="flex flex-col justify-start items-start text-black p-8 pt-20 relative md:pl-24 md:pt-20 lg:pt-28 lg:pl-24 xl:pt-28 xl:pl-16">
              <span className="font-bold text-lg md:text-2xl mb-6 xl:mb-0 xl:text-2xl">
                Deal of the Week
              </span>
              <div className="flex">
                <span className="font-bold mb-2 text-8xl lg:text-9xl xl:text-9xl">30%</span>
                <span className="font-bold mt-4 text-2xl">off</span>
              </div>
              <br />
              <span className="font-bold text-lg mb-4 md:mb-8 md:text-2xl">Fashion Trends</span>
              <Link
                href="category/4"
                className="bg-[#A3C9BC] text-white px-10 py-2 rounded-full text-base transition duration-500 ease-in-out hover:text-[#A3C9BC] hover:border-[#A3C9BC] border-2 hover:bg-white"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      );
    }

export default SectionFour