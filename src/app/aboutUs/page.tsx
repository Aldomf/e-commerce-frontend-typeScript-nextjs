"use client";
import OurHistory from "@/components/about-us/OurHistory";
import Save from "@/components/about-us/Save";
import SecondPart from "@/components/about-us/SecondPart";
import NewsLetter from "@/components/homapage/NewsLetter";
import Footer from "@/components/layouts/Footer";
import dynamic from "next/dynamic";
import React from "react";
import { useMediaQuery } from "react-responsive";

const LaptopHeader = dynamic(
  () => import("../../components/layouts/LaptopHeader")
);
const MobileHeader = dynamic(
  () => import("../../components/layouts/MobileHeader")
);

function AboutUs() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });
  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[230px] lg:mt-[240px] xl:mt-[260px] flex flex-col">
        <div className="mx-6 mb-6 md:mx-28 xl:mx-36 lg:flex lg:flex-col lg:items-center">
          <h2 className="font-bold text-3xl my-3 lg:text-7xl lg:mb-6">
          About Us
          </h2>
        </div>
        <OurHistory/>
        <SecondPart/>
        <Save/>
        <NewsLetter/>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
