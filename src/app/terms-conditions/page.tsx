"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import Footer from "@/components/layouts/Footer";
import { useMediaQuery } from "react-responsive";

const LaptopHeader = dynamic(
  () => import("../../components/layouts/LaptopHeader")
);
const MobileHeader = dynamic(
  () => import("../../components/layouts/MobileHeader")
);

function TermsConditions() {
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
        <h1 className="font-bold mt-8 md:mt-0 text-4xl lg:text-7xl mb-10 text-center">
          Terms & Conditions
        </h1>
        <div className="mb-6 lg:mx-20 xl:mx-36 lg:mb-28">
          <div className="grid grid-cols-1 md:flex justify-center lg:grid lg:grid-cols-2 border">
            <div className="flex flex-col justify-start font-thin border-black px-4 border-y-2 space-y-2 py-4 md:border md:px-20 lg:py-14 w-[100%]">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Customer Care
              </h3>
              <p>
                I’m a Customer Care section. I’m a great place to write a long
                text about your company and your services, and, most
                importantly, how to contact your store with queries. Writing a
                detailed Customer Care policy is a great way to build trust and
                reassure your customers that they can buy with confidence.
              </p>
              <p>
                I&apos;m the second paragraph in your Customer Care section.
                Click here to add your own text and edit me. It’s easy. Just
                click “Edit Text” or double click me to add details about your
                policy and make changes to the font. I’m a great place for you
                to tell a story and let your users know a little more about you.
              </p>
            </div>
            <div className="flex flex-col justify-start font-thin border-black px-4 border-b-2 space-y-2 py-4 md:border md:px-20 lg:py-14 w-[100%]">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Privacy & Safety
              </h3>
              <p>
                I’m a Privacy & Safety policy section. I’m a great place to
                inform your customers about how you use, store, and protect
                their personal information. Add details such as how you use
                third-party banking to verify payment, the way you collect data
                or when will you contact users after their purchase was
                completed successfully.
              </p>
              <p>
                Your user’s privacy is of the highest importance to your
                business, so take the time to write an accurate and detailed
                policy. Use straightforward language to gain their trust and
                make sure they keep coming back to your site!
              </p>
            </div>
            <div className="flex flex-col justify-start font-thin border-black px-4 border-b-2 space-y-2 py-4 md:border md:px-20 lg:py-14 w-[100%]" id="payment">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Payment Methods
              </h3>
              <ol>
                <li>&#8226; Credit / Debit Cards</li>
                <li>&#8226; PAYPAL</li>
                <li>&#8226; Offline Payments</li>
              </ol>
            </div>
            <div className="flex flex-col justify-start font-thin border-black px-4 border-b-2 space-y-2 py-4 md:border md:px-20 lg:py-14 w-[100%]">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Wholesale Inquiries
              </h3>
              <p>
                I’m a wholesale inquiries section. I’m a great place to inform
                other retailers about how they can sell your stunning products.
                Use plain language and give as much information as possible in
                order to promote your business and take it to the next level!
              </p>
              <p>
                I&apos;m the second paragraph in your Wholesale Inquiries
                section. Click here to add your own text and edit me. It’s easy.
                Just click “Edit Text” or double click me to add details about
                your policy and make changes to the font. I’m a great place for
                you to tell a story and let your users know a little more about
                you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsConditions;
