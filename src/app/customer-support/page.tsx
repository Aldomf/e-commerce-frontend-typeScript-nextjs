"use client";
import CustomerSupportForm from "@/components/customer-support/CustomerSupportForm";
import FAQ from "@/components/customer-support/FAQ";
import Locations from "@/components/customer-support/Locations";
import Footer from "@/components/layouts/Footer";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const LaptopHeader = dynamic(
  () => import("../../components/layouts/LaptopHeader")
);
const MobileHeader = dynamic(
  () => import("../../components/layouts/MobileHeader")
);

function CustomerSupport() {
  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash.substring(1);

    // Check if there's a hash in the URL
    if (hash) {
      // Find the element with the corresponding id
      const element = document.getElementById(hash);

      // If the element exists, scroll to it with an offset to account for the header height
      if (element) {
        const offset = 10; // Adjust this value according to your header height
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: "smooth",
        });
      }
    }
  }, []);
  return (
    <>
      {isTabletOrLarger ? <LaptopHeader /> : <MobileHeader />}
      <div className="md:mt-[230px] lg:mt-[240px] xl:mt-[260px] flex flex-col">
        <div className="mx-6 mb-6 md:mx-28 xl:mx-36 lg:flex lg:flex-col lg:items-center">
          <h2 className="font-bold text-3xl my-3 lg:text-7xl lg:mb-6">
            Customer Support
          </h2>
          <p className="font-light mr-4 lg:text-center xl:px-80">
            I’m a paragraph. Click here to add your own text and edit me. I’m a
            great place for you to tell a story and let your users know a little
            more about you.
          </p>
        </div>
        <CustomerSupportForm />
        <div id="locations">
          <Locations />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerSupport;
