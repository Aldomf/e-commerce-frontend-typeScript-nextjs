import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import Image from "next/image";

function SectionThree2() {
  return (
    <div
      className="h-fit relative pb-16 lg:mt-16 lg:mb-16"
    >
      <Image src="/back-download.jpg" alt="Background Image 1" layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex justify-center items-center text-white relative">
        <div className="flex flex-col justify-center items-start p-8 lg:p-0 lg:w-[750px] pt-16 lg:pl-0 lg:pt-20">
          <span className="font-bold text-lg lg:text-3xl xl:mb-0">
            Save Time & Money
          </span>
          <div className="flex mb-4">
            <span className="font-bold text-4xl md:text-5xl lg:text-8xl">
              Shop With Us <br /> on the Go
            </span>
          </div>
          <span className="font-bold text-xl mb-4 md:mb-8 lg:text-2xl">
            Your weekly shopping routine, at your <br /> door in just a click
          </span>
          <div className="flex flex-col md:flex-row">
            <div className="border-2 border-white bg-black text-white flex justify-center items-center rounded-lg px-2 mb-4 md:mb-0 md:mr-2 cursor-pointer">
              <FaApple className="w-12 h-12 pr-2" />
              <div className="flex flex-col">
                <p className="font-semibold">Download on the</p>
                <p className="font-bold text-2xl">App Store</p>
              </div>
            </div>
            <div className="border-2 border-white bg-black text-white flex justify-center items-center rounded-lg px-2 cursor-pointer">
              <IoLogoGooglePlaystore className="w-12 h-12 pr-2" />
              <div className="flex flex-col">
                <p className="font-semibold">GET IT ON</p>
                <p className="font-bold text-2xl">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionThree2;
